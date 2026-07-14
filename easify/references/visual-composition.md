# Visual composition

Use native Markdown, ASCII, and representative data. Do not force every form
into every answer; use the smallest complementary mix that carries the model.

## Route by relationship

| Relationship | Useful shape |
|---|---|
| Sequence, lifecycle, causality | Vertical movement |
| Parallel paths or actors | Horizontal lanes |
| Alternatives or states | Horizontal branches or comparison table |
| Hierarchy | Tree |
| Exact ownership or mapping | Table |
| Data shape or contract | JSON, rows, request, or response |
| Sequence plus parallelism | Hybrid ASCII |

Use width for parallelism and comparison, height for sequence and causality,
and both for mixed systems. Use the available surface without making the reader
scan a tall outline or a wide diagram that wraps.

## Divide the work

- Let the primary diagram carry the causal skeleton.
- Let tables carry exact mappings, ownership, states, or comparisons.
- Let representative data carry schema or transformation shape.
- Let one concrete example show how a reader action or input reaches outcomes.
- Keep prose for why, exceptions, uncertainty, and proof limits.

Each claim gets one primary home. A second representation must add a different
relationship, not redraw or narrate the first.

## Hybrid example

```text
                         LOCAL ITEM
                             │
              ┌──────────────┴──────────────┐
              │                             │
         USER CONTINUES                  SYNC RUNS
              │                             │
        Open → edit → save          Lock → snapshot → validate
                                            │
                                  ┌─────────┴─────────┐
                                  │                   │
                               Blocked             Eligible
                                  │                   │
                             Keep local        Send → accept → clean
```

This works because height carries the lifecycle while width carries parallel
paths and outcomes.

For a compact concrete trace, compare actions and outcomes directly:

```text
Draft L1 + point P1 + photo M1
              │
              ├── Sync ─────► remain local
              ├── Resume ───► continue L1
              └── Finalize ─► upload → accept → clean
```

Avoid long outlines disguised as diagrams, tables that contain only source
paths, repeated visual/prose explanations, and decorative representations.
