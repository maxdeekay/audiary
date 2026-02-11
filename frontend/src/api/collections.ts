import { post } from "./client";
import type { MusicSearchResult } from "./music";

type CreateCollectionRequest = {
  name: string;
  description?: string;
};

type CollectionResponse = {
  id: number;
  name: string;
  description?: string;
  albums: [];
  createdAt: string;
};

export async function createCollection(data: CreateCollectionRequest) {
  return post<CollectionResponse>("/api/collections", data);
}

export async function addAlbumToCollection(
  collectionId: number,
  album: MusicSearchResult,
) {
  return post<void>(`/api/collections/${collectionId}/albums`, album);
}
