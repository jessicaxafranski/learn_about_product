# Claude Code: Configuration Layers

## What You're Actually Configuring

Two key questions to always keep in mind:
- **What memory preferences are active?** — What Claude remembers across sessions
- **What is Claude allowed to look at?** — Always evaluate whether the information being accessed is actually necessary for the task

---

## The 3 Configuration Layers

```
┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐
│     LAYER 1       │  │     LAYER 2       │  │     LAYER 3       │  │     MEMORY        │
│     Global        │  │     Project       │  │     CLAUDE.md     │  │     Auto-Memory   │
│                   │  │                   │  │                   │  │                   │
│  Always loaded    │  │  Every task       │  │  On demand        │  │  Across sessions  │
│  Cost: Very low   │  │  Cost: Low        │  │  Cost: Medium     │  │  Cost: Very low   │
│                   │  │                   │  │                   │  │                   │
│  Universal rules  │  │  Context & rules  │  │  Flows,           │  │  Preferences,     │
│                   │  │                   │  │  conventions      │  │  feedback         │
└───────────────────┘  └───────────────────┘  └───────────────────┘  └───────────────────┘
```

### Layer 1 — Global Instructions
Rules that apply to **every project and every session**, not just the current one.

**Where to set it:** Desktop → Settings → Cowork → Edit

These are universal behavioral rules. Examples:
- Always answer in English
- Don't narrate what you're about to do — just execute
- After delivering a file, write only one summary sentence
- Read files in a single pass — never re-read the same file

> **Why this matters:** Without these rules, Claude defaults to verbose behavior. Each unnecessary narration or re-read costs 100–400 extra tokens per message — that adds up fast.

---

### Layer 2 — Project Instructions
Rules specific to a single project. The **strategic briefing** loaded on every task — not the full manual.

More specific than global rules — it defines:
- The project's goals and constraints
- Code conventions and architecture decisions
- What to do and what to avoid in this specific context

**How to set it up**

| Step | Action |
|---|---|
| 1 | Side panel → **Projects** → click **"+"** |
| 2 | Choose **"Start from scratch"** or **"Use an existing folder"** |
| 3 | Paste your project instructions in the **"Instructions"** field |

**What to include — real example**

```
- Project objective and the 5 output formats
- Skill location: skills/doc-transformer/SKILL.md
- Input files: arquivos-testes/
- Outputs in: resultados/ using pattern [type]-[topic].[ext]
- Delivery rule: ask only "Want another format?"
```

> **Token impact:** Without Project Instructions, Claude reads the entire CLAUDE.md on every new session — consuming tokens unnecessarily. A tight Instructions field prevents that.

---

### Layer 3 — CLAUDE.md
The **complete execution manual** for the project. Claude consults it only when it needs more detail — not on every message.

**Where to put it:** Root of the project folder → `your-project/CLAUDE.md`

**What it contains**
- Detailed token economy rules
- Standard workflow steps
- File naming conventions
- Available skills and when to use each
- Tone, style, and what NOT to do

**Real example**
```
## Project: Transforma Docs

### Workflow
1. Receive document from arquivos-testes/
2. Identify the requested format
3. Apply the matching skill from skills/doc-transformer/
4. Save output to resultados/ as [type]-[topic].[ext]
5. Ask: "Want another format?"

### File naming
- thread-[topic].md  |  post-[topic].md  |  summary-[topic].pdf

### Do NOT
- Re-read files already processed in the session
- Ask for confirmation before executing a clear instruction
```

> **Project Instructions = strategic summary. CLAUDE.md = complete manual.**
> Cowork always loads Project Instructions — and reads CLAUDE.md only when it needs details.

---

## Memory (Auto-Memory)

Not a configuration layer — it's what Claude **builds over time** from your conversations.

- Remembers user preferences, feedback, and project context
- Surfaces relevant information in future sessions without re-explaining
- Should only store what's **non-obvious and not derivable from the code**

---

## Where Files Live

Every layer and every agent/skill action has a specific place on disk.

```
~/.claude/
├── settings.json                     ← Layer 1: Global Instructions
└── projects/
    └── your-project-name/
        └── memory/
            ├── MEMORY.md             ← Memory index (always loaded)
            └── feedback_*.md         ← Individual memory files

your-project/
├── CLAUDE.md                         ← Layer 3: Execution manual
├── .claude/
│   └── settings.json                 ← Layer 2: Project-level settings
├── skills/
│   └── doc-transformer/
│       └── SKILL.md                  ← Skill definition (called by agent)
├── arquivos-testes/                  ← Input files (agent reads from here)
└── resultados/                       ← Output files (agent writes here)
    └── [type]-[topic].[ext]
```

