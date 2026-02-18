import { useCollections } from "@/collections/use-collections";
import { addAlbumToCollection } from "@/api/collections";
import type { MusicSearchResult } from "@/api/music";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Disc3, Check } from "lucide-react";
import { toast } from "sonner";
import type { CollectionSummary } from "@/collections/types";

type CollectionPickerProps = {
  album: MusicSearchResult | null;
  onOpenChange: (open: boolean) => void;
};

export default function CollectionPicker({
  album,
  onOpenChange,
}: CollectionPickerProps) {
  const { collections, refresh } = useCollections();

  async function handleSelect(collection: CollectionSummary) {
    if (!album) return;
    onOpenChange(false);
    toast.success(`${album.title} added to ${collection.name}`);
    await addAlbumToCollection(collection.id, album);
    refresh();
  }

  return (
    <Drawer open={!!album} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add to collection</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-1 px-4 pb-6">
          {collections.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No collections yet
            </p>
          )}
          {collections.map((collection) => {
            const alreadyAdded = album
              ? (collection.musicBrainzIds ?? []).includes(album.musicBrainzId)
              : false;
            return (
              <button
                key={collection.id}
                onClick={() => !alreadyAdded && handleSelect(collection)}
                disabled={alreadyAdded}
                className={`flex items-center gap-3 rounded-lg p-3 text-left transition-colors ${
                  alreadyAdded
                    ? "opacity-50 cursor-default"
                    : "hover:bg-muted cursor-pointer"
                }`}
              >
                <Disc3 className="size-5 text-muted-foreground shrink-0" />
                <div className="flex flex-col min-w-0">
                  <p className="font-medium truncate">{collection.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {collection.albumCount}{" "}
                    {collection.albumCount !== 1 ? "albums" : "album"}
                  </p>
                </div>
                {alreadyAdded && (
                  <Check className="size-4 text-muted-foreground ml-auto shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
