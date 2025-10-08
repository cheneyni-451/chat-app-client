import { useState, type FormEvent } from "react";
import { login } from "./apis/userApis";
import { useAuth } from "./auth/useAuth";
import { Button, Link, Paper, Stack, TextField } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

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

      navigate("/");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Paper sx={{ padding: "80px" }}>
      <form onSubmit={handleLoginFormSubmit}>
        <Stack spacing={2}>
          <TextField
            type="email"
            label="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            label="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Log In
          </Button>
          <Link component={RouterLink} to="/signup" color="primary">
            Create Account
          </Link>
        </Stack>
      </form>
    </Paper>
  );
}
