import { createContext } from "react";

export type Collection = {
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
  comment?: string;
  favouriteSongs: FavouriteSong[];
  addedAt: string;
};

export type FavouriteSong = {
  id: number;
  name: string;
  position: number;
};

export type CollectionContextType = {
  collections: Collection[];
  isLoading: boolean;
  refresh: () => Promise<void>;
};

export const CollectionContext = createContext<CollectionContextType | null>(
  null,
);
