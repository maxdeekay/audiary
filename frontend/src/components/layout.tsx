import { Outlet } from "react-router-dom";
import BottomNav from "./bottom-nav";
import { CollectionProvider } from "@/shelf/shelf-context";

export default function Layout() {
  return (
    <CollectionProvider>
      <div className="min-h-screen px-2 pb-22">
        <Outlet />
      </div>
      <BottomNav />
    </CollectionProvider>
  );
}
