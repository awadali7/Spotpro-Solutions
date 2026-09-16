---
name: scaffold-component
description: Create a new React component following this repo's conventions — folder layout, Server Component default, content separation, and the Tailwind traps specific to this design system.
---

# Scaffold a component

## Layout

```
src/components/[Name]/[Name].tsx
src/components/[Name]/index.ts     // export { Name } from "./Name";
```

Not `src/features/...`. This repo is flat under `src/components/`.

**There is no test runner in this project** — do not scaffold a test file. If tests are wanted,
that is a separate decision about adding a runner, not something to assume.

## Rules

- **Server Component by default.** Add `"use client"` only when `useState`, `useEffect`, a ref,
  or an event handler genuinely requires it. A scroll or hover effect achievable in CSS does not.
- **`src/components/ui/` is vendor territory** (shadcn + Aceternity, CLI-managed). You may modify
  vendor files, but record every modification in `PROJECT-STATE.md` — several already carry
  local fixes and an unlogged one will be silently reverted by the next `shadcn add`.
- **Copy belongs in `src/lib/content/*`**, never hardcoded in a page or component.
- **One `h1` per page.** A section that is visually heading-less should carry an `sr-only`
  heading rather than dropping it — the document outline and SEO still need it.
- Alt text on meaningful imagery; `alt=""` on decorative imagery where adjacent text already
  carries the meaning.
- Visible focus states, and `prefers-reduced-motion` respected.

## Two traps this repo has already hit

1. **tailwind-merge eats the custom type scale.** `text-hero` / `text-display` / `text-h1`–`h3` /
   `text-lead` are custom font-size utilities tailwind-merge does not know, so it treats them as
   text *colours*. In any class string passed through `cn()` alongside a real colour, the colour
   wins and the size is silently dropped — `text-h1 ... text-white` renders at 16px. Pass the
   size and let the colour be inherited.
2. **Colour pairings have traps.** `--accent` and `--highlight` fail AA as text on light
   surfaces — use `--accent-ink` / `--highlight-ink`. `--highlight` as a background needs dark
   text (`--highlight-foreground`), never white. On a light surface a `--highlight` fill also
   needs a `--highlight-ink` ring, or its edge sits at 1.77:1 against white.

## Before calling it done

Run `npx tsc --noEmit` **and** `npx eslint src`, then drive the page in a browser at both mobile
and desktop width. Scroll-driven work will look broken in a naive full-page screenshot — step-
scroll first, then capture the viewport.
