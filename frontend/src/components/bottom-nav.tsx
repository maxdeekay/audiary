import { Link, useLocation } from "react-router-dom";
import HomeIcon from "./ui/home-icon";
import UserIcon from "./ui/user-icon";
import VinylIcon from "./ui/vinyl-icon";
import FlameIcon from "./ui/flame-icon";

const links = [
  { to: "/", icon: HomeIcon, label: "Home" },
  { to: "/shelf", icon: VinylIcon, label: "Shelf" },
  { to: "/challenges", icon: FlameIcon, label: "Challenges" },
  { to: "/profile", icon: UserIcon, label: "Profile" },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <div className="flex justify-around mt-2 h-22">
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
