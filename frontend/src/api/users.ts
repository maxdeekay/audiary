import { get, post, remove } from "./client";

export type UserSummary = {
  id: number;
  username: string;
  followedAt: string;
};

export type UserSearchResult = {
  id: number;
  username: string;
  isFollowing: boolean;
};

export async function getFollowing() {
  return get<UserSummary[]>("/api/users/following");
}

export async function searchUsers(query: string) {
  return get<UserSearchResult[]>(
    `/api/users/search?query=${encodeURIComponent(query)}`,
  );
}

export async function followUser(targetUserId: number) {
  return post<void>(`/api/users/${targetUserId}/follow`);
}

export async function unfollowUser(targetUserId: number) {
  return remove<void>(`/api/users/${targetUserId}/follow`);
}
