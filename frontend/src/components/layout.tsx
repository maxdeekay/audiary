import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./header";
import BottomNav from "./bottom-nav";
import { CollectionProvider } from "@/collections/collection-provider";

export default function Layout() {
  return (
    <CollectionProvider>
      <div className="flex flex-col h-dvh app-shell">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden px-2">
          <Outlet />
        </main>
      </div>
      <BottomNav />
      <Toaster position="top-center" />
    </CollectionProvider>
  );
}
