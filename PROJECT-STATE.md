# PROJECT-STATE

One line per structural entry. Read before scaffolding anything new; update after any structural change.

## Stack

- Next.js 16.3.5 (App Router, Turbopack), React 19.2, TypeScript strict, Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`)
- `three` + `@react-three/fiber` (v9) for the home hero 3D scene only — the single exception to the CSS-first rule, deliberately sandboxed behind `HeroScene`
- shadcn/ui via CLI v4 — `style: radix-nova`, Radix primitives, CSS variables. NOTE: the CLI dropped the old "New York / default" style toggle for token presets; Nova used as the baseline, then fully overridden with brand tokens.
- Aceternity UI registry wired in `components.json` as `@aceternity` → `https://ui.aceternity.com/registry/{name}.json`
- Fonts: General Sans (Fontshare, self-hosted woff2, `next/font/local`) headings + Inter (`next/font/google`) body
- Deploy target: Vercel

## Conventions

- Components live at `src/components/[Name]/[Name].tsx` + `index.ts` barrel. Server Components by default; `"use client"` only for state/effects/handlers.
- Exception: `src/components/icons/` is an icon set — one `icon-base.tsx` + a single `index.tsx` barrel, no per-icon folders.
- `src/components/ui/` holds shadcn + Aceternity vendor components (flat files, CLI-managed).
- CSS-first: prefer Tailwind + native CSS (container queries, `:has()`, scroll-driven animations) over JS. Framer Motion (`motion`) only where CSS genuinely can't do it.
- All page copy lives in `src/lib/content/*` — pages never hardcode content strings.

## Design tokens (`src/app/globals.css`)

- `--primary #2F39A9` (indigo), `--secondary #2E6FA0` (steel blue), `--accent #49A4BB` (cyan-teal), `--highlight #15D8B3` (mint)
- Contrast-safe text variants: `--accent-ink #337687`, `--highlight-ink #0C7B66` — both clear 4.5:1 against *every* light surface in use (page `#FBFCFD`, muted `#F6F8FA`, card `#FFF`). Raw `--accent`/`--highlight` FAIL WCAG AA as text on light backgrounds — use the `-ink` variants for text/links/focus rings on light surfaces; raw values are for icons, borders, gradient stops, and dark surfaces only. Check new colors against the muted background, not pure white — that's where the earlier values failed.
- `--highlight` as a background requires dark text (`--highlight-foreground #0B1220`, 10.26:1). White on mint is 1.83:1 — never do it.
- `--navy #0B1220` — footer, page heroes, carousel cards. White on navy = 18.7:1.
- Light mode is the shipped default. `.dark` tokens exist and are coherent but have had no full contrast audit and no UI toggle is wired.
- Utilities: `.bg-brand-gradient`, `.bg-brand-gradient-radial`, `.text-gradient-brand`, `.reveal-on-scroll`
- Fluid type scale as Tailwind font-size utilities: `text-hero`, `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead` (all `clamp()`)

## Routes

