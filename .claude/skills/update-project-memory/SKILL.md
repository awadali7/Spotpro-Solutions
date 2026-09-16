---
name: update-project-memory
description: Keep PROJECT-STATE.md current after any structural change — a new component, route, dependency, design token, or a non-obvious trap worth not rediscovering.
---

# Update project memory

`PROJECT-STATE.md` lives at the **repo root** (not under `.claude/`). It is the file that stops
the next session re-deriving what this one already learned.

## Rules

- **One line per entry.** It is an index, not documentation. Bloat makes it stop being read.
- **Touch only what changed.** Never rewrite sections you did not affect.
- **Record the trap, not just the change.** "Added X" is worth little. "Added X; Y looks like it
  should work and silently does not, because Z" is worth a lot.
- Include the measurement when a claim is measurable — contrast ratios, frame counts, pixel
  overflow, bundle size. A number survives argument; an adjective does not.
- Update the **Known gaps / launch blockers** section when you add or close one.

## Sections that exist

Stack and dependencies · design tokens · routes · components · vendor modifications ·
known gaps / launch blockers · measuring performance · reduced motion · plus topic sections for
hard-won traps.

## When to write

After the change is verified, not before. If a change turned out to be wrong and was reverted,
say so rather than leaving a stale entry describing something that no longer exists.
