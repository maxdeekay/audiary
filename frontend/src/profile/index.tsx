import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  getFollowing,
  unfollowUser,
  type UserSummary,
} from "@/api/users";

export default function Profile() {
  const [following, setFollowing] = useState<UserSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingIds, setPendingIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getFollowing();
        if (!cancelled) setFollowing(data);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleUnfollow(user: UserSummary) {
    if (pendingIds.has(user.id)) return;

    const previous = following;
    setFollowing((prev) => prev.filter((u) => u.id !== user.id));
    setPendingIds((prev) => new Set(prev).add(user.id));

    try {
      await unfollowUser(user.id);
    } catch {
      setFollowing(previous);
    } finally {
      setPendingIds((prev) => {
        const copy = new Set(prev);
        copy.delete(user.id);
        return copy;
      });
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-9rem)]">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (following.length === 0) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center min-h-[calc(100vh-9rem)] px-6">
        <p className="text-center">you aren't following anyone yet</p>
        <p className="text-xs text-muted-foreground text-center">
          find people in Search to start building your feed
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <h2 className="text-lg font-semibold">Following</h2>
      <div className="flex flex-col gap-3">
        {following.map((user) => (
          <div
            key={user.id}
            className="flex gap-3 items-center rounded-lg border p-3"
          >
            <div className="size-10 rounded-full bg-muted flex items-center justify-center shrink-0">
              <User className="size-5 text-muted-foreground" />
            </div>
            <p className="font-medium truncate">{user.username}</p>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto shrink-0 cursor-pointer"
              disabled={pendingIds.has(user.id)}
              onClick={() => handleUnfollow(user)}
            >
              Unfollow
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
