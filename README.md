# PlaySomething

> Don't know what to listen to? We'll pick.
> https://play-something-seven.vercel.app/

A beautiful music discovery experience. Press one button and discover millions of songs and albums from the iTunes catalog.

**v0.02** — Now powered by the iTunes Search API with thousands of songs instead of a static JSON dataset.

## Features

- **Smart Randomization** — 80% songs, 20% albums weighted recommendations
- **Never Repeat** — Last 10 discoveries excluded from the next pick
- **iTunes Catalog** — Real songs/albums with artwork, genre, duration, and year
- **Favorites** — Save songs and albums with a heart animation
- **History** — Slide-out drawer with last 25 discoveries
- **Filters** — Genre, decade, and type filters
- **Dynamic Background** — Animated blurred gradient that changes per recommendation
- **Listen on Apple Music** — Direct link to each track/album
- **Watch on YouTube** — Auto-generated YouTube search links
- **Keyboard Accessible** — Press Space to discover
- **Responsive** — Works on mobile, tablet, and desktop
- **Dark Mode** — Premium dark theme with glassmorphism

## Tech Stack

- [Next.js 16](https://nextjs.org/) — App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)
- [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

No API keys required. Open [http://localhost:3000](http://localhost:3000) and press "Play Something".

## Project Structure

```
app/              # Next.js App Router pages
components/       # React components
components/ui/    # Reusable UI components
data/             # Local JSON dataset (fallback)
hooks/            # Custom React hooks
lib/              # Utility functions
providers/        # React context provider
services/         # Music provider abstraction layer
types/            # TypeScript type definitions
```

## Architecture

The app uses a **MusicProvider abstraction** layer. The active provider is `ITunesMusicProvider` which fetches from the iTunes Search API. The architecture supports swapping providers without touching any UI code.

```typescript
interface MusicProvider {
  getRandomSong(filters?, excludeIds?): Promise<Song>;
  getRandomAlbum(filters?, excludeIds?): Promise<Album>;
  getRandomItem(filters?, excludeIds?): Promise<MusicItem>;
}
```

Built-in providers:
- **`ITunesMusicProvider`** (default) — Searches the iTunes catalog with random seeds for wide discovery
- **`LocalMusicProvider`** — Reads from local `data/songs.json` and `data/albums.json` (30 songs, 15 albums)

## v0.02 Changelog

- Swapped static JSON dataset for the iTunes Search API (no API key needed, works globally)
- Replaced "Listen on Spotify" with "Listen on Apple Music"
- Removed "Powered by Spotify" branding
- Updated button styling with Apple Music-inspired red and glass-morphism variants
- Fixed composition bugs: dead space on wide screens, title wrapping, background gradient tracking
- Added artwork loading placeholder with fade-in
- Polished loading state with smoother transitions
- Updated Next.js image config for iTunes artwork CDN

## License

MIT
