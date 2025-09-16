import { useState, type FormEvent } from "react";
import { login } from "./services/userService";
import { useAuth } from "./auth/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  async function handleLoginFormSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (!user) {
        throw new Error("failed to log in");
      }
      auth.login(user);

      setEmail("");
      setPassword("");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <form onSubmit={handleLoginFormSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