- `/` Home — Who We Are is a **pinned full-bleed `bg-navy` band**: a 260vh `.pin-track` whose `.pin-inner` sticks at `top: 4rem` (the `h-16` header), so the section holds still while the character reveal plays out against the track's own `view-timeline-name: --pin`. The next section only arrives once the track is spent. Measured at 1440x900: reveal hits 100% at 1300px into the track, unpin starts at 1450px — a deliberate ~150px beat where the finished text sits still. Details: a single sentence (`whoWeAre.oneLine` in `about.ts`) at `text-h1` on a 4xl measure, characters brightening from `opacity: .22` as it scrolls. Text colour is inherited from the section's `text-navy-foreground`, deliberately — see the tailwind-merge note below `h2` is `sr-only` so the outline and SEO keep it; `NetworkGraphic` no longer appears here, only on `/about-us`
- `/` Home — a Selected Work section sits between Who We Are and the expertise bento, reusing `WorkCarousel` (same component as `/our-work`, pulls `completedProjects` itself) plus a link through to the full page
- `/` Home — Our Expertise is a `<ul>` of `ExpertiseCard`s (navy card + Aceternity `Meteors` + blurred `bg-brand-gradient` glow behind, per-card "Explore" link to `/our-expertise#slug`). 1 col → 2x2 at `md` → 3-column bento at `lg` where cards 1 and 4 span 2 so **four** areas tile two full rows. Replaced `WobbleCard`, which is now unused anywhere
- `/` Home — centered aurora hero (eyebrow pill + flipping-phrase `h1` + CTA pair) with `HeroScene` as a full-bleed ambient backdrop behind the copy. Hero CTAs are `bg-highlight`/`text-highlight-foreground` (48px pill, 10.26:1) plus a `border-white/25` ghost; **do not put white text on `--highlight`**. `CtaBand` uses the same primary so the two match — measured against the band's gradient it clears WCAG 1.4.11 (3:1 for UI components) at 3.95 / 3.74 / 3.07 left / above / right, the right edge being the tight one because the gradient runs toward teal there. Header, footer and `CtaBand` all use that same primary now — four buttons that previously disagreed (the header's desktop button was a `bg-brand-gradient` rounded rect and even differed from its own mobile counterpart). `HoverBorderGradient` is now unused anywhere outside its own file.

**The header button needs its `ring-highlight-ink`.** `--highlight` on the near-white header bar is only **1.77:1**, which fails WCAG 1.4.11's 3:1 for a UI component boundary — the teal fill that reads strongly on navy nearly vanishes on light. A full-opacity `--highlight-ink` ring restores the edge at **5.05:1** without changing the fill. At 70% opacity it measured 2.96 and still failed, so do not soften it. The footer and CTA band need no ring: both sit on dark surfaces. The stats row was removed on request — `heroStats` and its `services`/`completedProjects` imports went with it, Who We Are, bento expertise grid, CTA band
- `/about-us` — Who We Are (long), Vision, Mission, 6 Core Values, CTA band
- `/our-expertise` — 4 `ExpertiseCard variant="detail"` cards in a 2x2 grid (`md+`; a 3-column grid orphaned the fourth card), "Talk With an Expert" CTA, CTA band. Each card's `<li>` carries the `#slug` anchor (`scroll-mt-24`) the home teasers link to
- `/our-work` — 8 completed (scroll-snap carousel), 2 experimental (dashed + badge), 1 WIP (gradient bar + badge), CTA band
- `/our-services` — 6 services in Radix Tabs, CTA band. Tab pills: one full-bleed swipeable row below `md`, an even 3x2 grid `md`–`lg`, one centred row at `xl`. **Traps:** the vendor `TabsList` pins its height with `group-data-horizontal/tabs:h-8`, which a plain `h-auto` can't override (use the same group variant) — combined with `overflow-x-auto` it silently clipped every wrapped row, hiding up to 4 of the 6 tabs. Each trigger calls `scrollIntoView({ inline: "nearest" })` on focus because browsers won't scroll a *partly* visible focused element; the strip has **no scroll-snap** on purpose, since snapping overrode that scroll and pulled edge pills back off-screen. `after:hidden` removes the `line` variant's underline bar
- `/contact-us` — react-hook-form + zod form, server action, direct-contact sidebar
- `sitemap.ts`, `robots.ts` generated from `src/lib/content/site.ts`

## Components

