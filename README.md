# PlaySomething

> Don't know what to listen to? We'll pick.

A beautiful music discovery experience. Press one button and discover amazing songs and albums.

## Features

- **Smart Randomization** - 80% songs, 20% albums weighted recommendations
- **Never Repeat** - Last 10 discoveries excluded from next pick
- **Favorites** - Save songs and albums with a heart animation
- **History** - Slide-out drawer with last 25 discoveries
- **Filters** - Genre, decade, and type filters
- **Dynamic Background** - Animated blurred gradient from album artwork colors
- **Keyboard Accessible** - Press Space to discover
- **Responsive** - Works on mobile, tablet, and desktop
- **Dark Mode** - Premium dark theme with glassmorphism

## Tech Stack

- [Next.js 16](https://nextjs.org/) - App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)

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

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/              # Next.js App Router pages
components/       # React components
components/ui/    # Reusable UI components
data/             # Local music dataset
hooks/            # Custom React hooks
lib/              # Utility functions
providers/        # React context providers
services/         # Music provider abstraction
types/            # TypeScript type definitions
```

## Architecture

The app uses a **MusicProvider abstraction** layer. Currently backed by a local JSON dataset, but designed to swap to Spotify API without modifying any UI code.

```typescript
interface MusicProvider {
  getRandomSong(filters?, excludeIds?): Promise<Song>;
  getRandomAlbum(filters?, excludeIds?): Promise<Album>;
  getRandomItem(filters?, excludeIds?): Promise<MusicItem>;
}
```

## License

MIT
