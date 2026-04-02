# AI-Assisted Product Builder

**A self-directed product case study**

---

I built both of these from scratch — check them out:

- [Learning Hub](https://jessicaxafranski.github.io/learn_about_product/) — my PM knowledge base
- [Portfolio](https://jessicaxafranski.github.io/jessxaf-site/index.html) — my projects and case studies

---

## Overview

This is not just a portfolio project — it's a proof of concept.

I set out to answer a specific question: **how fast can a PM go from idea to live product, using AI as a development partner?**

The result is this Learning Hub — a public knowledge base I built from scratch using HTML, CSS, and JavaScript. No frameworks, no templates, no engineering support. Just product thinking, AI tooling, and a bias toward shipping.

---

## The Challenge

Most PMs can describe products. Fewer can build them.

I wanted to close that gap — not by becoming a developer, but by understanding the execution layer well enough to move quickly, make better technical trade-offs, and build credibility with engineering teams.

**Constraints I set for myself:**

- No pre-built frameworks — learn by understanding the fundamentals first
- No external help — just me and AI tooling
- Ship something real and publicly accessible, not just a prototype

The underlying PM instinct: **if you can't ship it, you don't fully understand it.**

---

## My Approach

### Step 1 — Start with fundamentals, not shortcuts

I began with plain HTML — deliberately choosing the slower path first. Before optimizing, I needed to understand how the pieces fit together: structure, layout, rendering, navigation.

This mirrors a principle I apply in product work: **don't optimize a system you don't yet understand.**

### Step 2 — Identify the real constraint

After building the initial structure, I realized the bottleneck wasn't design or content — it was iteration speed. Every change required too much context-switching between thinking and doing.

That's when I brought in AI tooling — not to write code for me, but to remove the friction between decisions and implementation.

### Step 3 — Reframe AI as a thinking partner, not a search engine

Most people use AI to generate code and accept it. I used it differently: as a partner that could hold context, propose multiple implementation options, and explain trade-offs — while I made every product decision.

The core PM skill in this phase wasn't coding. It was **knowing which option to choose, and why.**

---

## What I Built

A single-page application with:

- Sidebar navigation with grouped content sections
- Full markdown rendering for all pages
- Live keyword search with content indexing
- Mobile-responsive layout
- 15+ PM topics structured and documented

**Technical decisions:**

| Decision | Choice | Rationale |
|---|---|---|
| Architecture | Single HTML file | Zero dependencies, GitHub Pages compatible, no build step |
| Framework | Vanilla JS | Simpler to debug, faster to ship, no abstraction overhead |
| Deployment | GitHub Pages | Free, fast, and shows end-to-end ownership |
| Markdown | marked.js via CDN | Avoids a build pipeline while keeping content flexible |

---

## How AI Accelerated Execution

I didn't use AI to avoid thinking — I used it to move faster once the thinking was done.

| Phase | My role (PM) | AI's role (execution) |
|---|---|---|
| Architecture | Defined structure, navigation model, content hierarchy | Generated initial scaffold |
| Iteration | Identified what to change and the acceptance criteria | Implemented changes in context |
| Debugging | Diagnosed root cause (e.g. routing bug — missing entry in data map) | Explained options and trade-offs |
| Content | Wrote all PM content, framing, and structure | Formatted and adapted on request |

**The split that mattered:** I owned every product decision. AI owned implementation velocity.

---

## Key Decisions & Trade-offs

**Why a single HTML file, not React or Next.js?**
For a portfolio project, reliability and time-to-ship matter more than scalability. A single file deploys instantly, has no dependencies that can break, and is easier for anyone reading the source to understand. Over-engineering this would have been a bad product decision.

**Why build this instead of using Notion or Substack?**
I wanted to demonstrate that I can own a product end-to-end — from problem definition to a live URL. A hosted doc tool shows neither product thinking nor technical fluency.

**Why ship publicly?**
Public shipping creates accountability, surfaces real feedback, and produces a live artifact I can reference. The Learning Hub URL is more credible in a portfolio than a screenshot.

---

## Results

- Shipped a live, publicly accessible product from zero
- 15+ PM knowledge articles structured and navigable
- Full search, routing, and mobile support — all functional
- Bugs found and fixed through real usage (not QA) — including a routing issue where a nav item existed but had no content registered, causing silent failures
- Outcome: a significantly clearer mental model of the frontend execution layer, which makes me a more effective PM when working with engineering teams

---

## What I Learned

**The biggest bottleneck is rarely technical.**
Once the product direction was clear, execution moved fast. Ambiguity about what to build — not the code itself — was the main source of friction.

**AI amplifies execution; it doesn't replace product thinking.**
A PM who can clearly define the problem, evaluate options, and make decisions is more effective with AI than a developer who codes without product context. The value I brought was judgment, not syntax.

**Shipping beats planning.**
I shipped imperfect versions, found real issues in production (like the routing bug), and fixed them quickly. That feedback loop is faster and more valuable than getting it right in a doc before touching the product.

**Building makes you a better PM.**
Having shipped something end-to-end — even a small project — changes how you think about scoping, estimation, and technical trade-offs. I now ask better questions in engineering conversations because I've been on the other side of them.

---

## Stack

| Layer | Tool |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Markdown rendering | marked.js |
| AI development partner | Claude (Anthropic) |
| Code editor | Cursor |
| Version control | GitHub |
| Deployment | GitHub Pages |

---

## Links

- [Learning Hub](https://jessicaxafranski.github.io/learn_about_product/)
- [Portfolio](https://jessicaxafranski.github.io/jessxaf-site/)

---

*Built by Jessica Xafranski — Product Manager*
