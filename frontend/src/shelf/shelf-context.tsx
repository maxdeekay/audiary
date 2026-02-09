import { useState, useEffect, useCallback } from "react";
import { type Collection, CollectionContext } from "./collection-types";
import { get } from "@/api/client";

export function CollectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await get<Collection[]>("/api/collections");
      setCollections(data);
      setHasFetched(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasFetched) {
      refresh();
    }
  }, [hasFetched, refresh]);

  return (
    <CollectionContext.Provider value={{ collections, isLoading, refresh }}>
      {children}
    </CollectionContext.Provider>
  );
}
