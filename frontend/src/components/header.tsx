import { useLocation, useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/": "Home",
  "/search": "Search",
  "/shelf": "Shelf",
  "/challenges": "Challenges",
  "/profile": "Profile",
};

export default function Header() {
  const location = useLocation();
  const title = pageTitles[location.pathname] ?? "";
  const navigate = useNavigate();

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between bg-background border-b px-4 pb-3 pt-3"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)" }}
    >
      <h1 className="text-lg font-semibold">{title}</h1>
      {location.pathname !== "/profile" && (
        <button className="cursor-pointer" onClick={() => navigate("/profile")}>
          <User />
        </button>
      )}
    </header>
  );
}
