import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MarsGlyph } from "./CosmicPanel";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-offwhite">
        <MarsGlyph className="h-8 w-8 animate-spin text-bronze" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export function GuestRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-offwhite">
        <MarsGlyph className="h-8 w-8 animate-spin text-bronze" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/perfil" replace />;
  }

  return <Outlet />;
}

export function AdminRoute() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-offwhite">
        <MarsGlyph className="h-8 w-8 animate-spin text-bronze" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/perfil" replace />;
  }

  return <Outlet />;
}
