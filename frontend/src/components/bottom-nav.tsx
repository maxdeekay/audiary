import { Link, useLocation } from "react-router-dom";
import { House, Search, Swords, ListMusic } from "lucide-react";

const links = [
  { to: "/", icon: House, label: "Home" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/collections", icon: ListMusic, label: "Collections" },
  { to: "/challenges", icon: Swords, label: "Challenges" },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  function isActive(to: string) {
    if (to === "/") return pathname === "/";
    return pathname.startsWith(to);
  }

  return (
    <nav className="shrink-0 border-t bg-background pb-4">
      <div className="flex justify-around mt-2 h-14">
        {links.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center ${isActive(to) ? "text-primary" : "text-muted-foreground"}`}
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
