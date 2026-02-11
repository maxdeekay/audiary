import { Outlet } from "react-router-dom";
import Header from "./header";
import BottomNav from "./bottom-nav";
import { CollectionProvider } from "@/shelf/collection-provider";

export default function Layout() {
  return (
    <CollectionProvider>
      <div
        className="flex flex-col h-dvh"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 4rem)" }}
      >
        <Header />
        <main className="flex-1 overflow-y-auto px-2">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </CollectionProvider>
  );
}
