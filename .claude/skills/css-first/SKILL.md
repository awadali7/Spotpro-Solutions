---
name: css-first
description: Reach for native CSS before JavaScript for layout, responsive, and visual behaviour — container queries, :has(), scroll-driven animations, masks — and know the narrow cases where JS is genuinely required.
---

# CSS first

JavaScript for visual behaviour costs a client component, a bundle, and a listener. Most of what
it is reached for is now native CSS.

## Prefer

| Instead of | Use |
|---|---|
| resize observers | container queries |
| scroll listeners | `animation-timeline: view()` / `scroll()` |
| JS virtualisation (< ~10k rows) | `content-visibility: auto` |
| toggling a parent class from JS | `:has()` |
| physical margins/padding | logical properties (`margin-inline`, `padding-block`) |
| a scrim div to fade an image | `mask-image` |

## Reach for JavaScript only for

Drag and drop, complex gestures, Canvas/WebGL, lists beyond ~10,000 rows, and pointer-tracked
effects that need the cursor position. When you do use a pointer listener, **delegate one
listener to the container** rather than one per item, coalesce into a single
`requestAnimationFrame`, and write CSS custom properties so the frame stays compositor-only.

## Progressive enhancement is not optional here

Every scroll-driven effect in this repo follows the same contract, and new ones must too:

```css
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) { /* the effect */ }
  :root[data-motion="on"] { /* same rules — the ?motion=on preview override */ }
}
```

- **The dimmed/hidden state is declared only inside that block.** Without support, or under
  reduced motion, content renders at full opacity. Content must never be able to get stuck
  invisible.
- **Declare the effect against `view()` first; only override the timeline for a pinned variant.**
  Pointing at a named timeline unconditionally leaves elements stuck at their start state on any
  viewport where that timeline does not exist.
- JS cannot override a `prefers-reduced-motion` media query from inside it. That is why
  `MotionOverride` stamps `data-motion="on"` on `<html>` and the CSS rules are deliberately
  duplicated — one copy per gate.
- Gate a pinned section on viewport size (`min-width` / `min-height`). If the content is taller
  than the sticky box it gets clipped.

## Splitting text into spans

Separate words with **real text nodes**, never a space held inside a span. An inline box
containing only a space gives the browser no line-break opportunity and the text overflows
narrow viewports. Keep each word whole (`inline-block whitespace-nowrap`) if animating per
character.

## Browser support

Note support for any CSS feature you introduce. `animation-timeline` and `:has()` are Chromium +
WebKit; check WebKit specifically — this repo has caught bugs there that Chromium could not.
