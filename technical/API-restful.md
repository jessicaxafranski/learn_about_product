# RESTful APIs

A RESTful API is a set of rules for how two systems communicate over the internet. REST (Representational State Transfer) is an architectural style — not a protocol or a standard — that defines how requests should be structured, how resources should be named, and what the server should return. If an API follows these rules consistently, it is called RESTful.

Most of the APIs you interact with as a PM — Stripe, Slack, Salesforce, Google Maps — are RESTful.

---

## The Six REST Constraints

REST is defined by six architectural principles. An API that follows them is predictable, scalable, and easy to integrate with.

| Constraint | What it means in practice |
|---|---|
| **Client-Server** | The frontend (client) and backend (server) are separate. Each evolves independently |
| **Stateless** | Each request contains everything the server needs. The server stores no session state between requests |
| **Cacheable** | Responses can be cached by the client or intermediaries to reduce load and improve speed |
| **Uniform Interface** | Resources are identified by URLs. The same rules apply across the entire API |
| **Layered System** | The client doesn't know if it's talking directly to the server or through a load balancer or cache |
| **Code on Demand** | Optional. The server can send executable code (e.g., JavaScript) to the client |

The most important in practice: **Stateless** and **Uniform Interface**. These two make REST predictable enough to use without reading the source code.

---

## Resources and URLs

In REST, everything is a **resource** — a user, an order, a product, a payment. Resources are identified by URLs called **endpoints**.

```
https://api.example.com/users
https://api.example.com/users/42
https://api.example.com/users/42/orders
```

**URL design rules:**

| Rule | Good | Bad |
|---|---|---|
| Use nouns, not verbs | `/orders` | `/getOrders` |
| Use plural nouns | `/products` | `/product` |
| Nest for relationships | `/users/42/orders` | `/getUserOrders?id=42` |
| Use lowercase and hyphens | `/product-categories` | `/ProductCategories` |
| Resource ID in the path | `/orders/99` | `/orders?id=99` |

A URL should describe **what** the resource is, not **what action** is being taken. The action is expressed by the HTTP method.

---

## HTTP Methods

HTTP methods define what operation is being performed on a resource. A RESTful API uses them semantically — each method has an expected meaning that clients and servers rely on.

| Method | Purpose | Idempotent? | Has body? |
|---|---|---|---|
| **GET** | Retrieve a resource or list | Yes | No |
| **POST** | Create a new resource | No | Yes |
| **PUT** | Replace an entire resource | Yes | Yes |
| **PATCH** | Partially update a resource | Yes | Yes |
| **DELETE** | Remove a resource | Yes | No |

**Idempotent** means calling the same request multiple times produces the same result. GET, PUT, PATCH, and DELETE are idempotent. POST is not — calling `POST /orders` three times creates three orders.

---

## Anatomy of a Request

Every API request has four parts.

```
GET /users/42 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
Content-Type: application/json
```

| Part | What it contains |
|---|---|
| **Method + Path** | What operation on which resource (`GET /users/42`) |
| **Host** | The domain of the API server |
| **Headers** | Metadata: auth token, content type, accepted formats |
| **Body** | Data sent with the request (POST, PUT, PATCH only) |

**Example POST request creating a new user:**

```json
POST /users HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
Content-Type: application/json

{
  "name": "Jessica Xafranski",
  "email": "jessica@example.com",
  "role": "product_manager"
}
```

---

## Anatomy of a Response

The server always returns a response with a status code and (usually) a body.

```json
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 1042,
  "name": "Jessica Xafranski",
  "email": "jessica@example.com",
  "role": "product_manager",
  "created_at": "2024-01-20T14:30:00Z"
}
```

| Part | What it contains |
|---|---|
| **Status code** | Whether the request succeeded, failed, or needs action |
| **Headers** | Content type, cache control, rate limit info |
| **Body** | The resource data, error message, or confirmation |

---

## HTTP Status Codes

Status codes are three-digit numbers grouped into five families. Every API uses them — knowing them lets you debug integration problems without reading documentation.

### 2xx — Success

| Code | Name | When it's used |
|---|---|---|
| 200 | OK | Successful GET, PATCH, or DELETE |
| 201 | Created | Successful POST — new resource was created |
| 204 | No Content | Successful DELETE or update — no body returned |

### 3xx — Redirection

| Code | Name | When it's used |
|---|---|---|
| 301 | Moved Permanently | Resource has a new permanent URL |
| 304 | Not Modified | Cached version is still valid |

### 4xx — Client Error

| Code | Name | When it's used |
|---|---|---|
| 400 | Bad Request | Malformed request — missing required field, invalid format |
| 401 | Unauthorized | Missing or invalid authentication token |
| 403 | Forbidden | Authenticated but not permitted to access this resource |
| 404 | Not Found | The resource doesn't exist |
| 409 | Conflict | Request conflicts with current state (e.g. duplicate email) |
| 422 | Unprocessable Entity | Validation failed — field values are invalid |
| 429 | Too Many Requests | Rate limit exceeded |

### 5xx — Server Error

| Code | Name | When it's used |
|---|---|---|
| 500 | Internal Server Error | Something broke on the server side |
| 502 | Bad Gateway | Upstream server returned an invalid response |
| 503 | Service Unavailable | Server is down or overloaded |

> **Rule of thumb:** 4xx means the client did something wrong. 5xx means the server did something wrong.

---

## Query Parameters

Query parameters are used to **filter, sort, paginate, or search** a list of resources. They appear after `?` in the URL.

