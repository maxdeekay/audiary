import { createContext } from "react";

export type CollectionContextType = {
  collections: CollectionSummary[];
  isLoading: boolean;
  refresh: () => Promise<void>;
};

export const CollectionContext = createContext<CollectionContextType | null>(
  null,
);

export type CollectionSummary = {
  id: number;
  name: string;
  description?: string;
  albumCount: number;
  musicBrainzIds: string[];
  createdAt: string;
};

export type CollectionDetail = {
  id: number;
  name: string;
  description?: string;
  albums: CollectionAlbum[];
  createdAt: string;
};

export type CollectionAlbum = {
  id: number;
  albumId: number;
  musicBrainzId: string;
  title: string;
  artist: string;
  coverUrl?: string;
  genre?: string;
  releaseYear: number;
  rating?: number;
  position: number;
  addedAt: string;
};

export type CollectionAlbumDetail = {
  id: number;
  albumId: number;
  musicBrainzId: string;
  title: string;
  artist: string;
  coverUrl?: string;
  genre?: string;
  releaseYear: number;
  rating?: number;
  position: number;
  comment?: string;
  tracks: Track[];
  addedAt: string;
};

export type Track = {
  id: number;
  title: string;
  position: number;
  length?: number;
  isFavourite: boolean;
};
