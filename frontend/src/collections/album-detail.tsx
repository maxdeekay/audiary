import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { getCollectionAlbum, updateCollectionAlbum } from "@/api/collections";
import type { CollectionAlbumDetail } from "./types";
import AlbumCover from "@/search/album-cover";
import { Spinner } from "@/components/ui/spinner";
import { Star, Pencil } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function AlbumDetail() {
  const { collectionId, albumId } = useParams<{
    collectionId: string;
    albumId: string;
  }>();
  const [album, setAlbum] = useState<CollectionAlbumDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [drawerField, setDrawerField] = useState<"rating" | "comment" | null>(
    null,
  );
  const [ratingValue, setRatingValue] = useState(0);
  const [commentValue, setCommentValue] = useState("");

  useEffect(() => {
    async function fetchCollectionAlbum() {
      setIsLoading(true);
      try {
        const data = await getCollectionAlbum(
          Number(collectionId),
          Number(albumId),
        );
        setAlbum(data);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCollectionAlbum();
  }, [collectionId, albumId]);

  function openDrawer(field: "rating" | "comment") {
    if (field === "rating") setRatingValue(album?.rating ?? 0);
    if (field === "comment") setCommentValue(album?.comment ?? "");
    setDrawerField(field);
  }

  async function handleDrawerClose(open: boolean) {
    if (!open && album) {
      const update: {
        rating?: number;
        comment?: string;
      } = {};

      if (drawerField === "rating" && ratingValue !== album.rating)
        update.rating = ratingValue;

      if (drawerField === "comment" && commentValue !== (album.comment ?? "")) {
        update.comment = commentValue;
      }

      if (Object.keys(update).length > 0) {
        setAlbum({ ...album, ...update });

        try {
          await updateCollectionAlbum(
            Number(collectionId),
            Number(albumId),
            update,
          );
        } catch {
          setAlbum(album);
        }
      }
      setDrawerField(null);
    }
    if (!open) setDrawerField(null);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-5rem)]">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!album) return null;

  return (
    <>
      {/* Rating drawer */}
      <Drawer
        direction="top"
        open={drawerField === "rating"}
        onOpenChange={handleDrawerClose}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Rate the album</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-4 px-4 pb-6">
            <span className="text-2xl font-bold text-center">
              {ratingValue.toFixed(1)}
            </span>
            <Slider
              value={[ratingValue]}
              onValueChange={([v]) => setRatingValue(v)}
              min={0}
              max={10}
              step={0.1}
            />
          </div>
        </DrawerContent>
      </Drawer>

      {/* Comment drawer */}
      <Drawer
        direction="top"
        open={drawerField === "comment"}
        onOpenChange={handleDrawerClose}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add a comment</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6">
            <textarea
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="What did you think?"
              className="w-full h-24 rounded-md border border-border bg-background px-3 py-2 text-base resize-none focus:outline-none focus:ring-1 focus:ring-ring"
              autoFocus
              onFocus={(e) => {
                const val = e.target.value;
                e.target.value = "";
                e.target.value = val;
              }}
            />
          </div>
        </DrawerContent>
      </Drawer>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col gap-2 mt-4"
      >
        <div className="flex flex-col gap-3 mx-2">
          <div className="flex gap-3">
            <AlbumCover
              src={album.coverUrl?.replace("front-250", "front-500") ?? ""}
              alt={album.title}
              size="size-16"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold truncate">
                  {album.title}
                </h2>
                <button
                  className="flex gap-2 items-center shrink-0 cursor-pointer"
                  onClick={() => openDrawer("rating")}
                >
                  {album.rating !== null ? (
                    <>
                      <span className="font-medium">
                        {album.rating?.toFixed(1)}
                      </span>
                      <Star className="size-6 text-yellow-300 fill-yellow-300" />
                    </>
                  ) : (
                    <>
                      <span>Rate</span>
                      <Star className="size-6" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-sm text-muted-foreground truncate">
                {album.artist}
                {album.releaseYear && ` · ${album.releaseYear}`}
              </p>
            </div>
          </div>

          <button
            className="flex items-center gap-2 w-full py-3 border-b border-border text-left group cursor-pointer"
            onClick={() => openDrawer("comment")}
          >
            {album.comment ? (
              <p className="text-sm text-muted-foreground">{album.comment}</p>
            ) : (
              <span className="text-sm text-muted-foreground">
                Add a comment...
              </span>
            )}
            <Pencil className="size-3.5 text-muted-foreground shrink-0 ml-auto" />
          </button>

          {/* Track List */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Tracks</h3>
            {album.tracks.map((track) => (
              <div
                key={track.id}
                className="flex items-center gap-3 py-3 border-b border-border last:border-0"
              >
                <span className="text-sm text-muted-foreground w-4 text-right">
                  {track.position}
                </span>
                <span className="flex-1 truncate">{track.title}</span>

                {track.length && (
                  <span className="text-sm text-muted-foreground">
                    {formatDuration(track.length)}
                  </span>
                )}

                <button className="cursor-pointer">
                  <Star className="size-5 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
