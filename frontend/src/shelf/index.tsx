import { useCollections } from "./use-collections";

export default function Shelf() {
  const { collections, isLoading, refresh } = useCollections();

  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-[calc(100vh-5.5rem)]">
      <p className="text-center">
        every record on the shelf is a tiny time machine, waiting for the needle
        to drop
      </p>
      <p className="text-xs text-muted-foreground mt-4">COMING SOON</p>
    </div>
  );
}
