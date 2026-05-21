# Structuring a Product Analytics Folder
### A production-level framework for RandoSando

---

## TL;DR

Most analytics folders are organized by tool or by date. Neither works when you need to make decisions fast. This guide shows how to structure your data around the user lifecycle — so any PM, analyst, or stakeholder can find what they need and act on it immediately.

---

## The Folder Structure

```
randosando-analytics/
├── 00_overview/
│   ├── metrics-glossary.md
│   ├── north-star-metric.md
│   └── measurement-principles.md
│
├── 01_acquisition/
│   ├── channel-performance/
│   │   ├── install-to-order-by-channel.csv
│   │   ├── cpa-by-channel.csv
│   │   └── cart-abandonment-by-channel.csv
│   ├── platform-split/
│   │   ├── ios-vs-android-conversion.csv
│   │   └── platform-acquisition-costs.csv
│   └── summary-acquisition.md
│
├── 02_activation/
│   ├── onboarding/
│   │   ├── dietary-preferences-completion-rate.csv
│   │   └── time-to-first-order-by-onboarding-path.csv
│   ├── feature-adoption/
│   │   ├── ingredients-modal-adoption-rate.csv
│   │   └── modal-adoption-vs-retention-correlation.csv
│   └── summary-activation.md
│
├── 03_retention/
│   ├── cohort-analysis/
│   │   ├── 30-60-90-day-retention-by-cohort.csv
│   │   └── retention-curves-by-diet-group.csv
│   ├── churn/
│   │   ├── churn-rate-by-segment.csv
│   │   ├── days-since-last-order.csv
│   │   └── reactivation-rate.csv
│   ├── engagement/
│   │   ├── wau-mau-ratio.csv
│   │   └── session-frequency-by-segment.csv
│   └── summary-retention.md
│
├── 04_revenue/
│   ├── aov-by-segment.csv
│   ├── orders-per-user-per-month.csv
│   ├── revenue-retention-by-cohort.csv
│   └── summary-revenue.md
│
├── 05_experiments/
│   ├── ab-tests/
│   │   └── [test-name]_[YYYY-MM-DD]_results.md
│   └── hypotheses-backlog.md
│
└── 06_dashboards/
    ├── executive-summary.md
    ├── weekly-metrics-report-template.md
    └── links/
        ├── acquisition-dashboard.md
        └── retention-dashboard.md
```

---

## What Goes in Each Folder

### 00_overview — The Foundation

Before any data, define your terms. This folder is read first by anyone new to the project.

- **metrics-glossary.md** — Define every metric used across the project. What does "retained" mean? What counts as an "install"? Ambiguous definitions produce inconsistent numbers.
- **north-star-metric.md** — The single metric that best captures the value RandoSando delivers to users. Everything else ladders up to this.
- **measurement-principles.md** — Ground rules: how you handle attribution, what counts as a conversion, how you treat edge cases.

### 01_acquisition — How Users Arrive

Organized by the two dimensions that matter most: channel and platform.

- **channel-performance/** — Which channels bring buyers, not just downloads. Always include CPA and abandonment rate alongside conversion.
- **platform-split/** — iOS and Android users often behave differently. Keeping this separate prevents platform-specific problems from hiding in averages.
- **summary-acquisition.md** — One-page summary: which channels are working, which aren't, and what the next action is.

### 02_activation — Did the User Get Value?

Activation is the bridge between install and habit. This is where onboarding and feature adoption live.

- **onboarding/** — Did users complete dietary preferences? How does completion rate affect time-to-first-order? This is your activation funnel.
- **feature-adoption/** — Track the ingredients modal separately. Include a file comparing adoption rate against retention — but flag the causation caveat clearly in the filename.
- **summary-activation.md** — What % of installs are activating? Where is the drop-off?

### 03_retention — Are Users Coming Back?

The most important folder. Split into three sub-layers so problems don't hide in each other.

- **cohort-analysis/** — How different groups of users behave over time. Segment by diet group to identify unmet needs.
- **churn/** — Leading indicators (days since last order) and lagging indicators (churn rate). Both are needed.
- **engagement/** — WAU/MAU ratio and session frequency show early signs of disengagement before churn happens.
- **summary-retention.md** — Retention curves, key drop-off points, and recommended interventions.

### 04_revenue — Is the Business Growing?

Revenue metrics at the user level, not just the total.

- Average order value by segment
- Orders per user per month, tracked by cohort to see whether purchasing frequency changes over time
- Revenue retention — how much of a cohort's revenue is still active after 30, 60, 90 days

### 05_experiments — What We're Testing

Every A/B test gets its own file. This folder is the source of truth for what has been validated vs. assumed.

- **ab-tests/** — One file per experiment. Naming format: `ingredients-modal-cta_2024-03-15_results.md`
- **hypotheses-backlog.md** — Ideas not yet tested, prioritized by potential impact.

### 06_dashboards — What Leadership Sees

Dashboards are views of the data, not the data itself. Store links and templates here, not raw files.

- **executive-summary.md** — Weekly snapshot: one metric per lifecycle stage, with a trend direction and a one-line interpretation.
- **weekly-metrics-report-template.md** — A repeatable structure so reports stay consistent across weeks and authors.

---

## Naming Conventions

| Rule | Good | Bad |
|------|------|-----|
| Lowercase with hyphens | `churn-rate-by-segment.csv` | `Churn Rate by Segment (FINAL).csv` |
| Include the dimension in the name | `retention-by-diet-group.csv` | `retention-data.csv` |
| Date experiments with ISO format | `modal-test_2024-03-15_results.md` | `modal-test-march-final.md` |
| Use `summary-` prefix for narrative files | `summary-retention.md` | `retention-notes.md` |
| Never use "final", "v2", "new" | `cpa-by-channel.csv` | `cpa-by-channel-v3-FINAL.csv` |

---

## Common Mistakes to Avoid

**1. Organizing by tool, not by question**
Folders named "Mixpanel", "GA4", "Amplitude" make you hunt for the answer. Organize by the business question instead — the tool is irrelevant to the reader.

**2. No summary files**
Raw data without interpretation is useless for leadership. Every folder should have a `summary-` file that answers: what does this tell us, and what should we do?

**3. Embedding conclusions in file names**
`modal-adoption-drives-retention.csv` is a false claim disguised as a filename. Use `modal-adoption-vs-retention-correlation.csv` instead.

**4. One big flat metrics folder**
When everything lives in one place, nothing is findable. The lifecycle structure forces clarity on what stage each metric belongs to — and makes gaps obvious.

**5. No versioning strategy for experiments**
A/B test results get overwritten or lost. Each experiment deserves its own dated file, even if it's a markdown summary of two paragraphs.

---

## Optional Improvements

| Improvement | What it adds |
|-------------|-------------|
| `README.md` in each folder | Explains the folder's purpose and which files to read first — essential for new team members |
| `data-dictionary.md` in `00_overview/` | Maps every column name to a plain-language definition — prevents metric disagreements in reviews |
| `changelog.md` in `05_experiments/` | Tracks which hypotheses were validated, rejected, or deprioritized — and why |
| Executive dashboard (single view) | One metric per lifecycle stage, updated weekly. Reduces ad-hoc data requests significantly. |
| dbt or a data catalog at scale | Folder structures break down at scale — use a tool like dbt, Atlan, or Notion as the single source of truth |

---

> *A good analytics structure answers a question before you have to ask it. If a stakeholder has to hunt for a number, the structure has failed.*