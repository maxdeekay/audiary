import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./header";
import BottomNav from "./bottom-nav";
import { CollectionProvider } from "@/collections/collection-provider";

export default function Layout() {
  return (
    <CollectionProvider>
      <div className="flex flex-col h-dvh">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden px-2">
          <Outlet />
        </main>
        <BottomNav />
      </div>
      <Toaster
        position="top-center"
        style={{ top: "calc(env(safe-area-inset-top) + 3.5rem)" }}
        toastOptions={{
          classNames: {
            toast: "!bg-background !text-foreground !border !border-border",
            success: "!text-green-500 !border-green-500",
            error: "!text-red-500 !border-red-500",
          },
        }}
      />
    </CollectionProvider>
  );
}
