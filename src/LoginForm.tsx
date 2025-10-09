import { useState, type FormEvent } from "react";
import { login } from "./apis/userApis";
import { useAuth } from "./hooks/useAuth";
import { Button, Link, Paper, Stack, TextField } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(false);
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
      setFormError(true);
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
            error={formError}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            label="password"
            variant="outlined"
            error={formError}
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
          {/* surround Link with div to make link only take up length of text instead of entire width of parent */}
          <div>
            <Link
              component={RouterLink}
              to="/signup"
              color="primary"
              underline="hover"
              variant="subtitle1"
            >
              Create an account
            </Link>
          </div>
        </Stack>
      </form>
    </Paper>
  );
}
