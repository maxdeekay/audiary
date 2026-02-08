import { Outlet } from "react-router-dom";
import BottomNav from "./bottom-nav";

export default function Layout() {
  return (
    <div className="min-h-screen px-2 pb-16">
      <Outlet />
      <BottomNav />
    </div>
  );
}
