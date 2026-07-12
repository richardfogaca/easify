# Easify

Easify turns complex information into the smallest accurate mental model a
specific reader can use.

It is not a summarizer that throws details away. It tries to reduce the time
between:

> “I know the words, but I still don’t get it.”

and:

> “Okay—I understand what is happening, why it matters, and what to do next.”

```text
Grounded source
      │
      ▼
   Easify
   ├── find the complexity wall
   ├── preserve facts and uncertainty
   ├── choose the smallest useful representation
   └── adapt depth and vocabulary to the reader
      │
      ├── portable Markdown / ASCII
      └── optional interactive walkthrough
      │
      ▼
Correct mental model
      │
      ├── real-work feedback ───────► tune development cases
      └── controlled comparison ────► untouched held-out cases
                                      │
                                      ▼
                             decide whether to promote
```

The interactive artifact may help exploration, but the Markdown explanation
must remain complete by itself.

## Try it

Start a fresh Codex or Claude session and ask naturally:

```text
Easify this: <subject>
Easify this evidence—what does it actually prove?
Easify this plan before I approve it.
Easify this for a non-engineering reader.
Easify interactive: help me explore this system.
```

Native selectors are the deterministic fallback:

| Runtime | Selector |
|---|---|
| Codex | `$easify` |
| Claude | `/easify` |

`Easyfi this` remains a temporary compatibility phrase. There is no second
alias skill.

## Choose the depth

| Level | Use it when… | Expected shape |
|---|---|---|
| `quick` | You need the answer immediately | Answer plus the essential distinction |
| `clear` | You want a usable mental model | One concrete example or representation |
| `teach` | You need to explain it to someone else | Cause, boundary, and proof limits |
| `explore` | The system is complex or nonlinear | Complete Markdown plus an optional walkthrough |

These are depth controls, not output templates. A one-fact answer should remain
small even at the normal `clear` default.

## What Easify can help with

- A technical incident or unfamiliar subsystem
- A plan before approval
- QA evidence and what it does—or does not—prove
- A PR description, review, or shareable explanation
- Documentation and knowledge transfer
- A Grill Me decision with researched tradeoffs
- The same idea for an engineer, marketer, operator, or another reader
- A local interactive walkthrough when exploration materially helps

Easify changes communication, not authority. An explanation does not authorize
implementation, publication, deployment, provider mutation, or shared-data
changes.

## The two ways we test it

### Real-work test drive

Use Easify when you genuinely want help understanding something. Then record
what you noticed:

- Did you understand it faster?
- Was an important limitation lost?
- Was the representation useful or decorative?
- Was it proportional to the problem?
- Did you need another question before you could act or decide?

This measures the actual experience.

### Controlled evaluation

Eight cases were frozen before the native skill was authored:

| Cases | Purpose | May tune from them? |
|---|---|---|
| 5 development cases | Find weaknesses and improve the method | Yes |
| 3 held-out cases | Check whether improvements generalize | No |

Each case contains a source hash, facts that must survive, uncertainty and proof
limits, prohibited overclaims, and case-specific comprehension questions.

The harness runs three different comparisons because they answer different
questions:

| Comparison | A versus B | What it isolates |
|---|---|---|
| Packaging | Same method loaded locally vs native skill | Did packaging change behavior? |
| Semantic | Ordinary answer vs Easify Markdown | Does Easify improve understanding? |
| Renderer | Easify Markdown vs Markdown plus walkthrough | Does interaction add value? |

Labels are hidden while comprehension is scored. Preference is recorded only
after the reader answers the case questions, so “I know which one is Easify”
does not become the result.

For maintainers, a frozen prompt can be generated with:

```bash
node scripts/prepare-run.mjs \
  --case=01-callback-queue \
  --lane=semantic \
  --arm=easify \
  --runtime=codex
```

The full procedure is in [evals/protocol.md](evals/protocol.md). The distributed
skill remains only [SKILL.md](easify/SKILL.md), its metadata, and the conditional
[surface guidance](easify/references/surfaces.md).

## What happens next

1. Test Easify on several real situations.
2. Tune it using the five development cases.
3. Freeze the candidate and run label-hidden comparisons.
4. Open the three held-out cases only for final evaluation.
5. If comprehension improves without truth, proportionality, or authority
   regressions, test it as a default in a copied Coordinator.
6. Promote default behavior or publish it only through separate decisions.

Today Easify is installed locally in named-on-demand mode. It is not the default
Coordinator voice and has not been publicly published.

## Does this page work?

This page is itself the first documentation dogfood case. After reading only
this page, you should be able to answer:

1. What job does Easify perform?
2. Why are real-work testing and frozen-case evaluation both needed?
3. What is the difference between the five development and three held-out cases?
4. What remains separately authorized even after Easify produces an explanation?

If any answer required opening the implementation plan, this documentation has
not crossed the complexity wall yet.
