import { createContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../models/user.models";

type UserDetails = Omit<User, "token">;

interface IAuthContext {
  user: UserDetails | null;
  login: (data: User) => void;
  logout: () => void;
  getToken: () => string | null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [token, setToken] = useState(localStorage.getItem("token") ?? "");

  function getToken() {
    return localStorage.getItem("token");
  }

  async function loginWithToken(token: string) {
    if (!token) {
      throw new Error("Token error");
    }

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/user/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const userDetails: User = await res.json();
    login({ ...userDetails, token });
  }

  useEffect(() => {
    if (token && !user) {
      loginWithToken(token).catch(console.error);
    }
  }, []);

  function login(data: User) {
    setUser({ id: data.id, name: data.name, email: data.name });
    setToken(data.token);
    localStorage.setItem("token", data.token);
  }

  function logout() {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext value={{ user, login, logout, getToken }}>
      {children}
    </AuthContext>
  );
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
