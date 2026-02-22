import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { getCollection, deleteAlbumFromCollection } from "@/api/collections";
import type { CollectionDetail as CollectionDetailType } from "./types";
import AlbumCover from "@/search/album-cover";
import { Spinner } from "@/components/ui/spinner";
import { Star, ArrowUpDown, Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type SortOption = "date-desc" | "date-asc" | "rating-desc" | "rating-asc";

const sortLabels: Record<SortOption, string> = {
  "date-desc": "Newest",
  "date-asc": "Oldest",
  "rating-desc": "Highest Rated",
  "rating-asc": "Lowest Rated",
};

const LONG_PRESS_DURATION = 1000;

export default function CollectionDetail() {
  const { collectionId } = useParams<{ collectionId: string }>();
  const navigate = useNavigate();
  const [collection, setCollection] = useState<CollectionDetailType | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState<SortOption>("date-desc");
  const [isEditMode, setIsEditMode] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sortedAlbums = collection
    ? [...collection.albums].sort((a, b) => {
        switch (sortOption) {
          case "date-desc":
            return (
              new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
            );
          case "date-asc":
            return (
              new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime()
            );
          case "rating-desc":
            return (b.rating ?? -1) - (a.rating ?? -1);
          case "rating-asc":
            return (a.rating ?? Infinity) - (b.rating ?? Infinity);
        }
      })
    : [];

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

  const handlePressStart = () => {
    longPressTimer.current = setTimeout(() => {
      setIsEditMode(true);
    }, LONG_PRESS_DURATION);
  };

  const handlePressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleDelete = async (albumId: number) => {
    setCollection((prev) =>
      prev
        ? { ...prev, albums: prev.albums.filter((a) => a.albumId !== albumId) }
        : prev,
    );
    await deleteAlbumFromCollection(Number(collectionId), albumId);
  };

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
      className="flex flex-col gap-2 mt-2"
    >
      <div className="flex items-center ml-2 mr-2">
        <h2 className="text-lg font-semibold">{collection.name}</h2>
      </div>
      <div className="flex items-center justify-end ml-2">
        {collection.description && (
          <p className="text-sm text-muted-foreground mr-auto">
            {collection.description}
          </p>
        )}
        {collection.albums.length > 0 && (
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground shrink-0 self-end cursor-pointer"
              >
                <ArrowUpDown className="size-3.5" />
                {sortLabels[sortOption]}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Sort by</DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-col pb-6 px-4">
                {(Object.entries(sortLabels) as [SortOption, string][]).map(
                  ([value, label]) => (
                    <DrawerClose key={value} asChild>
                      <button
                        onClick={() => setSortOption(value)}
                        className="flex items-center justify-between py-3 px-2 rounded-md text-sm hover:bg-muted transition-colors cursor-pointer"
                      >
                        {label}
                        {sortOption === value && (
                          <Check className="size-4 text-primary" />
                        )}
                      </button>
                    </DrawerClose>
                  ),
                )}
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>

      {collection.albums.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No albums in this collection yet
        </p>
      )}

      {isEditMode && (
        <div className="fixed bottom-25 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full px-5 shadow-md pointer-events-auto cursor-pointer"
            onClick={() => setIsEditMode(false)}
          >
            Done
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {sortedAlbums.map((album) => (
          <div
            key={album.id}
            className="flex gap-3 items-center rounded-lg border p-3 transition-colors h-19 cursor-pointer hover:bg-muted"
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            onTouchMove={handlePressEnd}
            onClick={() => {
              if (!isEditMode) {
                navigate(
                  `/collections/${collectionId}/albums/${album.albumId}`,
                );
              }
            }}
          >
            <AlbumCover src={album.coverUrl!} alt={album.title} />
            <div className="flex flex-col min-w-0">
              <p className="font-medium truncate">{album.title}</p>
              <p className="text-sm text-muted-foreground truncate">
                {album.artist}
                {album.releaseYear && ` · ${album.releaseYear}`}
              </p>
            </div>
            <div className="ml-auto flex flex-col gap-2 items-end justify-start shrink-0">
              {isEditMode ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(album.albumId);
                  }}
                  className="size-6 rounded-full bg-destructive flex items-center justify-center cursor-pointer"
                >
                  <Minus className="size-4 text-white" />
                </button>
              ) : (
                <>
                  {album.rating !== null && (
                    <div className="flex gap-2 items-center">
                      <span className="font-medium">
                        {album.rating?.toFixed(1)}
                      </span>
                      <Star className="size-6 fill-amber-300 text-amber-300" />
                    </div>
                  )}
                  {album.genre && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {album.genre.charAt(0).toUpperCase() +
                        album.genre.slice(1)}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
