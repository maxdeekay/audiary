import { Star, User } from "lucide-react";
import AlbumCover from "@/search/album-cover";
import { ActivityEventType, type FeedItem } from "@/api/feed";
import { relativeTime } from "@/lib/relative-time";

export default function FeedItemRow({ item }: { item: FeedItem }) {
  if (item.type === ActivityEventType.StartedFollowing) {
    return (
      <div className="flex gap-3 items-start rounded-lg border p-3">
        <div className="size-12 rounded-full bg-muted flex items-center justify-center shrink-0">
          <User className="size-6 text-muted-foreground" />
        </div>

        <div className="flex flex-col min-w-0 flex-1">
          <p className="text-sm leading-snug">
            <span className="font-medium">{item.username}</span> started
            following you
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {relativeTime(item.createdAt)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 items-start rounded-lg border p-3">
      <AlbumCover src={item.albumCoverUrl ?? ""} alt={item.albumTitle ?? ""} />

      <div className="flex flex-col min-w-0 flex-1">
        <p className="text-sm leading-snug">
          <span className="font-medium">{item.username}</span>{" "}
          {renderAction(item)}
        </p>

        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          {item.albumArtist}
          {item.releaseYear ? ` · ${item.releaseYear}` : ""}
        </p>

        {item.type === ActivityEventType.CommentChanged && item.comment && (
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            "{item.comment}"
          </p>
        )}

        <p className="text-xs text-muted-foreground mt-1">
          {relativeTime(item.createdAt)}
        </p>
      </div>
    </div>
  );
}

function renderAction(item: FeedItem) {
  switch (item.type) {
    case ActivityEventType.AlbumAdded:
      return (
        <>
          added <span className="italic">{item.albumTitle}</span> to{" "}
          <span className="font-medium">{item.collectionName}</span>
        </>
      );
    case ActivityEventType.RatingChanged:
      return (
        <>
          rated <span className="italic">{item.albumTitle}</span>{" "}
          <span className="inline-flex items-center gap-0.5">
            {item.rating?.toFixed(1) ?? "—"}
            <Star className="size-3 inline fill-amber-300 text-amber-300" />
          </span>
        </>
      );
    case ActivityEventType.CommentChanged:
      return (
        <>
          commented on <span className="italic">{item.albumTitle}</span>
        </>
      );
    default:
      return null;
  }
}
