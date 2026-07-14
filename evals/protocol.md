# Easify evaluation protocol

The development and held-out case manifests and their answer keys were frozen
before the native skill was authored. Post-dogfood regressions are recorded
separately. Do not tune the skill from the three `holdout/` cases.

## Lanes

1. Packaging: give identical Easify semantic instructions through the former
   assistant-local method and through the native skill. Compare loading,
   references, boundaries, and meaning—not ordinary response quality.
2. Semantic: in fresh sessions with native discovery held constant, compare an
   ordinary response with Easify Markdown. Hide labels and randomize order.
3. Renderer: compare complete Easify Markdown with the same explanation plus an
   interactive walkthrough. Essential facts must remain in Markdown.

Use the case-specific questions and fill one copy of
`scorecard-template.json` per run. Score comprehension before revealing labels
or recording preference. Any prohibited overclaim or hard failure fails the
candidate regardless of preference.

## Representation-first regressions

Dogfood failures may become focused cases under `cases/regression/` without
changing the frozen development and held-out comparisons. Run them through the
semantic lane in fresh sessions. Pass only when:

- representations match the subject's topology and use the output surface well;
- diagrams, tables, payloads, examples, and prose complement rather than repeat
  one another;
- a concrete example grounds the mental model; and
- the existing tiny case remains a no-ceremonial-visual negative control.

Generate an evaluation prompt without answer keys, for example:

```bash
node scripts/prepare-run.mjs \
  --case=09-implementation-visual-first \
  --lane=semantic \
  --arm=easify \
  --runtime=codex
```

Valid lane arms are `local|native`, `ordinary|easify`,
`markdown|interactive`, and `normal|default` respectively.

## Human-dependent gates

- Richard scores the label-hidden comparison and time to correct restatement.
- A fresh cold reader reconstructs the held-out complex case before default
  promotion.
- Default mode and public publication each require a separate decision.

## Default trial

After the named-on-demand candidate passes, use a copied coordinator with
`clear` as the default. Include complex, QA, status, planning, one-fact,
typo/config, acknowledgement, no-visual, and unrelated implementation prompts.
Fail on repeated professor templates, material verbosity on simple prompts,
ceremonial visuals, leaked Easify terminology, or changed workflow authority.
Return to named-on-demand and verify from fresh sessions before scoring.
