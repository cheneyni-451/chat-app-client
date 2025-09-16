import type { User } from "../models/user.models";

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
