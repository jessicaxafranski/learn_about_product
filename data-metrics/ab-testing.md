# A/B Testing

A/B testing (split testing) is a method of comparing two versions of something to determine which performs better based on a defined metric. It's one of the most reliable ways to make product decisions because it uses real user behavior — not surveys, assumptions, or opinions.

---

## The Core Principle

Show version A to one group of users and version B to another. Measure a specific outcome for each group. Determine whether the difference is statistically significant. Ship the winner.

The key constraint: **change only one variable at a time.** If you change the button color and the headline simultaneously, you won't know which change drove the result.

---

## Why Run A/B Tests

**Evidence over intuition.** Everyone on a product team has opinions about what will work. A/B tests let reality decide.

**Risk reduction.** You can validate a change with a small percentage of your traffic before rolling it out to everyone. A bad change affects fewer users.

**Continuous improvement.** Even small wins compound. An 8% lift in conversion rate, repeated across several experiments over a year, adds up to significant revenue impact.

**Informed resource allocation.** Tests tell you where to invest further — and where to stop investing.

---

## Key Concepts

**Control:** The existing version (version A). This is your baseline.

**Variant:** The version with the change you're testing (version B). There can be more than one variant, but each one doubles the complexity.

**Hypothesis:** A falsifiable prediction written *before* the experiment runs. Format: "Changing [X] will increase [metric] because [reason]." Without a hypothesis, you're not running an experiment — you're just collecting data and looking for patterns after the fact.

**Conversion rate:** The percentage of users who take the desired action. This is usually your primary success metric.

**Sample size:** The number of users in each group. Larger samples produce more reliable results. Running a test with 50 users per group will give you noisy, untrustworthy data.

**Statistical significance:** The confidence threshold at which you accept that the difference between variants is real and not due to random variation. The standard is 95% confidence (p < 0.05).

---

## Experiment Duration

**Minimum recommended duration: 2 weeks.**

Running a test for less than two weeks risks:

- Capturing day-of-week effects (behavior on Monday differs from behavior on Saturday)
- Not reaching statistical significance even if the effect is real
- Making decisions on early-adopter behavior that doesn't reflect your average user

Don't stop a test early because it looks like the variant is winning. Wait until you have the sample size you planned for — stopping early dramatically inflates false positive rates.

---

## When A/B Testing Is Not the Right Tool

- **Traffic is too low.** If you can't reach statistical significance within a reasonable timeframe, you'll be running experiments for months. Consider qualitative research instead.
- **The change is too small to measure.** Some improvements are real but below the detection threshold of your traffic level.
- **You need to move fast.** A/B tests take time. For urgent decisions or early-stage products, make a judgment call and measure the outcome retrospectively.
- **The change is irreversible.** Tests work when you can roll back. If you can't, you need more confidence before shipping — not an experiment.

---

## Multivariate Testing

Multivariate testing tests multiple variables simultaneously to understand how they interact. For example, testing both headline copy and image at the same time.

The trade-off: it requires significantly more traffic to reach significance across all combinations, and the analysis is more complex. For most teams, running sequential A/B tests is more practical than multivariate testing.

---

## Common Mistakes

- Running a test without a hypothesis
- Stopping early when you see a positive result ("peeking")
- Ignoring statistical significance and declaring a winner based on gut feel
- Testing with too small a sample
- Forgetting to check for novelty effects (users behave differently because something is new, not because it's better)
- Treating a failed test as a failure — a null result is information too
