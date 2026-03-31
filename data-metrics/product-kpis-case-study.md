# Case Study: Acquisition and Retention Metrics

This case study is based on a product analytics exercise for **RandoSando**, a food delivery app for sandwiches available on iOS and Android. The exercise covers how to define a measurement framework for acquisition and retention across the full customer journey.

---

## The Business Questions

The product team needs answers to three problems:

1. Which marketing channels drive the most purchases and the most abandoned orders — broken down by first-time vs. repeat buyers, and by platform (iOS vs. Android)?
2. What should the retention strategy be, given that there are many competing food delivery options?
3. How does the onboarding experience (specifically dietary preferences) affect purchasing behavior over time?

These questions aren't independent. They form a measurement framework that needs to span the full customer lifecycle.

---

## Part 1: Acquisition Metrics

Acquisition is about understanding how users arrive and what they do next. For RandoSando, this means building a funnel analysis segmented by:

- **Channel** (paid social, organic search, referral, email, etc.)
- **Platform** (iOS vs. Android)
- **User type** (first-time buyer vs. repeat buyer)

### Key acquisition metrics

| Metric | What it measures |
|--------|-----------------|
| Install-to-order rate | What percentage of app installs result in a first purchase |
| Channel conversion rate | Which channels produce users who actually buy, not just download |
| Cart abandonment rate by channel | Which channels drive high-intent users who still don't convert |
| Cost per acquisition (CPA) | What it costs to get one paying customer from each channel |
| Time-to-first-order | How long after install does the first purchase happen |

The split between first-time and repeat buyers matters because they behave differently and respond to different interventions. A channel that drives a lot of first purchases might be producing low-retention users. A channel that drives fewer but higher-LTV customers might be undervalued.

---

## Part 2: Retention Metrics

Retention is harder to define than acquisition because there's no universal answer to "what does retained mean?" Every product has to define it for itself.

For RandoSando, the core question is: **what does it mean for a user to be retained?**

A starting definition: a user who places at least one order per month. But this needs to be validated against actual user behavior. If the natural ordering frequency for your best users is once a week, a monthly threshold is too loose.

### Retention metric categories

**Engagement retention** — is the user actively using the app?
- Weekly/monthly active users (WAU/MAU ratio)
- Session frequency
- Feature adoption rate (e.g., percentage of users using the "view ingredients" modal)

**Transaction retention** — is the user continuing to buy?
- Month-2, Month-3, Month-6 repeat purchase rates
- Orders per user per month by cohort
- Revenue retention (net revenue retained from a given cohort over time)

**Churn indicators** — who is leaving, and when?
- Days since last order (leading indicator of churn)
- Churn rate by segment (dietary preference, platform, acquisition channel)
- Reactivation rate (users who churned and came back)

### The RandoSando retention question

The team knows there are many food delivery competitors. Retention strategy options include loyalty programs, push notifications, personalized recommendations, and subscription models. The measurement framework must evaluate which intervention works — and for whom.

---

## Part 3: The Dietary Preferences Dimension

RandoSando collects dietary preferences during onboarding. The hypothesis is that users whose preferences are well-accommodated stay longer.

This requires a segmented cohort analysis:

1. Group users by dietary preference set (vegan, gluten-free, no restrictions, etc.)
2. Compare retention curves across groups
3. Identify which groups show early drop-off (suggesting their needs aren't being met)

Additionally, version 1.2 introduced a "view sandwich ingredients" modal. The question is whether users who adopted this feature show higher retention than those who didn't.

**Caution on causation:** Users who engage more deeply with any feature tend to be more retained regardless of the feature. Before concluding the modal drives retention, check whether the adoption correlates with other engagement signals, or whether the modal is a symptom of engagement rather than a cause of it.

---

## Proposed Measurement Framework

| Stage | Key Metric | Segmentation |
|-------|-----------|--------------|
| Awareness | Installs by channel | iOS / Android |
| Acquisition | Install-to-first-order rate | Channel, platform |
| Activation | Completed onboarding + dietary preferences set | Diet type |
| Engagement | Feature adoption rate (ingredients modal) | Dietary group |
| Retention | 30/60/90-day repeat purchase rate | Cohort, channel, diet |
| Revenue | Average order value, orders per month | Segment |
| Churn | Days since last order, churn rate | Platform, diet, channel |

This framework connects each stage of the customer journey to a specific metric, and each metric to at least one actionable segmentation. The goal is not just to know that retention is falling — it's to know *for whom* and *at what point*, so you can intervene.
