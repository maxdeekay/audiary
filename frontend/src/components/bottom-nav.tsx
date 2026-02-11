import { Link, useLocation } from "react-router-dom";
import { House, Search, Swords, LibraryBig } from "lucide-react";

const links = [
  { to: "/", icon: House, label: "Home" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/shelf", icon: LibraryBig, label: "Shelf" },
  { to: "/challenges", icon: Swords, label: "Challenges" },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 border-t bg-background"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex justify-around mt-2 h-16">
        {links.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center ${pathname == to ? "text-primary" : "text-muted-foreground"}`}
            aria-label={label}
          >
            <Icon className="size-7" />
            <p className="text-sm">{label}</p>
          </Link>
        ))}
      </div>
    </nav>
  );
}
