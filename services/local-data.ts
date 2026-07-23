import type { MusicItem, MusicProvider, Filters, Song, Album } from "@/types/music";
import songsData from "@/data/songs.json";
import albumsData from "@/data/albums.json";

const songs = songsData as Song[];
const albums = albumsData as Album[];

function filterItems<T extends MusicItem>(items: T[], filters?: Filters): T[] {
  if (!filters) return items;

  return items.filter((item) => {
    if (filters.type === "songs" && item.type !== "song") return false;
    if (filters.type === "albums" && item.type !== "album") return false;

    if (filters.genre) {
      const genres = item.type === "song" ? [item.genre] : item.genres;
      if (!genres.some((g) => g.toLowerCase().includes(filters.genre!.toLowerCase()))) {
        return false;
      }
    }

    if (filters.decade) {
      const decade = Math.floor(item.year / 10) * 10;
      if (decade.toString() !== filters.decade) return false;
    }

    return true;
  });
}

function weightedRandom(items: MusicItem[]): MusicItem {
  const songItems = items.filter((i) => i.type === "song");
  const albumItems = items.filter((i) => i.type === "album");

  if (songItems.length === 0 && albumItems.length === 0) {
    throw new Error("No items available to recommend");
  }

  if (songItems.length === 0) return albumItems[Math.floor(Math.random() * albumItems.length)];
  if (albumItems.length === 0) return songItems[Math.floor(Math.random() * songItems.length)];

  const rand = Math.random();
  if (rand < 0.8) {
    return songItems[Math.floor(Math.random() * songItems.length)];
  }
  return albumItems[Math.floor(Math.random() * albumItems.length)];
}

class LocalMusicProvider implements MusicProvider {
  async getRandomSong(filters?: Filters, excludeIds?: string[]): Promise<Song> {
    const filtered = filterItems(songs, filters).filter(
      (s) => !excludeIds?.includes(s.id)
    );
    if (filtered.length === 0) throw new Error("No songs available with current filters");
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  async getRandomAlbum(filters?: Filters, excludeIds?: string[]): Promise<Album> {
    const filtered = filterItems(albums, filters).filter(
      (a) => !excludeIds?.includes(a.id)
    );
    if (filtered.length === 0) throw new Error("No albums available with current filters");
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  async getRandomItem(filters?: Filters, excludeIds?: string[]): Promise<MusicItem> {
    const allItems = [...songs, ...albums];
    const filtered = filterItems(allItems, filters).filter(
      (i) => !excludeIds?.includes(i.id)
    );
    if (filtered.length === 0) throw new Error("No items available with current filters");
    return weightedRandom(filtered);
  }
}

let provider: MusicProvider = new LocalMusicProvider();

export function getMusicProvider(): MusicProvider {
  return provider;
}

export function setMusicProvider(newProvider: MusicProvider): void {
  provider = newProvider;
}
