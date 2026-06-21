> 🚧 **Work in progress** — this case is being built in public. Check back soon.

# Product Case: RAG for Compliance Knowledge Management

**Context:** Advertising compliance team · Hypothetical based on real user research
**Role:** Product Manager
**Problem type:** Internal knowledge fragmentation

---

## The Context

An advertising compliance team of ~10 people manages a high volume of cases daily — reviewing ads, applying regulatory rules, and setting precedents for future decisions.

Their knowledge lives in three separate places:

| Tool | What's stored there |
|---|---|
| **Confluence** | Official processes, guidelines, regulatory rules |
| **Kayako** | Past tickets and case decisions |
| **Gmail** | Informal case history, decisions made over email |

No single place has the full picture.

---

## Discovery

To understand the real problem, I mapped the behavior of someone new handling a case they hadn't seen before.

**The actual flow:**

```
New case arrives
      ↓
Search Confluence — too much text, no visual cues, keyword search fails
      ↓
Search Gmail and Kayako for similar past cases
      ↓
Still not sure → ask the senior person
```

Through user research (informal interviews with team members), one data point stood out:

> The senior person on the team gets interrupted **at least 7 times per week** with questions that already have an answer somewhere in the documentation.

**Quantifying the cost:**

7 interruptions × ~20 minutes each = **~2.5 hours per week** of senior expertise spent answering questions that are already documented.

Over a year: **120+ hours lost.**

And that's only the measurable cost. The hidden costs are larger:

- The person asking spent 20–30 minutes searching before giving up
- Decisions made without finding a precedent risk **inconsistency** — a legal exposure in compliance
- When the senior leaves, that knowledge walks out the door

**The real insight from discovery:**

This is not a "bad search" problem. It's a **knowledge dependency problem.** The senior person had become a human RAG system — the only reliable index of institutional knowledge. That doesn't scale.

---

## Prioritization

With the problem defined, I mapped the alternatives before proposing a solution.

| Initiative | Reach | Impact | Confidence | Effort | Score |
|---|---|---|---|---|---|
| FAQ — top 20 questions | 10 | 1 | 80% | 1 week | **8.0** |
| Weekly knowledge sharing sessions | 10 | 0.5 | 60% | 0.5 weeks | **6.0** |
| Standardize Kayako ticket format | 10 | 1 | 60% | 2 weeks | **3.0** |
| RAG — unified semantic search | 10 | 3 | 70% | 8 weeks | **2.6** |
| Reorganize Confluence structure | 10 | 1 | 50% | 3 weeks | **1.7** |

The RICE score puts the FAQ first. And that's correct — it's the fastest way to reduce senior interruptions and show immediate results.

But RICE doesn't capture scalability. The FAQ answers today's top 20 questions. It won't cover the edge case that comes in next month. The senior remains the fallback.

**The right reading:**

> **Phase 1 — Quick win:** Build the FAQ. Reduces interruptions immediately, low effort, builds trust for the next investment.
>
> **Phase 2 — Strategic solution:** Implement RAG. Indexes Confluence + Kayako + Gmail in a single semantic search. Scales without depending on any individual.

These two initiatives work together. The FAQ is the fast proof of value. RAG is what makes the solution permanent.

---

## The Solution

A unified semantic search that indexes all three knowledge sources and retrieves relevant content by meaning, not by exact keywords.

**Why RAG and not a better keyword search:**

A compliance analyst asking "can we approve this pharmaceutical ad if it includes a disclaimer?" will never find the right precedent by searching "pharmaceutical disclaimer". The question is conceptual. The answer is buried in a ticket from eight months ago described in completely different words.

Keyword search matches strings. RAG matches meaning.

**How it works:**

```
All documents (Confluence + Kayako + Gmail)
      ↓
Chunked into ~500-word pieces with overlap
      ↓
Each chunk converted into a vector (semantic embedding)
      ↓
Stored in a vector database

At query time:
User question → converted to a vector → similarity search → top chunks retrieved → answer generated
```

**RAG in the wild:**

This is not a new pattern. IBM Watson, deployed on ibm.com as a customer-facing assistant, uses the same architecture. When a user asks a question, it retrieves relevant IBM documentation and generates a response grounded in that content — with a "Find related articles" option that surfaces the retrieval layer directly.

The difference between that and a simpler chatbot: the answers are grounded in real documentation, not generated from model memory. That matters especially in compliance, where a wrong answer based on hallucinated policy is a legal risk.

---

## Success Metrics

| Metric | Baseline | Target |
|---|---|---|
| Senior interruptions per week | 7 | < 2 |
| Time to find a precedent | ~30 min | < 5 min |
| Search success rate | Unknown | > 70% |
| Onboarding time for new analysts | 4 weeks | 2 weeks |

The most important metric is not search success rate. It's **senior interruptions per week** — because that's the number that made the business case visible to leadership in the first place.

---

## What I Would Do Differently

**Start with content audit before building.**
RAG quality depends entirely on what you put in it. Before indexing three systems, I would audit what's actually in them — identify outdated docs, duplicate decisions, and gaps. Garbage in, garbage out.

**Involve the senior early.**
The person being interrupted is also the domain expert who knows which documents matter. Getting them to help tag and validate the knowledge base is not just good research — it's how you get buy-in from the person whose workflow changes the most.

**Measure retrieval and generation separately.**
If the search returns wrong results, that's a retrieval problem. If it returns right results but gives a bad answer, that's a generation problem. Treating them as one metric makes debugging impossible.
