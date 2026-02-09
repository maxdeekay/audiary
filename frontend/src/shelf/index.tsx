import { useState } from "react";
import { useCollections } from "./use-collections";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import CreateCollectionPanel from "./create-collection";

export default function Shelf() {
  const { collections, isLoading, refresh } = useCollections();
  const [showForm, setShowForm] = useState(false);

  function handleCreated() {
    setShowForm(false);
    refresh();
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-5rem)]">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (collections.length === 0 && !showForm) {
    return (
      <div className="flex flex-col gap-5 justify-center items-center min-h-[calc(100vh-5rem)]">
        <p className="text-center">
          every record on the shelf is a tiny time machine, waiting for the
          needle to drop
        </p>
        <p className="text-xs text-muted-foreground mt-4">
          Create your first collection to get started
        </p>
        <Button
          className="cursor-pointer"
          variant="outline"
          onClick={() => setShowForm(true)}
        >
          Create collection
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-6">
      <AnimatePresence>
        {showForm && (
          <CreateCollectionPanel
            onCreated={handleCreated}
            onCancel={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>

      {collections.length > 0 && (
        <>
          {!showForm && (
            <Button
              className="cursor-pointer self-start"
              variant="outline"
              onClick={() => setShowForm(true)}
            >
              Create collection
            </Button>
          )}
        </>
      )}

      <motion.div
        className="flex flex-col gap-4 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {collections.map((collection) => (
          <div key={collection.id} className="rounded-lg border p-4">
            <h2 className="font-medium">{collection.name}</h2>

            <p className="text-xs text-muted-foreground mt-2">
              {collection.albums.length}{" "}
              {collection.albums.length === 1 ? "album" : "albums"}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
