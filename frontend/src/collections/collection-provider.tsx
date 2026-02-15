import { useState, useEffect, useCallback } from "react";
import { getCollections } from "@/api/collections";
import { CollectionContext } from "./types";
import type { CollectionSummary } from "./types";

export function CollectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collections, setCollections] = useState<CollectionSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getCollections();
      setCollections(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <CollectionContext.Provider value={{ collections, isLoading, refresh }}>
      {children}
    </CollectionContext.Provider>
  );
}
