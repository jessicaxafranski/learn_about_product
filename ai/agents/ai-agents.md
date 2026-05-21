# AI Agents

AI agents are systems that receive a goal, decide what to do next, and take actions to move toward that goal.

Unlike traditional automation, an agent does not just follow a fixed script. It can evaluate context, choose between options, and adapt when conditions change.

---

## Concept

| Concept | Meaning |
|---|---|
| **Automation** | Follows predefined rules |
| **Agent** | Interprets a goal and decides how to achieve it |
| **Parallel agents** | Multiple agents working at the same time for speed |
| **Specialized agents** | Different agents handling different tasks for quality |
| **Orchestrator** | The component that coordinates the whole system |

---

## Automation vs. Agent

| | Automation | Agent |
|---|---|---|
| **Logic** | Fixed workflow | Dynamic decision-making |
| **Behavior** | Repeats the same steps | Adapts based on context |
| **Best for** | Predictable tasks | Ambiguous or changing tasks |
| **Question it answers** | "If X happens, what should run?" | "What is the best way to achieve this goal?" |
| **Example** | Send an email when a form is submitted | Review a job description and decide how to tailor a CV |

Use automation when the path is already known. Use an agent when the goal is clear but the path may vary.

---

## What Makes Something an Agent?

An AI system starts to behave like an agent when it can:

- receive a goal instead of a fixed instruction
- analyze the current context
- choose among multiple actions
- sequence those actions in a useful order
- adapt when the first approach does not work

The key difference is not just "using AI." The key difference is **decision-making in pursuit of a goal**.

---

## Common Types of Agents

| Agent type | What it does | Example |
|---|---|---|
| **Operational agent** | Handles repetitive operational work | Classifies support tickets and routes them to the right queue |
| **Creation agent** | Produces content or drafts | Writes a first version of a cover letter |
| **Research agent** | Gathers and summarizes information | Reviews competitor websites and extracts patterns |
| **Analysis agent** | Interprets information and suggests actions | Compares CV strengths against a job description |

In practice, many real systems combine more than one of these behaviors.

---

## Conversational Agents vs. Task Agents

Two broad interaction styles define how an agent works with a user.

| | Conversational Agent | Task Agent |
|---|---|---|
| **What it does** | Has a back-and-forth dialogue with the user | Receives a goal and executes it autonomously |
| **User involvement** | High — the user guides the conversation | Low — the agent works mostly on its own |
| **Output** | A response, suggestion, or question | A completed result or deliverable |
| **When it stops** | When the user ends the conversation | When the task is done |
| **Best for** | Exploration, Q&A, coaching, brainstorming | Workflows, data processing, content generation |
| **Example** | A user asks "how should I improve this CV?" and the agent asks follow-up questions | The agent receives a CV and a job description, runs analysis, and returns a tailored draft |

**Sample — Conversational Agent:**
> User: "I'm applying for a PM role. What should I highlight?"
> Agent: "What industry is the role in? And do you have experience with roadmapping tools?"
> *(The agent asks questions and adjusts its guidance based on each answer.)*

**Sample — Task Agent:**
> Input: CV file + job description
> Agent runs: reads both → identifies gaps → rewrites CV → saves output
> *(No conversation. The agent completes the full task and delivers a result.)*

Most real-world systems combine both: a conversational layer captures what the user wants, then hands off to a task agent to execute it.

---

## Orchestrator

The orchestrator is the coordinating layer of a multi-agent system.

Its role is to:

- decide which agent should handle each task
- define the order of execution
- pass outputs from one step to the next
- combine the final result

You can think of the orchestrator as the system's traffic controller.

---

## Parallel vs. Specialized Agents

| Pattern | How it works | Main benefit | Example |
|---|---|---|---|
| **Parallel agents** | Several agents do similar work simultaneously | Speed | Analyze 20 job descriptions at once |
| **Specialized agents** | Each agent owns a different type of task | Quality and clarity | One agent analyzes a CV, another writes the cover letter |

These patterns are often combined: an orchestrator may call several specialized agents, and some of them may run in parallel.

### Agents vs. Sub-Agents

| | Agents | Sub-Agents |
|---|---|---|
| **Lifespan** | Created on the fly, used once | Saved permanently in `.claude/agents/` |
| **Purpose** | Parallel batch work | Specialized expertise |
| **Best for** | Many similar tasks at once | Recurring, distinct roles |
| **Example** | Process 10 meeting notes simultaneously | Get technical feedback on a spec |

**Analogy:** Agents are temp workers hired for one busy day. Sub-agents are your permanent team — engineer, executive, researcher — you call on every week.

> 100+ pre-built sub-agents are available in community libraries. Copy the `.md` files into your `.claude/agents/` folder and they're ready to use.

---

## Simple Example

Imagine the goal is: **"Help a candidate apply for a product manager role."**

| Step | Agent responsibility |
|---|---|
| 1. Understand the role | A research agent reads the job description |
| 2. Evaluate fit | An analysis agent compares the role with the candidate's CV |
| 3. Create assets | A creation agent drafts a tailored CV and cover letter |
| 4. Coordinate | The orchestrator decides the sequence and combines outputs |

This is more than automation because the system is not just executing one rigid flow. It is choosing how to complete the goal based on context.

---

## When Agents Are Useful

Agents are most useful when:

- the task has multiple steps
- the best next action depends on context
- the inputs vary a lot
- you want the system to make limited decisions without manual intervention

Agents are less useful when the process is simple, repetitive, and fully predictable. In those cases, normal automation is usually better.

---

## Summary

| If you need... | Use... |
|---|---|
| A fixed and repeatable workflow | **Automation** |
| Goal-driven behavior with decision-making | **An agent** |
| Faster throughput across similar tasks | **Parallel agents** |
| Better quality across distinct tasks | **Specialized agents** |
| Coordination across multiple agents | **An orchestrator** |

---

## Diagram

![AI Agents Diagram](../images/agents_diagram.png)
