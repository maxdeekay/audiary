import { Outlet } from "react-router-dom";
import BottomNav from "./bottom-nav";
import { CollectionProvider } from "@/shelf/collection-provider";

export default function Layout() {
  return (
    <CollectionProvider>
      <div className="min-h-screen px-2 pb-20">
        <Outlet />
      </div>
      <BottomNav />
    </CollectionProvider>
  );
}
