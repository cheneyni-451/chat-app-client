import { createContext, use, useEffect, useState, type ReactNode } from "react";
import type { User } from "../models/userModels";
import { useLocalStorage } from "./useLocalStorage";

type UserDetails = Omit<User, "token">;

interface AuthContextProps {
  user: UserDetails | null;
  login: (data: User) => void;
  logout: () => void;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [token, setToken] = useLocalStorage("token", "");

  useEffect(() => {
    if (token && !user) {
      loginWithToken(token).catch(console.error);
    }
  }, [user, token]);

  function getToken() {
    return token;
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

  function login(data: User) {
    const user: UserDetails = {
      id: data.id,
      name: data.name,
      email: data.email,
    };
    setUser(user);
    setToken(data.token);
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

export function useAuth() {
  const ctx = use(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return ctx;
}
