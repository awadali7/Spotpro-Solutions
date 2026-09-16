---
name: plan-with-me
description: Interview before building. Use before generating any new page, component, section, or visual treatment — ask what the code cannot tell you, then wait for approval.
---

# Plan with me

Compiling is not the bar. A component can be technically correct and still wrong about empty
states, breakpoints, motion, or which content feeds it. Those are the failures that cost a
rebuild, and they are all answerable up front.

## Before writing code

1. **Answer what the repo can answer.** Read `PROJECT-STATE.md`, `CLAUDE.md`, the content in
   `src/lib/content/`, and the component you are about to change. Never ask the user something
   a file already states.
2. **Ask only what is genuinely undecidable**, and only where different answers produce
   materially different work. Two to four questions, each with a recommended option.
   Typical unknowns here: which copy feeds it (content lives in `src/lib/content/*`), what
   happens below `lg`, what happens under `prefers-reduced-motion`, and whether a heading
   stays in the document outline.
3. **State the plan**: files touched, what changes in each, anything deferred.
4. **Wait for approval** before writing code.

## Do not ask when

- The user has already answered it in this session.
- A sensible default exists and the cost of being wrong is one small edit.
- They are clearly asking for a fix, not a design — then act, and flag concerns as you go.

## After building

Report what was verified and how, plus anything you deliberately left out and why. If you made
a judgment call the user did not ask for, name it so they can overrule it.
