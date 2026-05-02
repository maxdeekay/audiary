import { useEffect, useState } from "react";
import { getFeed, type FeedItem } from "@/api/feed";
import { Spinner } from "@/components/ui/spinner";
import FeedItemRow from "./feed-item";

export default function Home() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getFeed();
        if (!cancelled) setItems(data);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-9rem)]">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center min-h-[calc(100vh-9rem)] px-6">
        <p className="text-center">your feed is quiet</p>
        <p className="text-xs text-muted-foreground text-center">
          follow people to see what they're listening to
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 py-4">
      {items.map((item) => (
        <FeedItemRow key={item.id} item={item} />
      ))}
    </div>
  );
}
