import type { MusicItem, MusicProvider, Filters, Song, Album } from "@/types/music";
import { getITunesProvider } from "./itunes-data";

let provider: MusicProvider = getITunesProvider();

export function getMusicProvider(): MusicProvider {
  return provider;
}

export function setMusicProvider(newProvider: MusicProvider): void {
  provider = newProvider;
}

export type { MusicProvider };
