---
name: review-changes
description: Review changed code against this project's conventions — correctness first, then structure, types, accessibility, and performance, with severities and no padding.
---

# Review changes

## Categories

1. **Correctness** — does it do what it claims, including at the edges (narrow viewports, empty
   content arrays, reduced motion, no JavaScript)?
2. **Structure** — prop drilling, barrel-export cycles, client/server boundary drawn wider than
   it needs to be.
3. **Type safety** — no `any` without a stated reason; no `@ts-ignore` (use a typed ref or
   `@ts-expect-error` with a note).
4. **Accessibility** — one `h1`, heading order, focus states, `prefers-reduced-motion`, contrast
   on any new colour pairing, alt text.
5. **Performance** — unnecessary client components, listeners per item where one delegated
   listener would do, unoptimised images, anything that adds a WebGL context.

## Reporting

- File, line, one sentence on the problem, then the suggested fix.
- Severity: **must fix** | **should fix** | **nit**.
- Correctness before style. A naming nit above a real bug buries the bug.
- **Skip empty categories. Do not pad.** A three-line review that names three real problems
  beats a page of filler.

## Verify before reporting

Do not report what you have not checked. If a claim is measurable — contrast, overflow, frame
counts — measure it and quote the number. A confidently wrong finding costs more trust than a
missed one; this project has already had an audit report 43 fictional contrast failures because
the measurement itself was broken.
