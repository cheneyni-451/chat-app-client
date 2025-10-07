import { type ReactElement } from "react";
import { Navigate } from "react-router";
import { useAuth } from "./auth/useAuth";

export default function RequireAuth({ children }: { children: ReactElement }) {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" />;
  }
  return children;
}
