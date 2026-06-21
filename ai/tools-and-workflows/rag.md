# RAG — Retrieval-Augmented Generation

RAG is a technique that gives an AI model access to external knowledge before generating a response.

Instead of relying only on what the model learned during training, RAG retrieves relevant documents or data at the moment of the query and uses them as context.

---

## The Problem RAG Solves

| Limitation | What happens without RAG |
|---|---|
| **Knowledge cutoff** | The model only knows what existed when it was trained |
| **Private data** | The model has no access to internal docs, tickets, or databases |
| **Hallucination** | Without grounding, the model invents plausible-sounding answers |
| **Scale** | You cannot fine-tune a model every time your data changes |

RAG solves all four by connecting the model to a live, searchable knowledge base at query time.

---

## How It Works

```
User query
    ↓
1. RETRIEVE — search a knowledge base for relevant chunks
    ↓
2. AUGMENT — inject those chunks into the prompt as context
    ↓
3. GENERATE — the model answers using the retrieved content
    ↓
Response grounded in real data
```

The model does not search the internet. It searches a pre-built index of documents you control.

![RAG Architecture Diagram](ai/images/rag_architecture.png)
*Source: IBM*

---

## The Indexing Pipeline

Before RAG can answer any query, the knowledge base must be prepared. This happens in four steps.

![RAG Indexing Pipeline](ai/images/rag_pipeline.png)

### 1. Load

Ingest raw content from any source — code files, PDFs, plain text, images, spreadsheets, JSON, or URLs. This is where your data enters the pipeline regardless of format.

### 2. Split

Documents are broken into smaller pieces called **chunks**. Chunking is not arbitrary — it follows rules:

- Each chunk is typically ~500 tokens
- Chunks overlap by ~50 tokens with the next one to avoid losing context at the boundary
- The goal is precision: smaller chunks make retrieval more targeted

### 3. Embed

Each chunk is converted into a **numeric vector** (an embedding) — a list of floating-point numbers that captures the semantic meaning of the text. Similar meaning produces similar vectors, regardless of exact wording.

Example: `[0.3, 0.4, 0.1, 1.8, 1.1...]`

### 4. Store

The vectors are saved to a **vector database** (e.g. Pinecone, Weaviate, pgvector). At query time, the database runs a similarity search to find the chunks whose vectors are closest to the query vector.

---

### What a Chunk Looks Like

Every stored chunk contains three parts:

| Part | What it contains | Example |
|---|---|---|
| **Text** | The raw content (~500 tokens, with overlap) | "The refund policy allows returns within 30 days..." |
| **Embedding** | Numeric vector capturing semantic meaning | `[0.3, 0.4, 0.1, 1.8, 1.1, 0.7, 2.1...]` |
| **Metadata** | Source file, page, index, category, timestamp | `source: "returns_policy.pdf"`, `page: 2`, `category: "support"` |

The metadata is what enables **filtering** (search only within a category) and **source citation** (show the user where the answer came from).

---

## Key Components

| Component | What it does |
|---|---|
| **Knowledge base** | The source of truth — docs, PDFs, tickets, databases |
| **Chunking** | Splits documents into smaller pieces so retrieval is precise |
| **Embeddings** | Converts text into vectors so similar content can be found numerically |
| **Vector store** | Stores and searches those vectors (e.g. Pinecone, Weaviate, pgvector) |
| **Retriever** | Finds the most relevant chunks for a given query |
| **LLM** | Generates the final answer using the retrieved chunks as context |

---

## RAG vs. Fine-Tuning

| | RAG | Fine-Tuning |
|---|---|---|
| **When to use** | Data changes often or is private | You need a specific behavior or tone |
| **Cost** | Lower — no retraining | Higher — requires compute and labeled data |
| **Update speed** | Instant — update the knowledge base | Slow — requires a new training run |
| **Best for** | Answering questions about your own content | Teaching the model a new skill or style |
| **Risk** | Retrieval can return irrelevant chunks | Can overfit or drift from base model |

Use RAG when the answer lives in your data. Use fine-tuning when the behavior needs to change.

---

## Advantages of RAG

