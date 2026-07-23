# ROLE

You are a Staff Software Engineer, Product Designer, and Frontend Architect.

Your task is to build a production-quality web application called **PlaySomething**.

Do not behave like a code generator.

Behave like a senior engineer designing a product that could realistically launch on Product Hunt and be featured on Awwwards.

Think before writing code.

Plan the architecture before implementation.

Prioritize polish over features.

Every design decision should improve the user experience.

Every line of code should be production-ready.

---

# PRODUCT

Name

PlaySomething

Tagline

Don't know what to listen to? We'll pick.

PlaySomething is a music discovery experience.

It is NOT a Spotify clone.

It is NOT a music player.

It is NOT another CRUD project.

Its only goal is helping users discover great music in the most beautiful way possible.

The entire experience should revolve around pressing one button.

Users shouldn't think.

They should simply press

🎲 Play Something

and instantly discover something amazing.

The experience should feel magical.

---

# PRODUCT EXPERIENCE

User visits the homepage.

They immediately understand what the website does.

There is one primary action.

🎲 Play Something

Pressing the button instantly reveals a beautiful recommendation.

Recommendations should be:

• 80% Songs
• 20% Albums

Never immediately repeat recommendations.

Every recommendation should feel unique.

The user should naturally want to press the button again.

---

# DISPLAY

For Songs

• Album Artwork
• Song Name
• Artist
• Album
• Genre
• Release Year
• Duration

Buttons

• Listen on Spotify
• Watch on YouTube
• Play Something Else

---

For Albums

• Large Album Artwork
• Album Name
• Artist
• Genres
• Release Year
• Track Count

Buttons

• Listen on Spotify
• Watch on YouTube
• Play Something Else

Album artwork should always be the focal point.

---

# DESIGN LANGUAGE

Inspired by

• Spotify
• Apple Music
• Linear
• Vercel
• Nothing OS

Do NOT copy them.

Capture

their spacing

their elegance

their minimalism

their polish

their smoothness

Design principles

• Premium
• Minimal
• Modern
• Cinematic
• Fast
• Beautiful
• Music-first

No clutter.

Lots of whitespace.

Perfect alignment.

Large typography.

Rounded corners.

Soft shadows.

Subtle glassmorphism.

Dark mode only.

Colors

Background

#090909

Cards

#151515

Accent

#1DB954

Typography should be bold, elegant and readable.

---

# LANDING PAGE

Extremely simple.

Centered vertically.

Large logo/title

PlaySomething

Subtitle

Don't know what to listen to?

We'll pick.

Large primary button

🎲 Play Something

Tiny footer

Powered by Spotify

Nothing else.

No feature cards.

No hero illustrations.

No pricing.

No marketing copy.

No testimonials.

This is an application.

Not a landing page.

---

# DISCOVERY EXPERIENCE

Clicking Play Something should feel satisfying.

Animate into the recommendation.

Large artwork.

Metadata fades upward.

Buttons animate.

Background changes.

Every interaction should feel intentional.

---

# DYNAMIC BACKGROUND

Extract dominant colors from album artwork.

Generate an animated blurred radial gradient.

Background should slowly morph whenever recommendations change.

Never instantly switch.

The artwork and background should feel connected.

---

# MICROINTERACTIONS

Buttons

Soft hover lift

Small scale animation

Cards

Gentle elevation

Artwork

Tiny hover zoom

Transitions

Smooth

Natural

Premium

Never over-animate.

Every animation should have purpose.

---

# ANIMATIONS

Use Framer Motion.

Requirements

AnimatePresence

Spring animations

Fade

Scale

Slide

Shared layout transitions where appropriate

Smooth page transitions

Natural easing

Premium timing

---

# FEATURES (MVP)

✔ Random Song

✔ Random Album

✔ Smart randomization

✔ Never immediately repeat

✔ Spotify button

✔ YouTube button

✔ Favorites

✔ Recently Viewed

✔ Local Storage

✔ Responsive

✔ Beautiful loading state

✔ Error state

✔ Keyboard accessible

---

# FAVORITES

Users can save songs and albums.

Store locally.

Beautiful heart animation.

---

# HISTORY

Store last 25 discoveries.

Accessible from a slide-out drawer.

---

# FILTERS

Optional drawer.

Genre

Mood

Decade

Country

Language

Songs only

Albums only

Everything (default)

Drawer should stay minimal.

---

# DATA LAYER

The UI must never directly depend on Spotify.

Create an abstraction.

MusicProvider

↓

Current implementation

Local JSON dataset

↓

Future implementation

Spotify API

The UI should work without modifications when switching providers.

---

# API

Start with a local dataset.

Do not make Spotify authentication a requirement for the MVP.

The project should remain deployable immediately.

---

# TECH STACK

Next.js 15

App Router

TypeScript

Tailwind CSS

shadcn/ui

Framer Motion

Lucide React

next/image

Use Server Components whenever possible.

Only use Client Components when necessary.

---

# PROJECT STRUCTURE

app/

components/

components/ui/

hooks/

providers/

services/

lib/

utils/

types/

data/

public/

styles/

Keep architecture clean.

Avoid giant files.

Every component should have one responsibility.

---

# PERFORMANCE

Optimize for Vercel.

Requirements

next/image

Lazy loading

Minimal bundle

Avoid unnecessary re-renders

Memoization where useful

Lighthouse targets

Performance >95

Accessibility >95

Best Practices >95

SEO >95

Project must successfully pass

npm run build

No TypeScript errors.

No ESLint errors.

---

# ACCESSIBILITY

Semantic HTML

ARIA labels

Keyboard navigation

Focus rings

Proper contrast

Screen reader support

---

# SEO

Metadata

OpenGraph

Twitter Cards

robots.txt

manifest.json

favicon

sitemap.xml

---

# CODE QUALITY

Strict TypeScript.

No duplicate logic.

Reusable components.

Meaningful naming.

No inline styles.

No unnecessary comments.

No over-engineering.

Use modern React patterns.

Keep components reasonably small.

---

# DO NOT BUILD

❌ Authentication

❌ User accounts

❌ Database

❌ Backend

❌ Comments

❌ Playlists

❌ Social features

❌ Analytics

❌ Ads

❌ AI recommendations

❌ Chat

❌ Confetti

❌ Particle effects

❌ Complex dashboards

Keep the application focused.

---

# VERCEL

The application will be deployed to Vercel.

Ensure

• Production-ready build
• Fast loading
• Optimized images
• Proper metadata
• Mobile-first
• Responsive
• No runtime errors
• Environment variables documented in `.env.example` if needed

---

# IMPLEMENTATION PLAN

Before writing any code:

1. Design the application architecture.
2. Define the folder structure.
3. Define all shared types.
4. Design the reusable component hierarchy.
5. Build the data provider.
6. Build the landing page.
7. Build the discovery experience.
8. Add animations.
9. Add favorites and history.
10. Optimize for production.

Implement incrementally.

Never skip planning.

Never generate placeholder implementations.

The final application should feel like a premium startup product that people would happily bookmark and use every day.