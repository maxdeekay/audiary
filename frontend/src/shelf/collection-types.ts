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
  FavouriteSongs: FavouriteSong[];
};

export type FavouriteSong = {
  id: number;
};

export type CollectionContextType = {
  collections: Collection[];
  isLoading: boolean;
  refresh: () => Promise<void>;
};

export const CollectionContext = createContext<CollectionContextType | null>(
  null,
);
