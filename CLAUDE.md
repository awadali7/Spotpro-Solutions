# SpotPro Solutions — working agreements

Read `PROJECT-STATE.md` before scaffolding anything new, and update it after any structural change (new component, route, dependency, design token) — one line per entry.

## Interview first

Before generating a new page or component, ask clarifying questions about layout, content gaps, and behavior. Don't jump straight to code.

## Component scaffolding

- Every component gets its own folder: `src/components/[Name]/[Name].tsx` + an `index.ts` barrel export.
- Server Components by default. Add `"use client"` only when state, effects, or event handlers require it.
- `src/components/ui/` is vendor territory (shadcn + Aceternity, CLI-managed). Keep local modifications noted in `PROJECT-STATE.md`.
- Page copy belongs in `src/lib/content/*`, never hardcoded in a page.

## CSS-first

Prefer Tailwind + native CSS — container queries, `:has()`, scroll-driven animations — over JavaScript for layout, responsive, and visual behavior. Reach for Framer Motion (`motion`) only for what CSS genuinely can't do: staggered reveals, gesture-driven motion, 3D transforms.

## Accessibility and contrast

The brand palette has traps. `--accent` (#49A4BB) and `--highlight` (#15D8B3) both fail WCAG AA as text on light backgrounds — use `--accent-ink` / `--highlight-ink` for text, links, and focus rings on light surfaces. `--highlight` as a background needs dark text, never white. See the token notes in `PROJECT-STATE.md` before introducing a new color pairing.

Every page gets exactly one `h1`, alt text on meaningful imagery, visible focus states, and must respect `prefers-reduced-motion`.

## Verifying UI work

Build and type-check, then actually drive the page in a browser — scroll it, submit the form, open the mobile nav — before calling it done. Scroll-driven reveals will look broken in a naive full-page screenshot because the capture doesn't scroll; step-scroll first, then capture the viewport.
