# API Metrics

API metrics are the measurements that tell you whether your API is working, how fast it responds, how often it fails, and how it behaves under load. For a PM, these are not just engineering concerns — they directly affect user experience, reliability, and the business impact of every feature that depends on an external or internal API.

A slow API makes the product feel slow. A failing API makes the product feel broken. Understanding these metrics helps you have better conversations with engineers, write more grounded acceptance criteria, and catch problems before users do.

---

## The Four Categories

Every important API metric falls into one of four categories.

| Category | What it measures | PM relevance |
|---|---|---|
| **Latency** | How long a request takes | Directly felt by users as speed |
| **Availability** | Whether the API is reachable | Determines product uptime |
| **Error rate** | How often requests fail | Signals quality and reliability |
| **Traffic** | Volume and patterns of usage | Capacity planning, cost, anomaly detection |

---

## Latency

**Latency** is the time between sending a request and receiving a response. It is the most user-visible API metric.

### Key Latency Metrics

| Metric | What it measures | Typical target |
|---|---|---|
| **p50 (median)** | Half of requests are faster than this | < 200ms |
| **p95** | 95% of requests are faster than this | < 500ms |
| **p99** | 99% of requests are faster than this | < 1,000ms |
| **p99.9** | 999 out of 1,000 requests are faster | < 2,000ms |
| **Time to First Byte (TTFB)** | When the client starts receiving data | < 200ms |

### Why Percentiles Matter More Than Averages

Averages hide the worst user experiences.

**Example:** Your API has a mean response time of 180ms. That sounds fast. But if your p99 is 4,000ms, 1 in every 100 users is waiting 4 seconds — and those users are often your heaviest, most valuable ones.

```
Request times (ms): 100, 110, 120, 130, 140, 150, 200, 250, 4000
Mean: 578ms  ← misleading
p50: 140ms   ← most users experience this
p99: 4000ms  ← the outlier that destroys the experience
```

> Always look at p95 and p99 in addition to the median. The average is a comfortable lie.

### Latency Components

Understanding where latency comes from helps you prioritize fixes.

| Component | Description |
|---|---|
| **Network latency** | Time for the request to travel to the server and back |
| **Processing time** | Time the server spends computing the response |
| **Database query time** | Time spent reading or writing to the database |
| **Downstream API time** | Time spent waiting on third-party APIs the server calls |
| **Serialization time** | Time to encode/decode JSON or other formats |

---

## Availability and Uptime

**Availability** measures how often the API is reachable and responding successfully. It is usually expressed as a percentage over a time period.

### SLA Tiers

| Availability | Downtime per month | Downtime per year |
|---|---|---|
| **99%** | ~7.3 hours | ~3.65 days |
| **99.5%** | ~3.6 hours | ~1.83 days |
| **99.9%** (three nines) | ~43 minutes | ~8.7 hours |
| **99.95%** | ~21 minutes | ~4.4 hours |
| **99.99%** (four nines) | ~4.3 minutes | ~52 minutes |

Most commercial APIs target 99.9%. Critical financial or healthcare infrastructure often targets 99.99%.

### How Availability Is Calculated

```
Availability = (Total time − Downtime) / Total time × 100
```

**Example:** In a 30-day month (43,200 minutes), if the API was down for 25 minutes:

```
Availability = (43,200 − 25) / 43,200 × 100 = 99.94%
```

### Uptime vs Availability

These are related but not identical.

| Term | Definition |
|---|---|
| **Uptime** | The API is running and reachable |
| **Availability** | The API is running, reachable, and returning correct responses |

An API can be "up" but returning 500 errors — that is not availability.

---

## Error Rate

**Error rate** is the percentage of requests that return an error response (4xx or 5xx). It is the most direct signal of product reliability.

### Error Rate Formula

```
Error Rate = (Failed Requests / Total Requests) × 100
```

**Example:** Out of 50,000 requests in an hour, 750 returned errors:

```
Error Rate = (750 / 50,000) × 100 = 1.5%
```

A 1.5% error rate sounds small. At scale, it is not.

### Error Rate Benchmarks

| Error Rate | Signal |
|---|---|
| **< 0.1%** | Healthy — expected background noise |
| **0.1% – 0.5%** | Worth monitoring — investigate the cause |
| **0.5% – 1%** | Degraded — users are likely noticing |
| **> 1%** | Incident — page the team |

### 4xx vs 5xx Errors

Splitting error rate by type tells you who is responsible.

| Error type | Meaning | Owner |
|---|---|---|
| **4xx (Client errors)** | Bad request from the caller | API consumer (your frontend, your integration) |
| **5xx (Server errors)** | Something failed on the server | API provider (your backend, the third party) |

A spike in 4xx errors after a frontend deploy usually means a change in how your app calls the API. A spike in 5xx errors usually means something failed in the infrastructure.

### Error Rate by Endpoint

Aggregate error rate can mask isolated failures. Always break it down by endpoint.

| Endpoint | Requests | Errors | Error Rate |
|---|---|---|---|
| `GET /products` | 30,000 | 12 | 0.04% |
| `POST /orders` | 8,000 | 7 | 0.09% |
| `GET /users/profile` | 10,000 | 680 | 6.8% ⚠️ |
| `PATCH /cart` | 2,000 | 3 | 0.15% |

In this example, the aggregate error rate is ~0.9% — borderline acceptable. But `/users/profile` has a 6.8% error rate that is being averaged away.

---

## Traffic and Throughput

**Traffic** measures the volume of requests your API receives. **Throughput** measures how many requests your API can handle successfully.

### Key Traffic Metrics