- `Header` (client — active link + mobile Sheet), `Footer` (dark navy, sitemap nav added beyond original site), `Logo`, `PageHero`, `SectionHeading`, `CtaBand`, `RevealSection`, `NetworkGraphic`, `HeroVisual`, `ContactForm` (client), `ServicesTabs` (client), `WorkCarousel` (client), `ExpertiseCard` (server, renders an `<li>` — parent must be a `<ul>`; `teaser` variant = home: `h3` + summary + Explore link, bottom-aligned; `detail` = /our-expertise: `h2` + description + anchor id, top-aligned so icons sit level across a row). **Don't style the linked card with `:target`** — the home Explore links navigate client-side via `pushState`, which never updates `:target`, so it would only highlight on a hard load
- `HeroVisual` is a pure-SVG orbit/node composition; its motion lives in `globals.css` (`.hero-orbit`, `.hero-node`, gated behind `prefers-reduced-motion: no-preference`). Node/edge positions are computed from polar coordinates — edit the `RINGS` and angle arrays, not raw coordinates. It is also the fallback for `HeroScene`.
- `HeroScene` (client) renders the WebGL hero. It is the only 3D in the project and is guarded four ways — **keep all four if you touch it**:
  1. mounts only at `min-width: 1024px` **and** when WebGL is available; otherwise `HeroVisual` renders and no 3D chunk is fetched at all
  2. `next/dynamic` with `ssr: false`, then deferred again behind `requestIdleCallback` — WebGL init costs ~430ms of main thread, and mounting it eagerly drops Lighthouse performance from 100 to 81
  3. `Canvas frameloop="demand"` driven by a 30fps interval (`FrameDriver`) rather than the display refresh rate
  4. an IntersectionObserver + `visibilitychange` pause — the scene stops rendering entirely when scrolled past or the tab is hidden
