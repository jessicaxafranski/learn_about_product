# Claude Building Blocks

> The concepts behind AI OS — and how Claude actually works.

---

## What Is AI OS?

Most people start every AI conversation from zero. AI OS fixes that.

It's a structured prompt that gives Claude persistent context about how you think, what you're working on, and how you want to be challenged — so you don't spend the first 10 messages re-explaining yourself every time you open a new chat.

The document maps five layers: **identity**, **communication style**, **current priorities**, **daily constraints**, and **hard rules**. Together they function like a system prompt for your own workflow — the difference between Claude giving generic output and Claude operating like a thinking partner who already knows your context.

**One document. Paste once. Every conversation starts where it should.**

---

## Quick Reference

| Concept | What it does | Analogy | GitHub |
|---|---|---|---|
| 🤖 **Claude** | Reasons, writes, and problem-solves | Your thinking partner | [claude-quickstarts](https://github.com/anthropics/claude-quickstarts) |
| 📁 **Projects** | Persistent workspace with shared context | A briefed assistant | [memory\_cookbook](https://github.com/anthropics/anthropic-cookbook/blob/main/tool_use/memory_cookbook.ipynb) |
| 📋 **Instructions** | Rules Claude follows by default | Your house rules | [claude-quickstarts](https://github.com/anthropics/claude-quickstarts) |
| 🖼️ **Artifacts** | Standalone outputs in a side panel | A shared whiteboard | [claude-quickstarts](https://github.com/anthropics/claude-quickstarts) |
| 🔧 **Skills** | Single tools Claude can use | A hammer or screwdriver | [/skills](https://github.com/anthropics/skills/tree/main) |
| 🤖 **Agents** | Claude running multi-step tasks autonomously | A contractor you brief once | [/patterns/agents](https://github.com/anthropics/anthropic-cookbook/tree/main/patterns/agents) |
| ⚙️ **Workflows** | Fixed automated sequences triggered by events | An assembly line | [/managed\_agents](https://github.com/anthropics/claude-cookbooks/tree/main/managed_agents) |

---

## 🤖 Claude

Claude is an AI assistant built by Anthropic. It's designed to reason, write, analyze, and problem-solve across almost any domain — from strategy documents to code to creative work.

Unlike a search engine, Claude doesn't retrieve information — it **generates responses based on context**. The more context you give, the more useful the output.

> **Without context:** "Write a product brief" → generic template
>
> **With context:** "Write a product brief for a B2B SaaS targeting operations teams, using direct language and no corporate jargon" → something you can actually use

---

## 📁 Projects

Projects give you a **persistent workspace**. Instead of starting fresh in every conversation, a Project lets you:

- Store background context Claude always has access to
- Upload files (docs, spreadsheets, briefs) Claude can reference in any chat
- Set custom instructions that apply to every conversation in that project

Think of it as a dedicated assistant who already read your company wiki before your first meeting.

> **Example:** You create a project called "Product Strategy." You upload your roadmap, OKRs, and AI OS. Every conversation in that project starts with Claude already knowing your priorities, constraints, and how you like to work.

---

## 📋 Instructions

Instructions are the **rules Claude follows by default** — tone, format, constraints, boundaries — applied automatically to every conversation.

You can set them at the Project level or globally.

This is the core of the AI OS concept: define your preferences once, Claude follows them by default.

> **Example instructions:**
> - `"Always respond in bullet points unless I ask for prose."`
> - `"Don't start with 'Great question!' — get straight to the point."`
> - `"When I share an idea, challenge it before validating it."`

---

## 🖼️ Artifacts

Artifacts are **standalone outputs** Claude generates that live in a dedicated side panel — separate from the chat. Designed for content you want to keep, copy, or iterate on without it getting buried in the conversation.

| Type | What it is |
|---|---|
| 📄 Document | Briefs, reports, plans |
| 💻 Code | Scripts, functions, full files |
| 🌐 HTML page | Interactive tools rendered in the browser |
| 🎨 SVG | Diagrams and visual assets |

> **Example:** You ask Claude to build a competitor analysis table. Instead of pasting it into the chat, Claude creates an Artifact — a clean, copyable document that stays visible on the right while you continue the conversation.

---

## 🔧 Skills

Skills are **single capabilities** Claude can use beyond text generation — one tool, one action at a time.

| Skill | What it does |
|---|---|
| 🔍 Web search | Look up current information in real time |
| ▶️ Code execution | Run and test code, not just write it |
| 📎 File analysis | Read and extract data from uploaded documents |
| 🔌 Integrations | Connect to external tools and services |

> **Example:** Instead of asking Claude to estimate a market size from memory, you enable web search. Claude pulls current data, synthesizes it, and gives you a grounded answer — not a hallucinated one.

---

## 🤖 Agents

An agent is Claude operating **autonomously** — not just answering a question, but working through a multi-step task on its own, making decisions along the way, and using tools to get things done.

Normal conversation: `you prompt → Claude responds → you react`
Agent: `you set a goal → Claude plans, executes, self-corrects → you get the result`

Agents can:
- Break a complex task into sub-tasks and execute each one
- Use tools (search, code, APIs) at the right moment
- Loop back and self-correct if something doesn't work
- Hand off to another agent specialized for a specific step

> **Example:** You ask an agent to "research the top 5 competitors in the project management space, summarize their positioning, and draft a comparison table." The agent searches the web, reads the pages, extracts relevant data, structures it, and delivers the table — without you doing anything in between.

---

## ⚙️ Workflows

A workflow is a **fixed sequence of steps** that runs automatically when triggered — no manual input needed at each stage. Where an agent decides its own path, a workflow follows a path you designed in advance.

| Type | How it works |
|---|---|
| ➡️ Linear | Step 1 → Step 2 → Step 3, always in that order |
| 🔀 Conditional | If output meets a condition, go one way; if not, go another |
| ⚡ Triggered | Starts automatically when something happens (form, file, calendar, API) |

Common tools that connect Claude to your stack: **N8N · Make · Zapier**

> **Example:** A user fills out a discovery form. The workflow triggers: Claude reads the answers, scores the lead, drafts a personalized follow-up email, and adds a summary to your CRM — all automatically.

---

## Skills vs. Agents — What's the difference?

This is the most common point of confusion. Both extend Claude beyond conversation, but at different levels.

| | 🔧 Skills | 🤖 Agents |
|---|---|---|
| **What it is** | A single tool Claude can use | Claude running a full workflow autonomously |
| **Scope** | One action at a time | Multiple steps, decisions, and tool calls |
| **Who drives it** | You — Claude uses the skill when needed | Claude — it drives toward the goal |
| **Example** | Claude searches the web to answer one question | Claude searches, reads, summarizes, and drafts a full report |

**Simple way to think about it:**

- A **Skill** is a tool in Claude's toolbox
- An **Agent** is Claude picking up the right tools, deciding the order, and building the thing while you wait

> Skills make Claude more **capable**.
> Agents make Claude more **autonomous**.

---

## How It All Fits Together

```
📁 Project
├── 📋 Instructions  ← your AI OS lives here
├── 📎 Uploaded files
├── 🔧 Skills enabled
└── 💬 Conversations
      ├── 🖼️ Artifacts (outputs)
      └── 🤖 Agents (autonomous tasks)

⚙️ Workflows  ← connect Claude to the rest of your tools (N8N, Make, Zapier)
```

Build a Project → add your AI OS as Instructions → upload relevant files → enable the Skills you need → set up Agents for recurring multi-step tasks → connect Workflows for full automation.

**That's the full stack. Every conversation starts with context, constraints, and capability already in place.**
