import { get } from "./client";

export const ActivityEventType = {
  AlbumAdded: 0,
  RatingChanged: 1,
  CommentChanged: 2,
  StartedFollowing: 3,
} as const;

export type ActivityEventTypeValue =
  (typeof ActivityEventType)[keyof typeof ActivityEventType];

export type FeedItem = {
  id: number;
  type: ActivityEventTypeValue;
  createdAt: string;
  userId: number;
  username: string;
  collectionId?: number;
  collectionName?: string;
  collectionAlbumId?: number;
  albumId?: number;
  albumTitle?: string;
  albumArtist?: string;
  albumCoverUrl?: string;
  releaseYear?: number;
  rating?: number;
  comment?: string;
  targetUserId?: number;
  targetUsername?: string;
};

export async function getFeed() {
  return get<FeedItem[]>("/api/feed");
}
