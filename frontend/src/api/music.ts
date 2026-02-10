import { get } from "./client";

export type MusicSearchResult = {
  musicBrainzId: string;
  title: string;
  artist: string;
  coverUrl?: string;
  genre?: string;
  releaseYear?: number;
};

export async function searchMusic(query: string) {
  console.log("searching for:", encodeURIComponent(query));
  return get<MusicSearchResult[]>(
    `/api/music/search?q=${encodeURIComponent(query)}`,
  );
}
