PROMPT FOR OPENCODE CLI

Read spec.md in this repo first — it defines the product, tech stack, constraints, and the "DO NOT BUILD" list. Treat it as the source of truth for everything it explicitly pins down (colors, tech stack, features, dark-mode-only, no confetti/ particles, etc). This prompt is a visual redesign pass on top of that spec, not a replacement for it.

Problem with the current build

The current implementation is correct against the letter of the spec, but the result reads as generic "AI dark mode" — near-black background, single green accent, everything centered in a small floating card. It doesn't feel like a product with a point of view. Fix the layout, typography, and signature moment while keeping every hard constraint from spec.md intact (colors 
#090909 / 
#151515 / 
#1DB954, dark mode only, Next.js 15 + TS + Tailwind + shadcn/ui + Framer Motion + Lucide, MusicProvider abstraction, local dataset, no auth/backend/confetti).

Redesign direction

1. Layout — full-bleed "gatefold" instead of a centered card

Kill the small centered floating card entirely.
Desktop: artwork fills the left ~50% of the viewport, edge to edge, top to bottom. Metadata lives in a tall vertical column on the right with generous whitespace — like liner notes, not a widget.
Mobile: artwork fills the top ~55% of the viewport, metadata stacks below.
Buttons (Spotify / YouTube / Play Something Else / favorite) sit in the metadata column, not stacked awkwardly under a card.

2. Typography — two roles, deliberately paired

Display face for song/album title: large, confident, tight tracking. This should be the loudest thing on the page.
Monospace face for ALL metadata values (year, duration, genre, track count, the catalog number below). Mono-for-data makes it read like a catalog entry rather than generic UI copy. Keep body/label text in a plain sans, small and quiet, uppercase with wide tracking for eyebrows only (e.g. "SONG", "ALBUM").

3. Signature element — session catalog number

Replace the plain "SONG"/"ALBUM" pill with a catalog-style line, e.g. № 0043 · SPIN where the number is the count of discoveries this session (persisted in the same local-storage history the spec already requires).
On each new recommendation, animate the number ticking up (odometer-style, short spring), not just re-render.
This is the one bold, memorable move — keep everything else around it quiet.

4. Motion

Artwork entrance: a mask-wipe reveal (like a needle drop), not a plain fade — use Framer Motion's clip-path or scale-from-edge, spring easing.
Title/artist/metadata: staggered upward fade-in, ~40-60ms stagger, natural spring, not linear.
Play Something button: the 🎲 gets a small spring rotation on press before the new recommendation resolves — reinforces the "roll" metaphor from the name.
Old → new artwork: cross-fade using a shared layout id (AnimatePresence + layoutId) so it never feels like a hard cut, per spec's shared-layout requirement.
Respect prefers-reduced-motion throughout — fall back to simple opacity fades.

5. Background

Keep the dominant-color extraction + blurred radial gradient (spec requires this) but let it wash the entire canvas — full viewport ambient tone — rather than sitting as an isolated blob behind a floating card. The artwork and the room should feel like the same object.
Still morph slowly between recommendations, never cut instantly.

6. Restraint

No extra card shadows, no glass borders beyond what's needed for legibility over the artwork/gradient.
No new decorative elements beyond the catalog number and the mask-wipe. Spend the boldness in those two places only.
Keep the "DO NOT BUILD" list from spec.md intact — no confetti, no particles, no dashboards.
What to do
Re-read the existing component structure under components/ and identify what to refactor vs. rewrite (likely: the main discovery card component and its layout, the background gradient component, and the button/metadata subcomponents).
Propose the updated component hierarchy and layout in plain terms before touching code.
Implement incrementally: layout shell → typography tokens → artwork/mask-wipe → metadata column → catalog number + odometer tick → button roll animation → background wash → responsive pass (mobile stacks artwork-then-metadata) → accessibility pass (focus rings, aria-live on the recommendation region so screen readers announce new picks, prefers-reduced-motion).
Confirm npm run build passes with no TypeScript or ESLint errors before finishing.
Take a critical pass at the end: does anything here still look like a generic dark-mode template? If so, name it and fix it before calling this done.