```
GET /orders?status=pending&sort=created_at&order=desc&page=2&limit=20
```

| Parameter | Purpose | Example |
|---|---|---|
| **Filter** | Narrow results by a field value | `?status=active` |
| **Sort** | Order results by a field | `?sort=price&order=asc` |
| **Pagination** | Return a subset of results | `?page=3&limit=25` |
| **Search** | Full-text search across fields | `?q=jessica` |
| **Fields** | Return only specific fields | `?fields=id,name,email` |

Query parameters never change the resource — they only shape what the response looks like. All query parameter requests should be `GET`.

---

## Authentication

Most APIs require authentication to control who can access what.

### API Keys

The simplest method. A static string passed in a header.

```
GET /users HTTP/1.1
X-API-Key: sk_live_AbCdEfGhIjKlMnOp
```

**Use case:** Server-to-server calls, internal tools. Not suitable for client-side code — the key would be exposed.

### Bearer Tokens (JWT)

A token issued after login, passed in the `Authorization` header. Tokens expire.

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Use case:** User-facing applications. The token encodes the user's identity and permissions.

### OAuth 2.0

A delegation protocol that lets users grant third-party apps limited access to their accounts without sharing passwords.

```
User logs in with Google → Google issues a token → App uses token to call Google APIs
```

**Use case:** "Sign in with Google/GitHub/Slack" flows, connecting third-party integrations.

| Method | Security | Complexity | Best for |
|---|---|---|---|
| **API Key** | Low–Medium | Low | Server-to-server, internal APIs |
| **Bearer Token (JWT)** | High | Medium | User sessions |
| **OAuth 2.0** | High | High | Third-party access delegation |

---

## Error Responses

A well-designed API returns structured error messages — not just a status code. The error body should tell the client what went wrong and why.

**Good error response:**

```json
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json

{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The request body contains invalid values.",
    "details": [
      {
        "field": "email",
        "issue": "Email address is already in use."
      },
      {
        "field": "role",
        "issue": "Value must be one of: viewer, editor, admin."
      }
    ]
  }
}
```

**Bad error response:**

```json
HTTP/1.1 400 Bad Request

{
  "message": "Error"
}
```

Vague error messages create support tickets. Descriptive errors are a product quality issue, not just a developer convenience.

---

## Pagination

APIs that return lists must paginate results — returning thousands of records in one response is expensive and slow.

### Offset Pagination

```
GET /products?page=3&limit=20
```

Simple but inefficient for large datasets. If records are inserted or deleted between pages, results can skip or duplicate items.

### Cursor Pagination

```
GET /orders?after=cursor_eyJpZCI6MTAwMH0&limit=20
```

The server returns a cursor (an opaque pointer to a position in the list). The client passes it back to get the next page. More reliable for real-time data.

**Typical paginated response:**

```json
{
  "data": [...],
  "pagination": {
    "total": 1420,
    "page": 3,
    "limit": 20,
    "next_cursor": "cursor_eyJpZCI6MTAwMH0"
  }
}
```

---

## REST vs Other Approaches

| | REST | GraphQL | gRPC |
|---|---|---|---|
| **Request style** | Multiple endpoints, fixed structure | Single endpoint, client defines shape | Remote procedure calls |
| **Best for** | Public APIs, resource-based systems | Complex frontends, mobile | Internal microservices |
| **Over-fetching** | Common — returns the full resource | Avoided — client requests only needed fields | Avoided |
| **Learning curve** | Low | Medium | High |
| **Tooling support** | Excellent | Good | Moderate |

REST is the right default for most external-facing APIs. GraphQL becomes appealing when clients have very different data needs (e.g., mobile vs. web) or when over-fetching is a real performance problem.

---

## What a PM Needs to Know

You don't write API code, but you make decisions that affect APIs every day.

| Situation | What to understand |
|---|---|
| **Scoping an integration** | Which endpoints does the third-party expose? Does it have the data we need? What are the rate limits? |
| **Prioritizing error handling** | 4xx errors that reach users are product failures. Good error messages reduce support load |
| **Evaluating API latency** | Each API call takes time. Chains of API calls add up. Consider this when designing flows that depend on external data |
| **Webhooks vs polling** | Polling = client asks "anything new?" on a timer. Webhook = server notifies the client when something happens. Webhooks are more efficient for event-driven features |
| **Rate limits** | APIs limit how many requests a client can make per minute or hour. Hitting limits disrupts the product. Know the limits before committing to a feature |
| **Versioning** | A breaking API change can break integrations for all clients. API versioning (`/v1/`, `/v2/`) is how teams evolve without breaking existing consumers |

---

## Simple Mental Model

> A RESTful API is a menu at a restaurant.
> The URL is the dish. The HTTP method is what you want done with it — get it, create it, update it, remove it. The status code is the waiter telling you if it worked.

---

## References

| Concept | Source |
|---|---|
| **REST architectural style** | Roy Fielding — *Architectural Styles and the Design of Network-based Software Architectures* (2000). The original dissertation that defined REST |
| **HTTP status codes** | IETF RFC 9110 — *HTTP Semantics*. The official specification for HTTP methods and status codes |
| **OAuth 2.0** | IETF RFC 6749 — *The OAuth 2.0 Authorization Framework* |
| **API design conventions** | Stripe API Docs and Google API Design Guide — widely used as industry references for RESTful design |
| **GraphQL comparison** | GraphQL Foundation — graphql.org |
