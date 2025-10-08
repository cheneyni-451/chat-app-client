import { Navigate, Outlet } from "react-router";
import { useAuth } from "./hooks/useAuth";

export default function RequireAuth() {
  const auth = useAuth();

  return auth.getToken() ? <Outlet /> : <Navigate to="/login" />;
}
