import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { getCollection } from "@/api/collections";
import type { CollectionDetail as CollectionDetailType } from "./types";
import AlbumCover from "@/search/album-cover";
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeft } from "lucide-react";

export default function CollectionDetail() {
  const { collectionId } = useParams<{ collectionId: string }>();
  const navigate = useNavigate();
  const [collection, setCollection] = useState<CollectionDetailType | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCollection() {
      setIsLoading(true);
      try {
        const data = await getCollection(Number(collectionId));
        setCollection(data);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCollection();
  }, [collectionId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-5rem)]">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!collection) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col gap-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer self-start"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>

        <h2 className="text-lg font-semibold ml-2">{collection.name}</h2>
        {collection.description && (
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
              onClick={() =>
                navigate(`/collections/${collectionId}/albums/${album.albumId}`)
              }
              className="flex gap-3 items-center rounded-lg border p-3 hover:bg-muted transition-colors cursor-pointer"
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
    </motion.div>
  );
}
