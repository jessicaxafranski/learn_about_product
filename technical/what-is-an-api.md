# What Is an API?

API stands for Application Programming Interface. It's a set of rules that allows one software system to communicate with another — without a visual interface, and without either system needing to know how the other one works internally.

As a PM, you don't need to know how to build an API. You do need to understand what they are, how they affect product decisions, and what questions to ask your engineering team about them.

---

## The Simple Explanation

Think of a restaurant:

- **You** are the client application
- **The kitchen** is the server (where data or functionality lives)
- **The waiter** is the API — it takes your request, brings it to the kitchen, and returns the result

You don't need to know how the kitchen works. The waiter (the API) handles the communication through a defined protocol: you ask in a specific format, you get a response in a specific format.

---

## Why APIs Matter for Product Decisions

**They power invisible but critical features.** Address validation, payment processing, identity verification, weather data, maps — most of these work through third-party APIs. When these fail, your product fails, even if your code is fine.

**They have performance implications.** Every API call takes time. If a user action triggers two or three API calls in sequence, those response times stack. PMs who don't account for this end up with features that work in demos and disappoint in production.

**They have cost implications.** Many APIs are priced per call. A feature that seemed cheap to build can become expensive at scale if it triggers many API requests per user session. This needs to be factored into pricing models and gross margin calculations.

**They create dependency risk.** If a third-party API you depend on changes its contract, raises prices, or goes down, your product is affected. That's a risk to track, not just an engineering concern.

---

## Key Questions to Ask Your Engineering Team

When a feature relies on an API:

- What is the expected response time for this API call, and what happens to the user experience if it takes 2–3× longer than expected?
- What's the fallback behavior if the API is unavailable?
- What's the cost per call, and what does that look like at 10× current usage?
- Is this a third-party API we're dependent on, and are there alternatives if it changes?
- Does this API have rate limits that could affect our heaviest users?

---

## Benefits of APIs

- **Speed to market** — instead of building functionality from scratch, you integrate a service that already exists
- **Reliability** — established APIs (Stripe for payments, Twilio for SMS) are often more reliable than custom-built alternatives
- **Developer velocity** — well-documented APIs let developers build faster with fewer unknowns

---

## Recommended Listening

These podcast episodes offer accessible perspectives on technical products for non-engineers:

**Women in Product — Ep. 65: Technical Products**
Covers how to work on products that have no visual interface, how to define requirements for API products, and how to break down technical work for cross-functional teams.
[Listen on Spotify](https://open.spotify.com/episode/0fGb1G30pvWjCs4ETO5G0S)

**Product Guru's — Ep. 99: The Importance of the API (Vagner Fiuza)**
A practical walkthrough of API products in the context of product metrics, measurement, and business value — in Portuguese.
[Listen on Spotify](https://open.spotify.com/episode/59QIYA8XxoQXRzP1EBLeeI)
