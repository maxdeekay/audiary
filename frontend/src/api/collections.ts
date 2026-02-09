import { post } from "./client";

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