**Key rules:**
- Claude **reads** from `arquivos-testes/` — never modifies inputs
- Claude **writes** to `resultados/` — all agent/skill outputs land here
- Skills are defined in `skills/` and called by name in Project Instructions or CLAUDE.md
- Memory files are written automatically by Claude after each session — you don't manage them manually

---

## Best Practices: Organizing Files in Folders and Subfolders

A well-structured project folder makes Claude faster and cheaper — it knows exactly where to read and where to write without searching.

**Golden rule:** one purpose per folder, never mix inputs with outputs.

```
your-project/
├── CLAUDE.md                        ← instructions at the root, always
├── skills/                          ← one subfolder per skill
│   ├── doc-transformer/
│   │   └── SKILL.md
│   └── summarizer/
│       └── SKILL.md
├── inputs/                          ← raw files Claude reads but never changes
│   ├── articles/
│   ├── transcripts/
│   └── briefs/
└── outputs/                         ← everything Claude creates goes here
    ├── threads/
    ├── posts/
    └── summaries/
```

**Naming conventions**

| Type | Pattern | Example |
|---|---|---|
| Input files | `[source]-[topic].[ext]` | `interview-pricing.md` |
| Output files | `[type]-[topic].[ext]` | `thread-pricing.md` |
| Skills | `[action]/SKILL.md` | `doc-transformer/SKILL.md` |

**Rules to define in CLAUDE.md**
- Always save outputs to the correct subfolder — never to the root
- Never overwrite input files
- If a subfolder doesn't exist, create it before writing
- Use lowercase and hyphens, no spaces in file names

> The cleaner the folder structure, the less Claude has to guess — and fewer guesses means fewer tokens wasted.

---

> **Prompt to audit your folder structure**
>
> Copy and send this to Claude at the start of any project to verify everything is correctly organized:
>
> ```
> Review the folder structure of this project and check:
> - Is CLAUDE.md at the root?
> - Are all skills inside a /skills subfolder, one folder per skill?
> - Is there a clear separation between input and output folders?
> - Are file names following a consistent pattern (lowercase, hyphens, no spaces)?
> - Are there any files saved in the wrong location (e.g. outputs in the root)?
>
> List what is correct, what needs to be fixed, and suggest the corrected structure if needed.
> ```

---

## How to Save Tokens with Rules in a .md File

Every rule you write in CLAUDE.md or Project Instructions replaces a sentence Claude would otherwise have to generate or ask about. Well-written rules = fewer tokens per session.

**Principles for writing token-efficient rules**

| Instead of... | Write... |
|---|---|
| Long explanations of context | One direct instruction |
| "Please always remember to..." | "Always [action]" |
| Repeating rules across messages | One rule in CLAUDE.md, referenced once |
| Vague guidance | Specific conditions and actions |

**Rule structure that works**

```
## Behavior Rules

- Read files once per session — never re-read the same file
- After delivering output, ask only: "Want another format?"
- Do not summarize what you did — just confirm the file was saved
- Never ask for confirmation before executing a clear instruction
- If the input is ambiguous, ask one question only — not a list
```

**What NOT to put in a .md file**

- Long explanations of *why* (save those for onboarding docs, not runtime rules)
- Redundant rules that are already in Global Instructions
- Examples longer than 3 lines — they consume tokens every time the file is loaded
- Rules that only apply to one specific task (put those in the message instead)

**Before vs. after**

```
❌ Too verbose (high token cost):
"When the user gives you a document to transform, please make sure
you always check what format they want before starting, and if they
haven't specified, ask them politely which of the 5 formats they prefer."

✅ Token-efficient (same result):
"If format is not specified, ask: 'Which format? thread / post /
summary / pdf / slides'"
```

> Every line in your .md files is loaded into Claude's context. Write like you're paying per word — because you are.

---

## Why Token Efficiency Matters Across All Layers

Every layer contributes to how many tokens are consumed per session. Lean instructions = fewer tokens = longer, more useful sessions within the same credit budget.

| Layer | Scope | When loaded | Token cost |
|---|---|---|---|
| 1 — Global Instructions | All projects | Always | Very low |
| 2 — Project Instructions | Current project | Every task | Low |
| 3 — CLAUDE.md | Current project | On demand | Medium |
| Memory | Current project | Index only | Very low |
