import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist/transformers.min.js';

// Fetch the model from Hugging Face Hub, not localhost
env.allowLocalModels = false;
env.useBrowserCache = true;

// STEP 2: Split a document into overlapping chunks of ~150 words
function chunkDoc(text, pageKey) {
    const words = text.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(w => w.length > 0);
    const SIZE = 150, OVERLAP = 20;
    const chunks = [];
    for (let i = 0; i < words.length; i += SIZE - OVERLAP) {
        const slice = words.slice(i, i + SIZE).join(' ');
        if (slice.length > 60) chunks.push({ pageKey, chunk: slice });
    }
    return chunks;
}

// STEP 4: Cosine similarity — how close are two vectors?
// Returns 1.0 if identical meaning, 0.0 if completely unrelated
function cosine(a, b) {
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i++) { dot += a[i]*b[i]; na += a[i]*a[i]; nb += b[i]*b[i]; }
    return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

async function initRAG() {
    const input = document.getElementById('searchInput');
    input.placeholder = 'Loading AI search...';

    // STEP 3: Load a small embedding model that runs entirely in the browser
    // Xenova/all-MiniLM-L6-v2 — ~25MB, cached after first load
    const embed = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

    // Wait for prefetchAll() to populate pageCache with doc content
    await new Promise(r => setTimeout(r, 2000));

    // STEP 2 + 3: Chunk every doc and embed each chunk
    // Yields control back to the browser between batches so the UI never freezes
    const ragIndex = [];
    const allChunks = [];
    for (const [pageKey, content] of Object.entries(window.pageCache || {})) {
        for (const item of chunkDoc(content, pageKey)) {
            allChunks.push({ pageKey, chunk: item.chunk });
        }
    }

    for (let i = 0; i < allChunks.length; i++) {
        const item = allChunks[i];
        const out = await embed(item.chunk, { pooling: 'mean', normalize: true });
        ragIndex.push({ pageKey: item.pageKey, chunk: item.chunk, embedding: Array.from(out.data) });
        // Every 5 chunks, yield to the browser so the UI stays responsive
        if (i % 5 === 0) await new Promise(r => setTimeout(r, 0));
    }

    input.placeholder = 'Search... ✦ AI';

    // STEP 5: Expose semantic search — called by performSearch() in app.js when ready
    window.ragSearch = async function(query) {
        const out = await embed(query, { pooling: 'mean', normalize: true });
        const queryVec = Array.from(out.data);

        // Score each chunk, keep only the best score per page
        const best = {};
        for (const item of ragIndex) {
            const score = cosine(queryVec, item.embedding);
            if (!best[item.pageKey] || score > best[item.pageKey].score) {
                best[item.pageKey] = { pageKey: item.pageKey, score };
            }
        }

        // Return top 5 pages — only include results above 0.3 (below that the match is too weak)
        return Object.values(best)
            .filter(r => r.score > 0.3)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);
    };
}

initRAG().catch(console.error);