| Advantage | What it means in practice |
|---|---|
| **No retraining required** | The knowledge base can be updated instantly — add a document and it is available on the next query, with no model training cycle |
| **Reduces hallucination** | Answers are grounded in retrieved content, not generated from memory — the model has real text to reference instead of inventing plausible facts |
| **Works with private data** | Internal documents, tickets, and databases can be used without ever being sent to a model provider for training |
| **Cost-effective to maintain** | Updating knowledge only requires changing documents, not rerunning expensive compute jobs |
| **Source transparency** | The system can surface which documents were retrieved, making it easier to verify and audit answers |
| **Model-agnostic** | The retrieval layer works independently of the LLM — you can swap models without rebuilding the knowledge base |

---

## Disadvantages of RAG

| Disadvantage | What it means in practice |
|---|---|
| **Bad data, bad answers** | The quality of responses is directly tied to the quality of the knowledge base — outdated, incomplete, or poorly structured documents produce unreliable answers |
| **Longer response time** | Adding a retrieval step before generation introduces latency, especially when searching large document sets |
| **Integration complexity** | Setting up chunking, embeddings, a vector store, and a retriever requires more infrastructure than a simple LLM call |
| **Computational cost** | Embedding queries and running similarity searches in real time consumes resources — the larger the knowledge base, the higher the cost |

---

## PM Use Cases

| Use case | What RAG enables |
|---|---|
| **Internal Q&A bot** | Employees ask questions answered from your own docs and wikis |
| **Support assistant** | Answers user questions using your product documentation |
| **Research synthesis** | Summarizes user interviews or feedback from a corpus |
| **Onboarding tool** | New hires query a curated knowledge base instead of asking around |
| **Competitive intel** | Retrieves and summarizes relevant articles from a monitored source list |

---

## What a PM Needs to Know

- RAG quality depends on **what you put in the knowledge base** — garbage in, garbage out
- **Chunking strategy matters** — too large and retrieval is noisy, too small and context is lost
- The model can only use what the retriever surfaces — if the right chunk is not retrieved, the answer will be wrong even if the document exists
- Always evaluate **retrieval quality** separately from **generation quality** when debugging RAG failures

---

## The Tribunal Analogy

Think of the LLM as a **judge**.

The judge has studied law for years — that knowledge is already built into them through training. Some cases even have **prior rulings** that shaped how the judge thinks about specific topics. That is fine-tuning: knowledge baked into the model before the trial begins.

But when the trial starts, the judge cannot rely on memory alone. They need **witnesses** — people who observed the specific facts of this case and can present evidence in real time.

That is RAG. The witnesses are your documents. They are called at the moment of the query, their testimony is injected into the context, and only then does the judge deliberate and deliver a verdict.

| Role | In the tribunal | In AI |
|---|---|---|
| **Judge** | Applies reasoning to reach a verdict | LLM generates the response |
| **Prior rulings** | Knowledge the judge internalized over time | Fine-tuning |
| **Witnesses** | Present specific evidence for this case | Documents retrieved by RAG |
| **Evidence injection** | Testimony delivered during the trial | Context window populated at query time |

Without witnesses, the judge rules only on prior knowledge — which may be outdated, incomplete, or irrelevant to the specifics of this case.

---

## Why RAG Instead of Training

Training an LLM requires significant **time, money, and energy**. It is not something you do every time your data changes.

RAG offers a faster path to grounding a model in your own data:

| Consideration | Why RAG wins |
|---|---|
| **Speed** | Update the knowledge base and changes are live immediately — no retraining cycle |
| **Cost** | No GPU compute required — retrieval is cheap compared to a training run |
| **Proprietary data** | Documents stay in your environment and are never used to train a shared model |
| **Local deployment** | RAG works with locally-hosted models, keeping sensitive data fully private |
| **Detail precision** | Responses are grounded in exact chunks from your documents, not in generalizations |

The trade-off: the knowledge base must be **continuously maintained**. If the documents are outdated, incomplete, or poorly organized, the quality of every answer degrades. RAG shifts the quality bottleneck from the model to the data pipeline.

---

## Simple Mental Model

> RAG = search engine + LLM  
> You search your own documents, then ask an AI to synthesize what it found.
