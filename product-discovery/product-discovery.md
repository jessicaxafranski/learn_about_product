# Product Discovery
### A practical guide for Product Managers

Discovery is how you figure out **what to build** before you spend engineering time building it. The core question you're always answering is: *are we solving a real problem, for real users, in a way they will actually adopt?*

> **Core question: Do we have enough evidence to justify building this — or are we still guessing?**

Discovery is not a one-time phase that ends when a project starts. Good teams treat it as continuous — a habit that runs in parallel with delivery, not a gate that happens once and gets checked off.

---

## Types of Product Discovery

Not all discovery answers the same question. Match the type to what you're actually trying to learn.

| Type | Goal | When to use it | Common techniques |
|---|---|---|---|
| **Generative (Exploratory)** | Understand the problem, the user, and the context — before any solution exists | Early, when you don't yet know what to build | User interviews, contextual inquiry / field studies, diary studies, surveys |
| **Evaluative** | Check whether a specific solution actually solves the problem | Once you have a concept, prototype, or early feature | Usability testing, prototype testing, concierge tests, fake door tests, A/B tests |
| **Continuous Discovery** | Keep learning every week so you never go too long without touching reality | Ongoing, in parallel with delivery — never "done" | Weekly customer touchpoints, opportunity solution trees, story-based interviews |

> **Rule: Generative discovery finds the right problem. Evaluative discovery proves your solution actually solves it. Skipping either one means you're shipping on faith.**

---

## The CSD Matrix — Certainties, Suppositions, Doubts

This is the fastest way to turn "what we think we know" into a prioritized research plan. Before jumping into interviews, get the team together and sort everything you believe about the problem into three buckets:

| Certainties | Suppositions | Doubts |
|---|---|---|
| Things we **know for a fact** — validated by data, past research, or direct evidence | Things we **believe but haven't proven** — assumptions we're treating as true | Open **questions** we genuinely don't have an answer to yet |

**Example — a checkout drop-off problem:**

| Certainties | Suppositions | Doubts |
|---|---|---|
| 40% of users abandon at the payment step (from analytics) | We assume price is the main reason users leave | Do users compare our price against competitors before abandoning? |
| Mobile drop-off is higher than desktop | We assume the extra login step is the friction point | Would removing login-before-checkout actually change behavior, or just shift the drop-off elsewhere? |

### How to use it

1. **Brainstorm as a team** — one sticky note per idea, sorted into Certainties, Suppositions, or Doubts. Don't debate yet, just get it out.
2. **Challenge the Certainties column** — teams often put assumptions here by mistake. If you can't point to the evidence, it's a Supposition, not a Certainty.
3. **Turn Suppositions and Doubts into research questions** — every item in these two columns is something discovery needs to resolve.
4. **Prioritize by risk × uncertainty** — start with the items that are both highly uncertain and expensive to get wrong if you assumed incorrectly.
5. **Design the smallest experiment that resolves it** — an interview question, a survey, a prototype test. Don't over-build the test.

> **Rule: The goal of discovery is to move items from Suppositions and Doubts into Certainties — as cheaply and quickly as possible.**

---

## Interview Types

| Format | What it is | Best for |
|---|---|---|
| **Structured** | Fixed script, same questions, same order, for every participant | Comparing answers across many users, spotting patterns fast |
| **Semi-structured** | A core set of questions, but you follow up on interesting answers | Most product discovery interviews — structure with room to dig deeper |
| **Unstructured** | Open conversation, no fixed script | Very early exploration, when you don't yet know what to ask |

Most product discovery interviews should be **semi-structured**: come in with a guide so you don't waste the conversation, but be willing to abandon your next question if the user just said something more interesting.

---

## Don't Lead the Witness — Avoiding Bias in Interviews

The single most common way to ruin a discovery interview is asking questions that push the user toward the answer you were hoping for. Users are naturally polite — they will often tell you what they think you want to hear, especially if you've just described your idea to them.

