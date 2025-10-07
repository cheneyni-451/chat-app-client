import type { User } from "../models/userModels";

const API_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;
const USER_API_ENDPOINT = `${API_ENDPOINT}/user`;

export async function login(
  email: string,
  password: string
): Promise<User | null> {
  const body = {
    email,
    password,
  };

  const response = await fetch(`${USER_API_ENDPOINT}/login`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return await response.json();
  }
  return null;
}

export async function signup(
  username: string,
  email: string,
  password: string
): Promise<Omit<User, "token"> | null> {
  const body = {
    name: username,
    email,
    password,
  };

  const response = await fetch(`${USER_API_ENDPOINT}/new`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return await response.json();
  }

  return null;
}
