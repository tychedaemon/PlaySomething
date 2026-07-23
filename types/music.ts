export interface Song {
  id: string;
  type: "song";
  title: string;
  artist: string;
  album: string;
  genre: string;
  year: number;
  duration: string;
  artwork: string;
  spotifyUrl: string;
  youtubeUrl: string;
  dominantColor: string;
}

export interface Album {
  id: string;
  type: "album";
  title: string;
  artist: string;
  genres: string[];
  year: number;
  trackCount: number;
  artwork: string;
  spotifyUrl: string;
  youtubeUrl: string;
  dominantColor: string;
}

export type MusicItem = Song | Album;

export type RecommendationType = "everything" | "songs" | "albums";

export interface Filters {
  genre?: string;
  mood?: string;
  decade?: string;
  country?: string;
  language?: string;
  type: RecommendationType;
}

export interface MusicProvider {
  getRandomSong(filters?: Filters, excludeIds?: string[]): Promise<Song>;
  getRandomAlbum(filters?: Filters, excludeIds?: string[]): Promise<Album>;
  getRandomItem(filters?: Filters, excludeIds?: string[]): Promise<MusicItem>;
}

export interface AppState {
  currentRecommendation: MusicItem | null;
  isLoading: boolean;
  error: string | null;
  history: MusicItem[];
  favorites: MusicItem[];
  filters: Filters;
  isHistoryOpen: boolean;
  isFiltersOpen: boolean;
}
