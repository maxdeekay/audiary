import { get, post, remove, patch } from "./client";
import type {
  CollectionSummary,
  CollectionDetail,
  CollectionAlbumDetail,
} from "@/collections/types";
import type { MusicSearchResult } from "./music";

export async function getCollections() {
  return get<CollectionSummary[]>("/api/collections");
}

export async function getCollection(collectionId: number) {
  return get<CollectionDetail>(`/api/collections/${collectionId}`);
}

export async function getCollectionAlbum(
  collectionId: number,
  albumId: number,
) {
  return get<CollectionAlbumDetail>(
    `/api/collections/${collectionId}/albums/${albumId}`,
  );
}

export async function createCollection(data: {
  name: string;
  description?: string;
}) {
  return post<CollectionSummary>("/api/collections", data);
}

export async function updateCollectionAlbum(
  collectionId: number,
  albumId: number,
  data: { rating?: number; comment?: string },
) {
  return patch<void>(
    `/api/collections/${collectionId}/albums/${albumId}`,
    data,
  );
}

export async function addAlbumToCollection(
  collectionId: number,
  album: MusicSearchResult,
) {
  return post<CollectionDetail>(
    `/api/collections/${collectionId}/albums`,
    album,
  );
}

export async function addFavouriteTrack(
  collectionAlbumId: number,
  trackId: number,
) {
  return post<void>(
    `/api/collections/${collectionAlbumId}/favourites/${trackId}`,
  );
}

export async function deleteFavouriteTrack(
  collectionAlbumId: number,
  trackId: number,
) {
  return remove<void>(
    `/api/collections/${collectionAlbumId}/favourites/${trackId}`,
  );
}
