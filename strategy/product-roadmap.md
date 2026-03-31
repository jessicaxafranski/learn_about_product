# Building a Product Roadmap

A product roadmap is a strategic planning document — not a commitment schedule. Its job is to communicate the direction of the product, align stakeholders around a shared plan, and make trade-offs visible.

*Based on the LinkedIn course: Product Management — Build a Product Roadmap.*

---

## Who Needs to Be Involved

Roadmaps don't get built in isolation. The people who need to be involved — and whose input shapes the plan — include:

- Customers and customer-facing teams (support, sales, success)
- Investors, board members, and sponsors
- Engineering leads, architects, and designers
- Human resources (for capacity planning)

Missing any of these perspectives usually produces a roadmap that's either unrealistic or misaligned with business goals.

---

## What a Milestone Is (and Isn't)

A milestone marks a meaningful moment in the product's development — typically a major release, a capability going live, or a date the team needs to plan around.

Milestones are **not** backlog tasks or sprint goals. They represent changes significant enough to require substantial research, design, and engineering work. If a milestone can be completed in a week, it's probably a task.

---

## How to Build Your First Milestone List

Start from strategy, not from the backlog:

1. Re-read your product strategy and company objectives.
2. Research the market and your target customers — what problems are they facing that you haven't addressed yet?
3. Identify the major product changes that would advance the strategy.
4. For each change: record the strategic objective it supports and a brief summary of what "done" looks like.
5. Sort them in rough priority order — don't worry about dates yet.

Then get feedback. Share the list with key stakeholders and ask what they would change. Incorporate their input before moving to scheduling.

---

## Estimating Effort and Scheduling

Most teams underestimate how much of their capacity is already spoken for. Before adding dates, audit where time actually goes:

| Activity | Typical Allocation |
|----------|--------------------|
| Bug fixing | ~25% |
| Product maintenance | ~20% |
| Engineering-driven work | ~20% |
| **Available for new features** | **~35%** |

Your roadmap milestones can only fill that last bucket. This is the number that should drive your date estimates, not optimistic assumptions.

**Example:** A milestone requires 20 developer-weeks of effort. Your team has 5 developers, each contributing 35% of their time to new work. That's 5 × 0.35 = 1.75 effective developers per week. The milestone will take roughly 20 ÷ 1.75 ≈ 11 weeks, not 4.

Track front-end and back-end capacity separately — they rarely have the same constraints.

---

## Sequencing Milestones

Once you have effort estimates, sequence milestones into planning periods:

| | Quarter 1 | Quarter 2 | Quarter 3 | Quarter 4 |
|--|-----------|-----------|-----------|-----------|
| **Track A** | Milestone 1 | Milestone 3 | Milestone 6 | Milestone 8 |
| **Track B** | Milestone 2 | Milestone 4 | Milestone 7 | |
| | | Milestone 5 | | |

For each sequence decision, ask:
- Does this milestone directly advance the product strategy?
- Is it feasible given current engineering capacity?

If both answers are yes, it belongs on the roadmap. If either is no, it needs to be de-prioritized or descoped.

---

## Aligning Stakeholders

A roadmap nobody agrees with is a roadmap nobody will execute against. Run stakeholder alignment meetings with this structure:

1. State the goal — what problem is the roadmap solving?
2. Quickly recap the product strategy so everyone shares the same context.
3. Walk through team capacity — make the constraints visible.
4. Present the roadmap as a draft, not a decree.
5. Ask explicitly: "What would you change, and why?"
6. Make modifications in real time where possible.
7. Make trade-offs explicit — adding something means moving or removing something else.
8. End with a shared commitment, not just acknowledgment.

> "The purpose of the product roadmap is to align product stakeholders around the development plan that your roadmap represents."

After the meeting, schedule one-on-ones with teams that weren't in the room (legal, finance, operations). Roadmap surprises create more resistance than roadmap disagreements.

Always present the roadmap as a team artifact: **"This is our roadmap"** — not yours.

---

## Knowing When to Update

The roadmap should be a living document, reviewed on a regular cadence and updated when the situation meaningfully changes. Common triggers:

- Customer needs have shifted in a way that changes priorities
- A competitor moved that changes the opportunity landscape
- Engineering capacity or timeline estimates were significantly off

The process for updating is the same as building it: check the strategy first, then reassess priorities, then re-align stakeholders. Don't update the roadmap reactively to every stakeholder request — that's how you end up with no roadmap at all.

---

## Three Rules to Keep the Roadmap Useful

| Rule | Why it matters |
|------|----------------|
| Spend time with customers regularly | Roadmaps that aren't grounded in real problems drift toward internal politics |
| Share it broadly and often | Visibility prevents misalignment and surfaces objections early |
| Keep it current | A roadmap that's six months out of date is worse than no roadmap |
