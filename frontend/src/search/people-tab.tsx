import { useState, useEffect } from "react";
import { Search as SearchIcon, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  searchUsers,
  followUser,
  unfollowUser,
  type UserSearchResult,
} from "@/api/users";

export default function PeopleTab() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingIds, setPendingIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    const timeout = setTimeout(async () => {
      try {
        const data = await searchUsers(query.trim());
        setResults(data);
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  async function toggleFollow(user: UserSearchResult) {
    if (pendingIds.has(user.id)) return;

    const next = !user.isFollowing;
    setResults((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, isFollowing: next } : u)),
    );
    setPendingIds((prev) => new Set(prev).add(user.id));

    try {
      if (next) {
        await followUser(user.id);
      } else {
        await unfollowUser(user.id);
      }
    } catch {
      setResults((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, isFollowing: !next } : u,
        ),
      );
    } finally {
      setPendingIds((prev) => {
        const copy = new Set(prev);
        copy.delete(user.id);
        return copy;
      });
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search people..."
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          autoComplete="off"
          inputMode="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      {!query.trim() && !isLoading && (
        <p className="text-sm text-muted-foreground text-center py-12">
          Search for people to follow
        </p>
      )}

      {isLoading && (
        <div className="flex justify-center py-8">
          <Spinner className="size-6" />
        </div>
      )}

      {!isLoading && results.length === 0 && query.trim() && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No people found
        </p>
      )}

      {!isLoading && results.length > 0 && (
        <div className="flex flex-col gap-3">
          {results.map((user) => (
            <div
              key={user.id}
              className="flex gap-3 items-center rounded-lg border p-3"
            >
              <div className="size-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                <User className="size-5 text-muted-foreground" />
              </div>
              <p className="font-medium truncate">{user.username}</p>
              <Button
                variant={user.isFollowing ? "ghost" : "outline"}
                size="sm"
                className="ml-auto shrink-0 cursor-pointer"
                disabled={pendingIds.has(user.id)}
                onClick={() => toggleFollow(user)}
              >
                {user.isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
