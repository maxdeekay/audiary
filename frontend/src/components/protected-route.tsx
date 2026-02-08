import { setAccessToken } from "@/api/client";
import { isAuthenticated, isTokenExpired } from "@/lib/auth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const expired = isTokenExpired();

  if (expired) {
    setAccessToken(null);
    return <Navigate to="/auth?expired=true" replace />;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
