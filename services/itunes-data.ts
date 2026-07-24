import type { MusicItem, MusicProvider, Filters, Song, Album } from "@/types/music";

const SEARCH_URL = "https://itunes.apple.com/search";
const LIMIT = 50;

function generateId(prefix: string, id: number): string {
  return `itunes-${prefix}-${id}`;
}

function hashToColor(id: number): string {
  const palette = [
    "#1DB954", "#E1332D", "#FF69B4", "#FF8C00", "#9370DB",
    "#00CED1", "#FF4500", "#32CD32", "#4169E1", "#DAA520",
    "#8B008B", "#20B2AA", "#FF6347", "#7B68EE", "#00FA9A",
    "#DC143C", "#6495ED", "#FFD700", "#48D1CC", "#C71585",
  ];
  return palette[id % palette.length];
}

function msToDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function youtubeUrl(...parts: string[]): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(parts.join(" ").trim())}`;
}

function artworkUrl(url: string | undefined): string {
  if (!url) return "https://picsum.photos/seed/default/400/400";
  return url.replace("100x100bb", "600x600bb");
}

/* ------------------------------------------------------------------ */
/*  iTunes raw types                                                   */
/* ------------------------------------------------------------------ */

interface ITTrack {
  wrapperType: "track";
  kind: "song";
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  artworkUrl100?: string;
  trackViewUrl: string;
  collectionViewUrl: string;
  releaseDate: string;
  trackTimeMillis: number;
  primaryGenreName: string;
  country: string;
}

interface ITAlbum {
  wrapperType: "collection";
  collectionType: "Album";
  collectionId: number;
  artistName: string;
  collectionName: string;
  artworkUrl100?: string;
  collectionViewUrl: string;
  releaseDate: string;
  trackCount: number;
  primaryGenreName: string;
  country: string;
}

interface ITSearchResponse {
  resultCount: number;
  results: (ITTrack | ITAlbum)[];
}

/* ------------------------------------------------------------------ */
/*  Search queries for random discovery                                */
/* ------------------------------------------------------------------ */

const SEEDS = [
  "a", "e", "i", "o", "u", "love", "night", "day", "dream",
  "sun", "moon", "star", "heart", "fire", "rain", "sky", "blue",
  "dance", "gold", "light", "free", "ride", "song", "baby",
  "summer", "forever", "tonight", "hot", "cool", "wild",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function searchItunes<T>(params: Record<string, string>): Promise<T[]> {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${SEARCH_URL}?${qs}`);
  if (!res.ok) throw new Error(`iTunes API error ${res.status}`);
  const data: ITSearchResponse = await res.json();
  return data.results as unknown as T[];
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

class ITunesMusicProvider implements MusicProvider {
  async getRandomSong(
    filters?: Filters,
    excludeIds?: string[],
  ): Promise<Song> {
    const term = this.buildSongTerm(filters);
    const results = await searchItunes<ITTrack>({
      term,
      entity: "song",
      limit: String(LIMIT),
    });

    let candidates = results;
    if (candidates.length === 0)
      throw new Error("No songs found");

    if (excludeIds?.length) {
      candidates = candidates.filter(
        (t) => !excludeIds.includes(generateId("track", t.trackId)),
      );
      if (candidates.length === 0)
        throw new Error("No new songs available – try clearing history");
    }

    return this.toSong(pickRandom(candidates));
  }

  async getRandomAlbum(
    filters?: Filters,
    excludeIds?: string[],
  ): Promise<Album> {
    const term = this.buildAlbumTerm(filters);
    const results = await searchItunes<ITAlbum>({
      term,
      entity: "album",
      limit: String(LIMIT),
    });

    let candidates = results.filter(
      (a) => a.collectionType === "Album" && a.trackCount > 1,
    );
    if (candidates.length === 0)
      throw new Error("No albums found");

    if (excludeIds?.length) {
      candidates = candidates.filter(
        (a) => !excludeIds.includes(generateId("album", a.collectionId)),
      );
      if (candidates.length === 0)
        throw new Error("No new albums available – try clearing history");
    }

    return this.toAlbum(pickRandom(candidates));
  }

  async getRandomItem(
    filters?: Filters,
    excludeIds?: string[],
  ): Promise<MusicItem> {
    if (Math.random() < 0.8)
      return this.getRandomSong(filters, excludeIds);
    return this.getRandomAlbum(filters, excludeIds);
  }

  /* ---- Helpers --------------------------------------------------- */

  private buildSongTerm(filters?: Filters): string {
    if (filters?.genre) return filters.genre;
    if (filters?.decade) return `20${filters.decade.slice(2)}`;
    return pickRandom(SEEDS);
  }

  private buildAlbumTerm(filters?: Filters): string {
    if (filters?.genre) return filters.genre;
    return pickRandom(SEEDS);
  }

  private toSong(t: ITTrack): Song {
    const year = t.releaseDate
      ? Number(t.releaseDate.slice(0, 4))
      : 0;
    return {
      id: generateId("track", t.trackId),
      type: "song",
      title: t.trackName,
      artist: t.artistName,
      album: t.collectionName,
      genre: t.primaryGenreName,
      year,
      duration: msToDuration(t.trackTimeMillis),
      artwork: artworkUrl(t.artworkUrl100),
      spotifyUrl: t.trackViewUrl,
      youtubeUrl: youtubeUrl(t.trackName, t.artistName),
      dominantColor: hashToColor(t.trackId),
    };
  }

  private toAlbum(a: ITAlbum): Album {
    const year = a.releaseDate
      ? Number(a.releaseDate.slice(0, 4))
      : 0;
    return {
      id: generateId("album", a.collectionId),
      type: "album",
      title: a.collectionName,
      artist: a.artistName,
      genres: [a.primaryGenreName],
      year,
      trackCount: a.trackCount,
      artwork: artworkUrl(a.artworkUrl100),
      spotifyUrl: a.collectionViewUrl,
      youtubeUrl: youtubeUrl(a.collectionName, a.artistName, "album"),
      dominantColor: hashToColor(a.collectionId),
    };
  }
}

let instance: ITunesMusicProvider | null = null;

export function getITunesProvider(): ITunesMusicProvider {
  if (!instance) instance = new ITunesMusicProvider();
  return instance;
}
