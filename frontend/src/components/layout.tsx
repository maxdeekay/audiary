import { Outlet } from "react-router-dom";
import Header from "./header";
import BottomNav from "./bottom-nav";
import { CollectionProvider } from "@/shelf/collection-provider";

export default function Layout() {
  return (
    <CollectionProvider>
      <Header />
      <div
        className="min-h-screen px-2"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 5rem)" }}
      >
        <Outlet />
      </div>
      <BottomNav />
    </CollectionProvider>
  );
}
