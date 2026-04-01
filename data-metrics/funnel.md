# Conversion Funnel
### A practical guide for Product Managers
**Product Hub | Product 101**

---

## What is a Conversion Funnel?

A conversion funnel describes the step-by-step journey a user takes from first contact with your product to completing a desired goal — a purchase, a sign-up, a booking. Every digital product has one.

Think of it like a leaky pipe. Water enters at the top and some leaks out at every joint. As a PM, your job is to find where it leaks the most and fix it.

> **Core question: How efficient am I at turning visitors into customers?**

Most funnels follow this pattern — many people enter, fewer reach each next step, and only a small fraction complete the final goal. The job of a PM is to maximise the number of people who reach the end.

---

## Key Metrics Every PM Must Know

### 1. Issuance Rate — Overall Conversion

The single number that tells you how healthy your funnel is overall.

> **Issuance Rate = People who FINISH ÷ People who START**
> Example: 20 ÷ 1,000 = **2% overall conversion**

### 2. Step Conversion Rate

How good is each individual step at moving users to the next one? This is where you find problems.

> **Step Rate = Users at next step ÷ Users at current step**
> Example: 600 ÷ 1,000 = 60% | 300 ÷ 600 = 50%

### 3. Drop-off Rate

The opposite of the step conversion rate. High drop-off means high opportunity — this is where you focus your energy.

> **Drop-off = 100% minus Step Conversion Rate**
> If step rate is 50%, drop-off is 50% of users lost at that step

---

## Reading a Funnel — A Real Example

Below is a sample marketplace funnel with 1,000 users entering.

![Conversion Funnel Chart](funnel_chart.png)

| Step | Users | % of Total | Drop-off | Step Rate |
|---|---|---|---|---|
| Homepage | 1,000 | 100% | — | — |
| Product Search | 600 | 60% | -400 | 60% |
| **Product Page** ← bottleneck | **300** | **30%** | **-300** | **50%** |
| Add to Cart | 90 | 9% | -210 | 30% |
| Checkout | 60 | 6% | -30 | 67% |
| ✅ Purchase | 20 | 2% | -40 | 33% |

The overall conversion is only **2%** — 98 out of every 100 users never purchase. The bottleneck is Search → Product Page, where 300 users are lost at a 50% step rate.

---

## Finding the Bottleneck

The bottleneck is the step with the highest drop-off. It is always your first priority because fixing it has the biggest downstream impact on all steps that follow.

> **Rule: Biggest drop-off = Biggest opportunity. Always fix the bottleneck first.**

### Is it a User Problem or a Technical Problem?

Before jumping to solutions, you need to understand the root cause. Every underperforming step falls into one of two categories:

| Problem type | What it means | How to detect |
|---|---|---|
| User problem | Page confuses, doesn't convince, or doesn't deliver enough value | Heatmaps, session recordings, time on page |
| Technical problem | Error, slow loading, broken API, or no results returned | Error logs, performance monitoring, server alerts |

Always rule out **technical problems first**. If something is broken, no amount of UX improvement will fix it. Check error logs before opening heatmaps.

---

## Tools for Diagnosis

Once you know which step is failing, use these tools to understand why users are dropping off:

| Tool | What it shows | When to use it |
|---|---|---|
| Heatmaps | Visual map of where users click or ignore | Identify confusing layouts or ignored CTAs |
| Session recordings | Full replay of what each user does on screen | Spot frustration, hesitation, or mis-clicks |
| Time on page | How long users stay at each step | Too long = confused. Too short = gave up fast |
| Funnel analytics | Numbers for each step (GA4, Mixpanel) | Find the biggest drop-off instantly |
| Error logs | Technical failures and broken flows | Rule out technical issues before UX work |

### The Diagnostic Order

Follow this sequence to avoid wasting time investigating the wrong thing:

| | |
|---|---|
| **Step 1** | Funnel analytics — is this affecting all users or just a segment? |
| **Step 2** | Error logs — is something technically broken? (Fastest to rule out) |
| **Step 3** | Session recordings — what are users actually doing? |
| **Step 4** | Heatmaps — where are they clicking or ignoring? |
| **Step 5** | Time on page — are they confused or leaving immediately? |

---

## Always Segment Before Concluding

Never trust an average alone. The same metric can hide completely different problems depending on who you are looking at.

> **Always ask: Average for WHO? Which device? Which traffic source? New or returning users?**

For example, if session recordings show users spending time on a page without clicking, segment by device before acting:

| Segment | Time on page | Clicks | Likely problem |
|---|---|---|---|
| Mobile users | 4 minutes | None | Usability — trying but can't convert |
| Desktop users | 45 seconds | None | Value — not convinced, leaving fast |

Same symptom, completely different root cause. Mobile users are trying to convert but something is blocking them — higher priority. Desktop users are not convinced by what they see — different solution entirely.

---

## Writing a Strong Hypothesis

Once you have identified the problem, do not jump straight to building. Write a specific, testable hypothesis first.

| | |
|---|---|
| ❌ **WEAK** | Users are frustrated with the experience |
| ✅ **STRONG** | BECAUSE buttons are too small on mobile, users mis-click and abandon. IF we increase tap target size, THEN mobile click-through will improve. WE WILL KNOW when mobile conversion rises by at least 10%. |

> **Formula: BECAUSE [specific problem] IF we [specific solution] THEN [metric] will improve. WE WILL KNOW when [specific number] is reached.**

---

## Testing with A/B Experiments

Never ship a fix to 100% of users without validating first. An A/B test lets you prove your hypothesis safely before committing.

| ❌ Ship to everyone | ✅ A/B test first (recommended) |
|---|---|
| You ASSUME you are right | You PROVE you are right |
| If wrong: 100% of users affected | If wrong: only 50% of users affected |
| Hard to measure true impact | Clear comparison between control and variant |
| High risk | Low risk — always the preferred approach |

---

## Measuring the Impact

Once you fix the bottleneck, recalculate the full funnel using the existing step rates. Even a small improvement at one step creates a cascading effect on every step below it.

> **In our example: recovering just 20% of lost users at the Product Page step produces 35% more purchases at the end of the funnel — without touching any other step.**

| Step | Before fix | After fix | Extra users |
|---|---|---|---|
| Homepage | 1,000 | 1,000 | — |
| Product Search | 600 | 660 | +60 |
| Product Page | 300 | 330 | +30 |
| Add to Cart | 90 | 99 | +9 |
| Checkout | 60 | 66 | +6 |
| ✅ Purchase | **20** | **27** | **+7 (+35%)** |

This is the core insight every PM must internalise: fixing the right step multiplies impact through the entire funnel automatically. You do not need to fix everything — you need to fix the right thing first.

---

## The Full PM Loop

Every time you look at a funnel, follow this sequence:

| | |
|---|---|
| **1. Spot** | Look at each step conversion rate and find where the biggest drop-off happens |
| **2. Segment** | Break data down — is this affecting all users or just mobile, new users, or one traffic source? |
| **3. Find** | Identify the bottleneck — the step with the highest drop-off |
| **4. Diagnose** | Is it a user problem or a technical problem? |
| **5. Hypothesise** | Write a specific, testable hypothesis with a clear success metric |
| **6. Experiment** | Design an A/B test — validate before shipping to everyone |
| **7. Measure** | Recalculate the full funnel and report the impact |

> **Remember: a small fix at the right step creates massive impact at the end. This is the core of Growth PM thinking.**

---

*Product Hub | Product 101 | Conversion Funnel Guide*
