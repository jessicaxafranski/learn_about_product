# Generative AI for Product Managers

*Based on the LinkedIn course: Generative AI for Product Managers.*

The debate about whether AI will replace PMs misses the more useful question: how does a PM who uses AI well outperform one who doesn't? This document is about the second question.

---

## What AI Does Well vs. What PMs Do Well

| Generative AI | Product Manager |
|---------------|-----------------|
| Generates content at speed and scale | Decides *what* to generate and *why* |
| Synthesizes large amounts of text | Applies judgment about what matters |
| Finds patterns in structured prompts | Navigates ambiguity, politics, and trade-offs |
| Executes well-defined tasks | Defines which tasks are worth doing |

The point isn't that AI can't replace PMs — it's that AI and a thoughtful PM working together can outperform either one alone. The PMs most at risk are those who do tasks that AI can do, without adding the layer of judgment that AI can't.

---

## Questions to Ask Before Integrating AI Into a Product

Before adding any AI capability to a product, answer these:

**About the problem:**
- What specific user problem does this solve?
- Is there a simpler, non-AI solution that's more reliable?
- What happens when the AI makes a mistake — how does the user recover?

**About the product context:**
- Is this for a new product or an enhancement to an existing one?
- Is there a specific metric this should move?
- Are there regulatory or compliance constraints that affect AI use?

**About the company:**
- What's the company's data position — do we have enough quality data to make the AI useful?
- What's the monetization model, and how does AI fit into it?
- Does this align with the company's mission?

---

## Using AI in the Product Lifecycle

### Discovery and validation

Instead of waiting weeks for research synthesis, use AI to:
- Cluster themes from user interview transcripts
- Identify contradictions across feedback sources
- Draft survey questions for a specific persona or hypothesis

Prompt pattern for persona research:
> "What user personas would use [technology] in a [type of app]? Create a prioritized list by reach. The app will launch first in [country/region]."

Then drill down:
> "For the first persona you identified, what is their primary pain point that [technology] could solve? What alternatives do they currently use?"

### Market validation

Use these prompt patterns systematically before committing to a direction:

| Question type | Prompt pattern |
|--------------|----------------|
| Market size | "What is the projected market size for [product category] in [region] in [year]?" |
| Competitive landscape | "Who are the main competitors for [product]? How do they differentiate?" |
| Historical precedents | "Have similar products been launched before? What happened?" |
| Regulatory risk | "Are there known regulations affecting [product type] in [market]?" |
| Cultural fit | "What adaptations would [product] need to succeed in [country]?" |

### Prototyping and spec writing

- "Generate a bulleted list of all screens an MVP for [product] would need."
- "Write a user story for [persona] trying to [goal], including acceptance criteria."
- "What are the edge cases for [feature] that the engineering team should handle?"

### Launch and go-to-market

| Task | AI useful? |
|------|------------|
| Writing the rollout plan | Yes |
| Creating marketing copy drafts | Yes |
| Predicting market trends | Yes (with caveats — always verify) |
| Making the launch decision | No |
| Replacing user research | No |

---

## Limitations to Stay Aware Of

AI models have knowledge cutoffs, so trend and market data may be outdated. Verify anything time-sensitive with current sources.

AI confidently produces plausible-sounding outputs that can be wrong. This is especially risky in competitive analysis and regulatory research. Treat AI output as a starting draft, not a final answer.

See [AI Biases and Critical Thinking](ai-biases-critical-thinking.md) for a structured approach to challenging AI-generated content.
