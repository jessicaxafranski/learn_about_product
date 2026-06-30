# LLM Limitations in the Context of RAG

**Source:** [IBM SkillsBuild — RAG Course](https://alm.ibm.com/ibm-skillsbuildadult)

---

Three core limitations of LLMs — Large Language Models, which are AI systems trained on massive amounts of text data to understand and generate human language (like ChatGPT, Claude, or Gemini):

## Outdated Information
Training data has a cutoff date, so the model won't know about recent events or changes.

## Hallucinations
The model can generate confident but completely wrong answers, especially when the question itself contains false assumptions.

## No Source Citations
Responses can't be verified because the model doesn't point to specific sources, which is a problem in high-stakes domains like health or finance.

---

> These three problems are a big part of why RAG exists — it addresses all of them by grounding the model's answers in your own up-to-date, verified documents.