| Metric | What it measures |
|---|---|
| **Requests per second (RPS)** | Volume of incoming requests at a given moment |
| **Requests per minute/hour** | Useful for trend analysis and capacity planning |
| **Peak RPS** | The highest traffic spike recorded — used for scaling decisions |
| **Concurrent connections** | How many requests are being processed simultaneously |

### Traffic Patterns to Know

| Pattern | What it looks like | Why it matters |
|---|---|---|
| **Diurnal pattern** | Traffic rises during business hours, drops at night | Normal — helps plan maintenance windows |
| **Traffic spike** | Sudden sharp increase | Can overwhelm capacity if not planned for (e.g., a viral campaign) |
| **Gradual growth** | Steady upward trend over weeks | Signals scaling decisions approaching |
| **Sudden drop** | Traffic falls unexpectedly | Could indicate an outage, broken integration, or client-side bug |

---

## Rate Limiting

**Rate limiting** controls how many requests a client can make in a given time window. It protects the API from being overwhelmed by a single consumer.

### Common Rate Limit Strategies

| Strategy | How it works | Example |
|---|---|---|
| **Fixed window** | X requests per time period (resets at the end) | 1,000 req/minute, resets at :00 |
| **Sliding window** | X requests in the last N seconds, rolling | 1,000 req in any 60-second window |
| **Token bucket** | Requests consume tokens; tokens refill over time | Allows bursts up to the bucket size |

### What Rate Limit Headers Look Like

When an API enforces rate limits, it typically returns headers telling the client its status.

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 243
X-RateLimit-Reset: 1706745600
```

When the limit is exceeded, the server returns `429 Too Many Requests`.

### PM Considerations for Rate Limits

When scoping a feature that depends on a third-party API:

- What is the rate limit? (requests per minute/hour/day)
- What happens when the limit is hit? (hard block, queue, or degrade gracefully?)
- Is the limit per user, per API key, or per IP?
- Can the limit be increased with a higher-tier plan?

A feature that looks simple to build may be rate-limited in a way that breaks at scale.

---

## Apdex Score

**Apdex** (Application Performance Index) is a standardized score that combines latency and satisfaction into a single number between 0 and 1.

### How It Works

You define a **threshold T** (e.g., 500ms = acceptable).

| Response time | Category | Weight |
|---|---|---|
| ≤ T | Satisfied | 1.0 |
| T < time ≤ 4T | Tolerating | 0.5 |
| > 4T | Frustrated | 0.0 |

```
Apdex = (Satisfied + 0.5 × Tolerating) / Total Requests
```

### Apdex Benchmarks

| Score | Rating |
|---|---|
| 1.0 | Excellent |
| 0.94 – 1.0 | Excellent |
| 0.85 – 0.94 | Good |
| 0.70 – 0.85 | Fair |
| 0.50 – 0.70 | Poor |
| < 0.50 | Unacceptable |

**Example:** T = 500ms. Out of 1,000 requests: 700 satisfied (≤500ms), 200 tolerating (≤2,000ms), 100 frustrated (>2,000ms).

```
Apdex = (700 + 0.5 × 200) / 1,000 = (700 + 100) / 1,000 = 0.80 → Fair
```

---

## SLI, SLO, and SLA

These three terms describe how reliability is defined, measured, and committed to.

| Term | Full name | What it is | Who it involves |
|---|---|---|---|
| **SLI** | Service Level Indicator | The actual measurement (e.g., p99 latency = 320ms) | Engineering |
| **SLO** | Service Level Objective | The internal target (e.g., p99 < 500ms, 99.9% of the time) | Engineering + Product |
| **SLA** | Service Level Agreement | The external commitment with consequences if broken | Product + Legal + Business |

### Example Stack

```
SLI:  p99 latency measured at 280ms
SLO:  p99 latency must be < 500ms for 99.5% of requests per month
SLA:  If uptime falls below 99.9%, customers receive a service credit
```

> SLOs are internal promises to your team. SLAs are external promises to your customers. Break an SLO and you have a problem. Break an SLA and you have a contract issue.

---

## What a PM Needs to Know

| Situation | Metric to look at |
|---|---|
| **Users complaining the product feels slow** | p95 and p99 latency by endpoint |
| **Investigating an incident** | Error rate split by 4xx vs 5xx, broken down by endpoint |
| **Evaluating a third-party integration** | Their published SLA, rate limits, and p99 latency |
| **Planning a high-traffic launch or campaign** | Peak RPS, current capacity headroom, auto-scaling configuration |
| **Writing acceptance criteria for a new API feature** | Define SLO targets (latency threshold, error rate ceiling) before engineering starts |
| **Negotiating with a vendor** | What does their SLA actually cover? What are the credits? What is excluded? |

---

## Simple Mental Model

> Latency is how fast. Availability is how often. Error rate is how reliably. Traffic is how much.
> A healthy API scores well on all four — and you should know which one is degrading before your users tell you.

---

## References

| Concept | Source |
|---|---|
| **Apdex standard** | Apdex Alliance — apdex.org. The official specification for the Application Performance Index |
| **SLI, SLO, SLA** | Google — *Site Reliability Engineering* (2016), Chapter 4. The foundational framework for service reliability measurement |
| **Percentile latency** | Gil Tene — "How NOT to Measure Latency" (talk). Explains why averages mislead and why percentiles matter |
| **Rate limiting patterns** | Stripe Engineering Blog — "Rate Limiters" (2016). Practical breakdown of token bucket vs sliding window strategies |
| **HTTP status codes** | IETF RFC 9110 — *HTTP Semantics*. The authoritative reference for all HTTP response codes |
