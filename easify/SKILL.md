---
name: easify
description: Turn grounded technical, product, business, evidence, PR, documentation, plan, report, incident, or unfamiliar information into a compact and accurate mental model for a particular reader. Use when the user explicitly says “Easify this”, “Easify PR”, “Easify interactive”, temporarily says “Easyfi this”, invokes $easify in Codex or /easify in Claude, or asks for an Easify-level or audience-specific explanation. Named on demand during the initial rollout; do not trigger for generic explanation or ordinary technical requests.
---

# Easify

Transfer the smallest accurate mental model the reader can use. Make the subject
easier to receive, not less technically honest.

## Shape the explanation

1. Ground the answer in the supplied material and any research required by the
   active repository or domain. Separate verified facts, supported inference,
   and unresolved uncertainty.
2. Infer conservatively unless the user specifies:
   - level: `quick`, `clear` (default), `teach`, or `explore`;
   - audience: the actual reader, without stereotypes;
   - surface: conversation, plan, report, evidence, Grill Me, PR/comment,
     documentation, idea transfer, or interactive walkthrough.
3. Identify the main complexity wall. Lead with the simplest correct answer.
4. Choose the smallest useful representation. Use at most one primary visual by
   default; zero is normal. Add another only for a materially different
   relationship.
5. Ground the mental model in one concrete example. Label synthetic or
   simplified data.
6. Preserve decision-relevant causality, alternatives, boundaries, and proof
   limits. State what evidence or a demonstration proves and does not prove.
7. End with the durable takeaway and, when useful, the next inspection, action,
   or decision.

## Adjust depth

- `quick`: give the answer and only the distinction needed to use it.
- `clear`: bridge the complexity wall with one example or representation.
- `teach`: explain cause, boundary, and proof so the reader can retell it.
- `explore`: provide a complete Markdown explanation and offer or create a
  source-backed interactive walkthrough when safe and useful.

Do not turn these into fixed templates or word limits. A simple answer should
remain simple.

## Select representations

Prefer the least expensive form that explains the relationship:

- short prose for one fact or distinction;
- a table for exact mappings or comparisons;
- an ASCII flow, tree, state comparison, or timeline for relationships;
- representative JSON, rows, requests, responses, CLI output, or a short source
  excerpt when data or logic is the issue;
- a screenshot for real visible product state;
- an installed interactive walkthrough or visualization capability when the
  reader benefits from nonlinear exploration.

For an interactive request, keep the Markdown explanation independently
complete. Use an existing safe capability; do not invent an Easify-specific
renderer. State source/revision, setup, actions, expected observations, proof
boundary, cleanup owner, and staleness. If no safe renderer is available,
provide the complete Markdown version and say the interactive artifact was not
created.

## Preserve authority

- Explanation and demonstration do not authorize source edits, implementation,
  provider mutation, publication, shared data changes, or production action.
- Keep routine session, callback, ledger, receipt, model, and gate mechanics
  backstage unless they explain the subject or a material incident.
- Treat provider-visible text as a draft until the active public/repository
  policy authorizes and sanitizes it.
- Let the active plan/report method own plan and report structure. Easify may
  improve its mental model and visuals, but never replaces its required facts.
- When the user asks to change the explained system, return to the normal
  intake, decision, approval, execution, and evidence workflow.

Read [references/surfaces.md](references/surfaces.md) when the output is for a
PR/comment, documentation, QA/evidence, Grill Me, plan/report, idea transfer,
audience adaptation, or an interactive walkthrough. Ordinary conversation does
not require the reference.
