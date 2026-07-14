# Surface choices

Load only the section matching the requested destination. The core method in
`SKILL.md` remains authoritative.

## Conversation or sharing

Answer first. Lead with a compact representation when the subject has
structure; use prose alone for a single fact or when a representation would
increase reading effort. Match the representation to the subject's topology and
omit source catalogs unless navigation was requested. For a shareable Markdown
export, remove local paths, private context, and unnecessary orchestration
detail.

## Plan or report

Follow the active plan/report presentation contract. Use Easify to explain
current versus desired behavior, the selected engineering approach, environment
and live QA, evidence meaning, deviations, limitations, and the next decision.
Keep internal control state backstage unless it affected safety or confidence.

## PR description, review, or comment

Follow the repository template and active public-boundary and organization
policies. Produce portable Markdown with verified locations and actionable
reasoning. Do not expose local paths, hidden prompts, private workflow state, or
tool provenance. Drafting never authorizes posting.

## Documentation

Prefer stable concepts, user-visible behavior, configuration, and durable
examples over current implementation names. Mark a proposed document as a
candidate until its repository owner and placement are confirmed. Drafting does
not authorize committing or publishing it.

## QA or evidence

Explain the claim, checked state, proof boundary, observed result, and important
negative control. Distinguish readiness from behavior, deterministic tests from
live-boundary evidence, stored state from client-visible behavior, and absence
of evidence from evidence of absence.

## Grill Me

Research first. Ask only unresolved human-owned, decision-changing questions.
For each, explain the concrete fork, likely default, tradeoff, and what the
answer changes. Easifying a question must not bias or preselect the user's
decision.

## Idea transfer

Separate the problem, insight, proposed mechanism, expected value, unknowns, and
next useful experiment. Preserve what is speculative. Do not convert an idea
into an approved roadmap decision.

## Audience adaptation

Change vocabulary, assumed background, and examples—not truth, respect, risk,
or conclusion. If the audience is unclear and the distinction matters, state
the assumed reader briefly instead of stereotyping.

## Interactive walkthrough

Use a safe installed walkthrough or visualization capability only when the
subject benefits from exploration. Keep the portable Markdown explanation
complete. For private source, prefer local/offline assets and an untracked,
objective-scoped location. Include:

- source identity and whether the state is proposed or final;
- setup and isolation;
- numbered actions and expected observations;
- source-to-node mapping where applicable;
- proof limits and staleness;
- cleanup owner and final environment state.

Do not use remote executable assets for sensitive source unless explicitly
accepted. A walkthrough is an explanation surface, not independent evidence.
