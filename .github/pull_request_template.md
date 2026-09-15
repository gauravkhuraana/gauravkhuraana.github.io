## Plan

<!-- What approach are you taking, and why this one? -->
<!-- A reviewer should be able to read this and decide whether to keep reading. -->

## Scope

<!-- Which files will change, and which deliberately will not. -->
<!-- If a file appears in the diff and not here, that is scope creep. -->

## Success criteria

<!-- How will we know this worked? Name the check, test or observable behaviour. -->
<!-- "The tests pass" is not a success criterion unless you added the test. -->

## Rollback / escalation

<!-- If this turns out to be wrong in production, what do we do? -->
<!-- Revert cleanly? Feature flag? Who gets paged? -->

---

### Reviewer rubric

- [ ] **Intent** — clear goal and a visible plan
- [ ] **Scope** — changed files match the plan
- [ ] **Evidence** — required checks pass, logs and artifacts available
- [ ] **Ownership** — code owners reviewed sensitive areas
- [ ] **Policy** — complies with rulesets, branch rules, environments
- [ ] **Fallback** — rollback or escalation is clear for high-risk change

<!-- The same rubric applies whether a human or an agent opened this pull request. -->
