# RAG in Practice — How This Site Works

This site uses RAG to power its search. Instead of matching exact keywords, the search understands meaning — so you can ask in natural language and find the right page even if your words don't match the document exactly.

Everything runs in the browser. No backend, no API key, no server.

---

## The Stack

| Layer | What we used | Why |
|---|---|---|
| **Knowledge base** | All `.md` files in this project | Already exist — no extra work |
| **Chunking** | Custom JS function | Splits each doc into ~150-word pieces with 20-word overlap |
| **Embeddings** | `transformers.js` + `Xenova/all-MiniLM-L6-v2` | Runs entirely in the browser via WebAssembly |
| **Vector store** | In-memory JS array | Simple and sufficient for a small knowledge base |
| **Retrieval** | Cosine similarity | Finds the chunks whose meaning is closest to the query |
| **Generation** | None | Returns ranked pages, not generated text (Option 1) |

---

## How It Works Step by Step

### Step 1 — Load
When the page opens, `prefetchAll()` fetches all `.md` files and stores them in `pageCache`. This is the knowledge base.

### Step 2 — Chunk
Each document is split into overlapping pieces of ~150 words:

```
"RAG is a technique that gives an AI model access to external
knowledge before generating a response. Instead of relying only
on what the model learned during training..."
```

Overlap of 20 words between chunks avoids losing context at the boundary.

### Step 3 — Embed
A small AI model (`all-MiniLM-L6-v2`, ~25MB) runs in the browser via WebAssembly. It converts each chunk into a vector — a list of numbers that captures the semantic meaning of the text:

```
"RAG is a technique..." → [0.3, 0.4, 0.1, 1.8, 1.1, 0.7, ...]
```

Similar meaning produces similar numbers, regardless of exact wording.

### Step 4 — Store
Every chunk and its vector are kept in memory:

```js
ragIndex = [
  { pageKey: 'rag', chunk: 'RAG is a technique...', embedding: [0.3, 0.4, ...] },
  { pageKey: 'ai-agents', chunk: 'AI agents are systems...', embedding: [0.1, 0.9, ...] },
  ...
]
```

### Step 5 — Search
When you type in the search box:

1. The query is converted into a vector using the same model
2. Cosine similarity compares the query vector against every chunk vector
3. The best-scoring chunk per page is kept
4. The top 5 pages are returned, ranked by similarity score

```
query: "how do witnesses work in AI"
        ↓
nearest chunks → rag.md (tribunal analogy), ai-agents.md
        ↓
returns: RAG page, AI Agents page
```

---

## Why No Generation Step

Full RAG = retrieval + LLM generation. We only do retrieval.

Adding generation requires calling an LLM API, which means exposing an API key in the browser — a security risk. The retrieval step alone already solves the main problem: finding the right page from a large set of documents using semantic meaning.

If this site had a backend, the full pipeline could run there, and the LLM could synthesize a direct answer from the retrieved chunks.

---

## What Changes for the User

| | Before (keyword search) | After (semantic search) |
|---|---|---|
| Query: "witnesses" | No results | Finds RAG page (tribunal analogy) |
| Query: "how to measure success" | Only finds pages with exact words | Finds KRs, Performance Indicators, A/B Testing |
| Query: "what is a judge in AI" | No results | Finds RAG page |
| Query: "building roadmap" | Finds "product-roadmap" | Same, but also finds related strategic content |

---

## Why Raw Top-5 Results Are Not Enough (The Threshold Problem)

The first version of the search always returned the top 5 pages, regardless of how similar they actually were to the query. Searching for "judge" would return RAG as the first result (correct — the tribunal analogy) but then fill the remaining slots with completely unrelated pages like "Critical Thinking" and "How to Create KRs".

This happens because cosine similarity always produces a number between 0 and 1 — even two completely unrelated texts get a score, just a low one. Without a minimum threshold, the search ranks all pages and returns the top 5 no matter how weak the match is.

**The fix: filter results below a minimum relevance score.**

```js
.filter(r => r.score > 0.3)
```

With the `all-MiniLM-L6-v2` model, scores roughly mean:

| Score | What it means |
|---|---|
| > 0.5 | Strong semantic match |
| 0.3 – 0.5 | Meaningful but looser connection |
| < 0.3 | Probably coincidental — not relevant |

If no results pass the threshold, the search falls back to keyword matching automatically. This means the search box is never empty — it just switches to a different strategy when the query is too ambiguous for semantic search to be confident.

---

## Why the UI Can Freeze During Indexing (and How We Fixed It)

The embedding loop runs on the browser's **main thread** — the same thread responsible for rendering the page, handling clicks, and animating the sidebar.

When we run `await embed()` for every chunk of every document in a tight loop, we block the main thread for several seconds. During that time, the browser cannot respond to any interaction. The sidebar freezes, clicks are ignored, and the page feels broken.

**The fix: yield control back to the browser every 5 chunks.**

```js
if (i % 5 === 0) await new Promise(r => setTimeout(r, 0));
```

`setTimeout(r, 0)` does not actually wait — it schedules a zero-delay callback. What it does is **pause the loop for one event loop tick**, giving the browser a window to process pending clicks, repaints, and animations before continuing.

The indexing takes the same total time, but the UI stays fully responsive throughout.

The proper long-term solution is a **Web Worker** — a separate thread that runs JS in the background without ever touching the main thread. That would eliminate the problem entirely, at the cost of more complexity.

---

## Technical Constraints

- The model takes ~5–10 seconds to load on the first visit (~25MB download)
- After that, the browser caches it — subsequent visits are instant
- The vector index is rebuilt every page load (since it lives in memory only)
- Works fully offline after the first model download
