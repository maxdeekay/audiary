import { useContext } from "react";
import { CollectionContext } from "./collection-types";

export function useCollections() {
  const context = useContext(CollectionContext);
  if (!context)
    throw new Error("useCollections must be used within CollectionProvider");
  return context;
}