| ❌ **Leading / biased** | ✅ **Neutral / open** |
|---|---|
| "Would you use a feature that lets you do X?" | "Walk me through the last time you tried to do X." |
| "Don't you think this would save you time?" | "How much time does this currently take you, and how do you feel about that?" |
| "Do you like this design?" | "What do you expect to happen when you tap this button?" |
| "This is a really common problem, right?" | "How often does this come up for you? When was the last time?" |

Key principles to keep in mind:

- **Ask about the past, not hypotheticals.** "Would you use this?" gets you a polite guess. "Tell me about the last time you ran into this problem" gets you a fact.
- **Ask about behavior, not opinions.** What people say they'd do and what they actually do are often different things.
- **Don't pitch your idea before you ask questions.** Once a user knows what you're hoping to hear, every answer after that is contaminated.
- **Follow up with "why" and "tell me more," not confirmation.** Let the user do 80% of the talking.
- **Silence is your friend.** Resist the urge to fill a pause — the most useful detail often comes after a few seconds of silence.

> **Rule: If you can predict a user's answer before you ask the question, you're not doing discovery — you're doing confirmation.**

---

## In-Person vs. Remote Interviews

Both formats are valid — the right choice depends on what you're trying to learn.

| | In-person | Remote |
|---|---|---|
| **Best for** | Contextual inquiry — watching users in their real environment (a store, a warehouse, their actual workspace) | Reaching more users, across more locations, faster |
| **Body language & rapport** | Full read on tone, hesitation, and non-verbal cues; easier to build trust | Partial — video helps, but you lose a lot compared to being in the room |
| **Cost & logistics** | Higher — travel, scheduling, physical space | Lower — schedule in minutes, no travel |
| **Reach** | Limited to who you can physically visit | Global — talk to users you'd never reach otherwise |
| **Recording & synthesis** | Requires manual note-taking or extra equipment | Native recording, transcripts, easy to share clips with the team |
| **Natural environment** | You see their actual physical context and workarounds | You can screen-share their actual workflow inside your product |
| **Risk** | Small sample size due to logistics | Technical issues (connection, audio) can derail a session |

> **Rule: Use in-person when the physical environment is part of the problem. Use remote when you need scale and speed. Most teams should default to remote and reserve in-person for high-stakes or field-based research.**

---

## Other Things That Make Discovery Actually Good

- **Recruit the right participants.** A great interview with the wrong person teaches you nothing. Write a screener that filters for the actual behavior you care about, not just a demographic.
- **5 users is often enough — for evaluative testing.** Nielsen Norman Group's research shows that testing with 5 users typically surfaces around 85% of usability problems in a single design. This applies to usability/evaluative testing — generative research into a new problem space usually needs more, since you're mapping variety, not finding bugs.
- **Triangulate qualitative and quantitative data.** Interviews tell you the *why*; analytics tell you the *how many*. Never trust either one alone — a compelling quote from one user is not a trend, and a number without a story doesn't tell you what to fix.
- **Synthesize findings together, as a team.** Affinity mapping (grouping quotes and observations into themes) turns a pile of individual interviews into patterns you can act on. Do this as a team, not solo — it builds shared conviction.
- **Keep discovery and delivery running in parallel.** This is the "dual-track agile" idea: one track continuously discovers what's worth building, the other delivers what's already been validated. Discovery should never fully stop while delivery runs.
- **Revisit the CSD Matrix regularly.** As Suppositions and Doubts get resolved, new ones will appear. Discovery is never "finished" — it's a habit, not a milestone.

---

## References

- Teresa Torres — *Continuous Discovery Habits*
- Marty Cagan — *Inspired* and *Empowered* (dual-track discovery/delivery)
- Rob Fitzpatrick — *The Mom Test* (asking questions that don't lead the witness)
- Erika Hall — *Just Enough Research*
- Steve Portigal — *Interviewing Users*
- Paulo Caroli — *Lean Inception* (origin of the CSD Matrix — Certezas, Suposições, Dúvidas)
- Nielsen Norman Group — research on sample sizes for usability testing (the "5 users" rule)

---

*Product Hub | Product 101 | Product Discovery Guide*
