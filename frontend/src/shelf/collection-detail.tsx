import type { Collection } from "./types";
import AlbumCover from "@/search/album-cover";
import { ArrowLeft } from "lucide-react";

type CollectionDetailProps = {
  collection: Collection;
  onBack: () => void;
};

export default function CollectionDetail({
  collection,
  onBack,
}: CollectionDetailProps) {
  return (
    <div className="flex flex-col gap-4 py-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer self-start"
      >
        <ArrowLeft className="size-4" />
        Back
      </button>

      <h2 className="text-lg font-semibold ml-2">{collection.name}</h2>
      {collection.name && (
        <p className="text-sm text-muted-foreground ml-2">
          {collection.description}
        </p>
      )}

      {collection.albums.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No albums in this collection yet
        </p>
      )}

      <div className="flex flex-col gap-3">
        {collection.albums.map((album) => (
          <div
            key={album.id}
            className="flex gap-3 items-center rounded-lg border p-3"
          >
            <AlbumCover src={album.coverUrl!} alt={album.title} />
            <div className="flex flex-col min-w-0">
              <p className="font-medium truncate">{album.title}</p>
              <p className="text-sm text-muted-foreground truncate">
                {album.artist}
                {album.releaseYear && ` · ${album.releaseYear}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
