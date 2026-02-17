import { useLocation, useNavigate } from "react-router-dom";
import { User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const pageTitles: Record<string, string> = {
  "/": "Home",
  "/search": "Search",
  "/collections": "Collections",
  "/challenges": "Challenges",
  "/profile": "Profile",
};

export default function Header() {
  const location = useLocation();
  const title =
    pageTitles[location.pathname] ??
    (location.pathname.startsWith("/collections") ? "Collections" : "");
  const navigate = useNavigate();

  return (
    <header
      className="sticky top-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center bg-background border-b px-2 pb-2"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.5rem)" }}
    >
      <div className="justify-self-start h-9">
        {location.pathname.split("/").filter(Boolean).length > 1 && (
          <Button
            className="cursor-pointer"
            size="icon"
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="size-4" />
          </Button>
        )}
      </div>
      <h1 className="text-lg font-semibold">{title}</h1>
      <button
        className="cursor-pointer justify-self-end"
        onClick={() => navigate("/profile")}
      >
        <User
          className={
            location.pathname === "/profile"
              ? "text-primary"
              : "text-muted-foreground"
          }
        />
      </button>
    </header>
  );
}
