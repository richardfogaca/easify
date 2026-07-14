# Easify

**Make complex ideas easy to receive—without making them less true.**

Easify is a reusable skill for Codex and Claude Code. It turns grounded
technical, product, business, or operational material into the smallest
accurate mental model a particular reader can use.

It is not a summarizer that wins brevity by dropping the hard parts. Easify
finds the point where understanding gets stuck—the **complexity wall**—and
crosses it while preserving the facts, uncertainty, causality, and proof limits
that still matter.

```text
Grounded material
       │
       ▼
Find the complexity wall
       │
       ├── preserve what must survive
       ├── adapt to this reader
       └── match representation to relationship
       │
       ▼
Topology-matched ASCII / table / payload / concise prose
       │
       ▼
A mental model the reader can explain, use, or act on
```

## Quick start

Clone the repository and run the local installer:

```bash
git clone https://github.com/richardfogaca/easify.git
cd easify
./scripts/install-local.sh
```

The installer makes the same skill available to both runtimes:

- Codex: `~/.codex/skills/easify`
- Claude Code: `~/.claude/skills/easify`

It uses symlinks, so edits in the clone are reflected in both places. It is
idempotent and refuses to overwrite an existing real file or directory.

Start a fresh session, then ask naturally:

```text
Easify this: <paste or point to the material>
```

Or invoke it explicitly when deterministic selection matters:

```text
# Codex
$easify Explain this incident for the engineer taking over the fix.

# Claude Code
/easify Explain this incident for the engineer taking over the fix.
```

## What good Easifying looks like

Imagine a test reports that an API returned `200 OK` after accepting a job.
A conventional summary might say, “The job completed successfully.” Easify
keeps the critical distinction:

> The `200` proves the API accepted the request. It does not prove the
> background job finished. Check the job state or worker result before claiming
> end-to-end success.

That example is simplified, but it shows the job: remove the cognitive detour,
not the decision-relevant boundary.

## Ask for the depth you need

`clear` is the default. The levels control depth, not a rigid format.

| Level | Best for | What you get |
|---|---|---|
| `quick` | An immediate answer | The answer, with a tiny table or flow when faster than prose |
| `clear` | A usable mental model | A compact representation for structured material, plus only needed explanation |
| `teach` | Understanding you can pass on | The representation plus cause, boundaries, and proof limits |
| `explore` | A complex or nonlinear system | Complete Markdown and, when safe and useful, an interactive walkthrough |

Add the level and audience in ordinary language:

```text
Easify this at teach level for a frontend engineer new to the data model.
Easify this quickly for the person approving the rollout.
Easify this for a customer success lead; preserve the operational risks.
Easify interactive: help me explore how these services exchange events.
```

If an interactive walkthrough is created, the Markdown explanation must still
stand on its own. The walkthrough helps exploration; it is not independent
evidence.

## Where it helps

- Unfamiliar code, architecture, or technical incidents
- Plans that need to be understood before approval
- QA evidence and the boundary of what it actually proves
- PR descriptions, reviews, and shareable engineering explanations
- Documentation and knowledge transfer
- Product ideas, tradeoffs, and unresolved assumptions
- The same subject for readers with different contexts
- Complex systems that genuinely benefit from interactive exploration

Some useful prompts:

```text
Easify this evidence—what does it prove, and what remains unverified?
Easify this plan before I approve it.
Easify this PR for a reviewer who does not know this subsystem.
Easify this idea, but keep speculation separate from verified facts.
Easify these two options as a decision I can make.
```

## What Easify protects

An Easified explanation should be:

- **Grounded:** verified facts, supported inference, and uncertainty stay
  distinguishable.
- **Well-composed:** structured material uses width for parallelism, height for
  sequence, and complementary diagrams, tables, payloads, examples, or prose
  only when each carries a different relationship.
- **Proportional:** a one-fact answer stays small; representation diversity is
  not a quota.
- **Concrete:** one useful example anchors the mental model.
- **Honest about proof:** demonstrations and tests say what they establish—and
  what they do not.
- **Audience-aware:** vocabulary and assumed context change, but truth, risk,
  and respect do not.
- **Authority-preserving:** explaining a change does not authorize implementing,
  posting, publishing, deploying, or mutating external state.

The durable rule is simple: **make the subject easier to receive, not less
technically honest.**

## How it works

The skill follows a compact method:

1. Ground the explanation in the supplied material and required research.
2. Identify the reader and the main complexity wall.
3. Lead with the simplest correct answer.
4. Match representation and layout to the subject's topology.
5. Ground the model in one concrete example.
6. Preserve causality, alternatives, boundaries, uncertainty, and proof limits.
7. Give every claim one home and delete repetition.
8. End with the takeaway and, when useful, the next inspection or decision.

The core method lives in [`easify/SKILL.md`](easify/SKILL.md). Conditional
guidance for documentation, PRs, evidence, plans, audience adaptation, and
interactive walkthroughs lives in
[`easify/references/surfaces.md`](easify/references/surfaces.md). Topology and
representation guidance lives in
[`easify/references/visual-composition.md`](easify/references/visual-composition.md).

## Repository map

```text
easify/
├── easify/
│   ├── SKILL.md                 # Core method and activation rules
│   ├── agents/openai.yaml       # Codex-facing metadata
│   └── references/
│       ├── surfaces.md          # Guidance loaded for specific surfaces
│       └── visual-composition.md # Topology and representation guidance
├── evals/
│   ├── cases/                   # Frozen comparisons plus behavior regressions
│   ├── results/                 # Baselines and evaluation snapshots
│   └── protocol.md              # Comparison and scoring procedure
└── scripts/
    ├── install-local.sh         # Shared Codex/Claude installation
    ├── prepare-run.mjs          # Deterministic evaluation prompt generator
    └── validate.mjs             # Structure, boundary, fixture, and installer checks
```

## Validation and evaluation

Run the repository checks with Node.js:

```bash
node scripts/validate.mjs
```

The evaluation design separates two questions that are easy to blur:

- **Real-work dogfood:** does Easify help a person understand genuine work
  faster and with fewer follow-up questions?
- **Controlled comparison:** does it improve comprehension without introducing
  factual, proportionality, or authority regressions?

Five development cases may guide improvements. Three held-out cases remain
untouched until final evaluation so they can test whether those improvements
generalize. Focused regression cases exercise behavior discovered during
dogfood without changing those frozen comparisons. The harness compares:

| Lane | Comparison | Question answered |
|---|---|---|
| Packaging | Locally supplied method vs native skill | Did packaging change the method's behavior? |
| Semantic | Ordinary answer vs Easify Markdown | Did Easify improve understanding? |
| Renderer | Easify Markdown vs Markdown plus walkthrough | Did interaction add value beyond the explanation? |

Generate a prompt for a fresh evaluation session:

```bash
node scripts/prepare-run.mjs \
  --case=01-callback-queue \
  --lane=semantic \
  --arm=easify \
  --runtime=codex
```

The full procedure and hard-failure criteria are in
[`evals/protocol.md`](evals/protocol.md). Current evidence snapshots live in
[`evals/results/`](evals/results/); they should not be mistaken for a blanket
claim that every audience, domain, or interactive renderer has been validated.

## Current posture

Easify is designed for **named-on-demand** use: invoke it when you want this
communication method. Making it an agent's default voice, changing production
workflows, or publishing a broader release are separate decisions with their
own evidence and authorization.

For now, the best test is a real one: give Easify material you genuinely need
to understand, then ask whether you reached a correct, usable mental model
faster—and whether anything important was lost along the way.