- The home hero is **centered over its artwork**, not a split. `HeroScene` sits in an `aria-hidden`, `pointer-events-none` absolute layer behind the copy; because it already falls back to `HeroVisual` below 1024px, mobile gets the SVG as its backdrop with no 3D payload. A radial `--navy` scrim sits between the artwork and the copy — **keep it**, it is what holds white text legible where it crosses the bright nodes. Verified 320–1920px with zero horizontal overflow; the eyebrow pill wraps to two lines at 320px, which is acceptable.
- Work cards render a **top image band** (`h-60` with a `-mb-16` overlap, `next/image` with `fill` + `sizes`, lazy, served as WebP). The image is **masked away toward its base** (`mask-image` linear-gradient, with the `-webkit-` prefix for Safari) rather than covered by a scrim — a scrim has to fade to one flat colour, but the card body is a radial gradient, so the two never matched and left a visible seam. Dissolving the image lets the card's own background carry straight through; verified by sampling a vertical strip, the transition grades ~15 per step with no discontinuity when a project has an `image`, and fall back to the isometric `IsoModel` when it does not — so removing an image path degrades gracefully rather than leaving a hole. Images are decorative (`alt=""`): the heading and description already carry the meaning, so describing the stock photo would only add screen-reader noise.
- `IsoModel` exports `isoModels`, eight **isometric SVG project models keyed by `project.model`** (a per-project `ProjectModel` field in `work.ts`, NOT the shared `icon` category — keying on `icon` made two pairs of cards share artwork). Used large, bleeding off the top-right of every work card. Deliberately **not** WebGL: there are eight on screen and three.js stays sandboxed to `HeroScene` — verified 0 `<canvas>` elements on `/our-work`. All eight share one `Cuboid` primitive (true isometric axes, **translucent glass faces with luminous edges** — a wide low-opacity stroke under a thin bright one, which fakes bloom for nothing where an SVG blur filter would cost real paint time across eight models — plus a radial contact shadow) so lighting and projection stay consistent; compose new models from it rather than hand-plotting polygons. Each model also carries a `fit` (its measured bounding box — **measure it in the browser after changing a model's geometry, don't estimate**; the RAG rebuild needed two corrections before it matched the other seven) so `Frame` can recentre and rescale it to a common optical size — without that they crop unevenly against the card corner. Gradient ids are **namespaced per model** (`m-chat`, `m-ret`, …) because multiple inline SVGs in one document share an id space and would otherwise collide.
- `ScrollHighlightText` (**Server Component, zero JS**) has two variants. `typewriter` (what the home Who We Are uses) snaps characters in one at a time with `steps(1, end)`; `highlight` dims whole words and fades them up. Hidden characters keep their space, so the paragraph height is fixed and nothing below it reflows — measured constant at 255px across the whole reveal. Original highlight variant: words sit at `opacity: 0.28` and fade to full in sequence via `animation-timeline: view()`, staggered by `--i`/`--n` custom properties feeding each word's `animation-range` (`.scroll-highlight` in `globals.css`). The dimmed opacity is declared **only inside** the `@supports` + `prefers-reduced-motion` block, so without support or under reduce every word renders at full colour and can never be stuck unreadable. Verified animating in both Chromium and WebKit, and fully dark under reduce in both.
- Splitting text into per-letter/per-word spans: **separate them with real text nodes**, never a space held inside a span. An inline box containing only a space gives the browser no line-break opportunity and the text overflows narrow viewports — this bit both `container-text-flip` and `ScrollHighlightText`.
- `HeroFlip` (client) is the flipping phrase in the home `h1`. Phrases live in `src/lib/content/home.ts`; **the first entry is canonical** — it is what SEO, screen readers, and reduced-motion visitors get, so the sentence must read correctly with it. The animated copy is `aria-hidden` behind a stable `sr-only` phrase, because the vendor component splits the text into one span per letter and swaps it on a timer. Phrases must be **plural** (the sentence ends "that ship") and must not contain hyphenated compounds — "production-ready models" broke after the hyphen at desktop widths; `hyphens-none` now guards against a repeat. Headline height measured stable across 390/768/1024/1280/1440px, so cycling causes no CLS.
- `src/lib/use-reduced-motion.ts` is the single source of truth for `prefers-reduced-motion` in JS. It returns the media query verbatim **unless** a preview override is set, so production behaviour is unchanged.
- Scene geometry lives in `HeroScene/Scene.tsx`: icosahedron wireframe + faceted inner solid, glowing vertex nodes and dust via additive-blended canvas sprites (cheaper than a post-processing bloom pass), two orbit rings. Ring radii must stay under ~2.76 (the frustum half-width at z=0) or they clip at the canvas edge.
- Home hero stat figures are derived from the content data (`completedProjects.length` etc.), so they stay truthful as content changes — don't hardcode them.
- Vendor components modified from upstream: `aurora-background` (rebranded, `<main>` wrapper removed, reduced-motion safe), `card-hover-effect` (light theme, optional icon + optional link, added missing `"use client"`), `hover-border-gradient` (brand colors, skips its `setInterval` under reduced motion), `wobble-card` (hardcoded `bg-indigo-800` → `bg-navy`; upstream's 50%-white inner radial washed navy out to grey, so it now uses the same `bg-brand-gradient-radial` as the work cards; **reduced-motion guard added** — upstream wobbles unconditionally; `py-20` padding reduced; noise tiles at 128px instead of scaling one image), `carousel` (card restructured: the small icon tile became a large bleeding `IsoModel` anchored top-right with the text pushed to the bottom via `justify-end`; fully rewritten as native CSS scroll-snap — upstream version used raw `<img>`, one infinite rAF loop per slide, and overflowed the page), `container-text-flip` (three upstream bugs for this repo: it imported `cn` from `@/utils/cn` which does not exist here, and it rendered `<p>`/`<div>` elements that are invalid inside an `<h1>` — both fixed; its whole explicit-width animation — it measured `scrollWidth` unconstrained then forced that width on an `inline-block`, so inside a centred wrapping `h1` long phrases bled off-viewport and left a gap before the following words; the component is now a local rewrite that flows inline and wraps normally, keeping only the per-letter reveal. Its pill background, shadow and fixed `text-4xl/md:text-7xl` scale were stripped so it inherits the headline's type).
- Vendor `meteors` modified from upstream: **now a Server Component** (upstream's `motion.div` fade-in dropped); upstream's `Math.random()` in render replaced by a deterministic integer hash plus a `seed` prop (random render values break hydration); positions are % of the container instead of a fixed 800px spread; branded head/tail (`bg-white/80`, tail `from-accent`). Motion is the `.meteor` class + `@keyframes meteor` in `globals.css`, **not** the upstream `animate-meteor-effect` utility — meteors sit at `opacity: 0` and only appear while animating, gated on `prefers-reduced-motion` and covered by `?motion=on`. Don't put upstream's `rotate-[45deg]` back: in Tailwind v4 that sets the CSS `rotate` property, which stacks on the keyframe's `rotate(215deg)` rather than being replaced by it. Verified in Chromium + WebKit: 64 meteors animating, 0 under reduce, 0px horizontal overflow at 320–1440px.
- `hover-border-gradient`'s `as` prop is narrowed to `"button" | "div" | "span" | "a"` rather than `React.ElementType`. react-three-fiber augments the global JSX namespace, which widens `ElementType` until that component's props resolve to `never` and the build fails. Don't widen it back while three is installed.

## Known gaps / launch blockers

- **Address and email are placeholders** — `src/lib/content/site.ts` (`addressIsPlaceholder` / `emailIsPlaceholder` flags drive an on-page "to be confirmed" note). Replace before launch and clear the flags.
- **Contact form email delivery is not configured.** Needs `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (see `.env.example`). Until set, the form fails loudly and points visitors at the phone number rather than silently dropping the message.
- **Project card images are topic-matched stock, not the actual builds.** `public/projects/*.jpg`, sourced from Unsplash (Unsplash License: free commercial use, no attribution required; none are Unsplash+ premium, and none contain identifiable faces — free stock carries no model release, which matters for commercial use). Photo ids for traceability: rasa `pnK6Q-QTHM4`, rag `xYyJAC0IdyI`, financial `x07ELaNFt34`, travel `98WPMlTl5xo`, video `yk9VXp4W5-Q`, canteen `0BIvjaQwvQQ`, blockchain `yqQGPjr4Lk0`, tokenization `tn57JI3CewI`. **Replace with real screenshots before launch** — a visitor who recognises stock reads a work page as having nothing real to show.
- **The supplied logo is low-resolution and should be replaced with a vector.** `public/spotpro-logo.png` is the client PNG trimmed of its transparent margin (128×60, from a 150×92 original). At the header's 40px height that is a ~1.3× upscale on retina screens, so edges render slightly soft. Ask the client for an SVG or a 3–4× PNG; drop it in and no code changes are needed. The wordmark is only ~18px tall in the source, so auto-tracing it to vector would not recover the letterforms.
- The logo artwork knocks "SPOTPRO" and the emblem pattern out to transparency, i.e. it is drawn for **light** backgrounds. On the navy footer and mobile drawer those knockouts would fill with navy and invert the design, so `Logo` renders on a light plate there via the `onDark` prop. If a dark-background version of the logo arrives, use it and drop the plate.
- `src/app/icon.png` is the circular emblem masked out of the logo and composited on white (the default Next.js `favicon.ico` was deleted). Regenerate it from any new logo asset.
- Scroll reveal uses `animation-timeline: view()` (Chromium). Browsers without support get a plain timed fade via the `@supports not` branch. Content is never `opacity: 0` by default, so it can't get stuck invisible.

## Measuring performance (read before trusting a Lighthouse number)

Headless Chrome has no GPU by default, so WebGL falls back to SwiftShader (software rasterisation) and the hero scene's numbers become meaningless — measured 4,091ms of blocking under SwiftShader vs 446ms on a real GPU for the identical build, i.e. a Lighthouse score of 64 vs 100. Always pass a real GL backend when auditing the home page:

```
--chrome-flags="--headless --no-sandbox --use-gl=angle --use-angle=metal --enable-gpu"
```

Current: all six pages score 100 performance / 100 accessibility / 100 best-practices / 100 SEO, home measured with the flags above.

Two testing traps worth remembering:

- **Don't compare WebGL frames with `canvas.toDataURL()`** — without `preserveDrawingBuffer` it returns a blank buffer, so animated and frozen scenes both look "identical" and the check silently passes. Compare Playwright element screenshots instead.
- **Test SSR'd maths in WebKit, not just Chromium.** Chromium is V8 on both server and client so float output always matches; JavaScriptCore rounds `Math.cos` differently and exposed a real hydration mismatch in `HeroVisual` that Chromium could never have caught. Any server-rendered computed coordinate must be rounded.

## Reduced motion

Honoring `prefers-reduced-motion: reduce` is deliberate and total: the 3D scene stops rendering, aurora/orbit/node/scroll-reveal animations are all gated behind `@media (prefers-reduced-motion: no-preference)` or `motion-safe:`. A machine with macOS "Reduce motion" on will show a completely static site — that is correct behavior, not a bug. Confirmed as the intended product decision — do not weaken the guards.

**Previewing motion without changing the OS setting.** macOS exposes "Reduce motion" to every browser at once, and Safari and Chrome offer no per-browser override (Chrome DevTools' Rendering panel can only force `reduce`, never `no-preference`), so a developer with the OS setting on cannot see any of this site's motion. Load any page with **`?motion=on`** to force motion for the rest of the browser session; `?motion=off` clears it. The flag lives in `sessionStorage` under `spotpro:motion-override` and is read only by `useReducedMotion`, so it affects the WebGL hero only — the CSS-gated animations (aurora, orbits, scroll reveals) still follow the media query. Verified with OS reduce-motion on: `/` renders 1 unique frame (frozen) and `/?motion=on` renders 4 (animating), in both WebKit and Chromium.

Firefox is the one browser that can override the OS setting globally: `about:config` → `ui.prefersReducedMotion` = `0`.

The `?motion=on` override covers `HeroFlip` and the WebGL hero (both read `useReducedMotion`) **and the CSS-gated scroll animations**: `MotionOverride` (rendered in `layout.tsx`) stamps `data-motion="on"` on `<html>`, which `:root[data-motion="on"]` rules in `globals.css` opt into. JS cannot override a `prefers-reduced-motion` media query from the inside, so the CSS rules are deliberately duplicated — one copy under the media query, one under the attribute. The aurora still uses Tailwind's `motion-safe:` variant and is **not** covered; it would need the same treatment. Verified: `/` renders 1 unique headline frame under reduce, `/?motion=on` renders 4, and the `h1` accessible name is identical in both (`"Turn your data into intelligent systems that ship."`) with `h1` height fixed at 252px, so the width animation causes no reflow.

## tailwind-merge and the custom type scale

`text-hero` / `text-display` / `text-h1`–`h3` / `text-lead` are **custom font-size utilities tailwind-merge does not
know about**. It classifies them as text *colour*, so in any class string that also carries a real colour, the colour
wins and the size is silently dropped — `text-h1 ... text-white` rendered at 16px.

This only bites where a className goes through `cn()`, i.e. when passed into a component as a prop. The four
literal usages on elements directly (`page.tsx`, `PageHero`, `CtaBand`, `SectionHeading`) are untouched by
tailwind-merge and are safe. **When passing a custom size into a component, let the colour be inherited rather than
setting both.**

## The pinned section has two traps

1. **The reveal must be declared against `view()` first, and the pin only overrides the timeline.** Pointing
   `.tw-char` at `--pin` unconditionally leaves characters stuck at `opacity: .22` on every viewport that does not
   pin, because the named timeline does not exist there.
2. **The pin is gated on `(min-width: 380px) and (min-height: 700px)`.** Below that the paragraph is taller than the
   sticky box and gets cut off — measured 717px of text in a 504px box at 320x568. Short and narrow viewports flow
   normally and still get the reveal. Verified no clipping while pinned at 390x844 / 768x700 / 1280x800 / 1440x900 /
   1920x1080, and the reveal reaches 100% at every size including the unpinned ones.

## Work-card pointer parallax

The project models tilt toward the cursor. The listener is **one delegated `pointermove` on the carousel's `<ul>`**,
not one per card, coalesced into a single `requestAnimationFrame` that writes only `--px` / `--py` on the hovered
card — so each frame is a compositor-only `transform`, never layout. Reuses the existing `trackRef`; do not add a
second ref to that `<ul>`.

It is skipped entirely when `useReducedMotion` is true, so under macOS Reduce motion nothing is attached at all
(verified: custom properties stay unset, and the models simply sit flat because `--px`/`--py` default to 0).
`?motion=on` enables it, same as the rest of the site.

## Expertise areas: four, not five

Small Language Models (SLMs) was removed from `expertiseAreas` on request. Copy that counted them was updated in
both `page.tsx` and `our-expertise/page.tsx` (heading **and** the page metadata description, which is easy to miss).

The `slm` icon stays in `expertiseIcons` — the ongoing project "SLM using LSTM" in `work.ts` still uses it. Two
places still mention small language models and were deliberately left alone: that project's description, and
`whoWeAre.long` in `about.ts` ("large and small language models"), which describes team capability rather than the
advertised discipline list.

`public/noise.webp` is a **locally generated 128px tile (8.9K)**, not Aceternity's CDN asset (715K) — same texture at
1/80th the weight. Regenerate it rather than re-downloading theirs.

## Colour audit (measured, not eyeballed)

Audited all six pages by compositing every text element's colour over its resolved background and computing WCAG
ratios. **No text contrast failures on solid backgrounds anywhere.** Two fixes came out of it:

- **`CtaBand` scrim `bg-navy/15` → `bg-navy/35`.** The brand gradient's teal end left white text at **3.02:1** —
  fine for the heading (large text needs 3.0) but under AA for body copy, and a longer description or a wider
  viewport would have pushed real text into that zone. Now **4.60:1** at the band's lightest point.
- **Home expertise band `bg-muted/40` → `bg-muted`.** It rendered at `rgb(246,248,250)` against a page background of
  `rgb(251,252,253)` — five units apart, too close to read as a deliberate band and too far to look like one
  surface, so it came across as a smudge. Now `rgb(239,242,246)`, clearly intentional.

**Write colour audits against resolved pixels, not `getComputedStyle` string parsing.** Modern CSS colours come back
as `oklab()` / `lab()` and naive number-extraction produces garbage — a first pass reported 43 "failures" with
backgrounds like `rgb(16,0,0)`, all of them fictional. Composite via a 1×1 canvas instead (`fillStyle` accepts any
colour the browser supports), or sample the rendered screenshot.

## Skills

`.claude/skills/` holds five project skills, adapted from LogRocket's "Top five Claude skills for
React" to this repo's actual conventions rather than copied verbatim:

- `plan-with-me` — interview before building; answer from the repo first, ask only what is undecidable
- `update-project-memory` — keep this file current, one line per entry, record the trap not just the change
- `scaffold-component` — folder layout, Server Component default, vendor territory, the tailwind-merge and colour-token traps
- `review-changes` — five categories, severities, no padding, measure before reporting
- `css-first` — CSS over JS, plus the progressive-enhancement contract every scroll effect here follows

Three of the article's rules were **deliberately not adopted** because they contradict this repo:
it puts components under `src/features/…` (this repo is flat under `src/components/`), it keeps
project memory at `.claude/skills/PROJECT-STATE.md` (this repo keeps it at the root), and it
scaffolds a test file per component (**there is no test runner in this project** — adding one is a
separate decision, not an assumption).
