import { Button, Link, Paper, Stack, TextField } from "@mui/material";
import { useState, type FormEvent } from "react";
import { signup } from "./apis/userApis";
import { useNavigate, Link as RouterLink } from "react-router";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  async function handleSignUpFormSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const newUser = await signup(username, email, password);
      if (!newUser) {
        setEmail("");
        setPassword("");
        setUsername("");
        throw new Error("failed to sign up");
      }
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Paper sx={{ padding: "80px" }}>
      <form onSubmit={handleSignUpFormSubmit}>
        <Stack spacing={2}>
          <TextField
            type="text"
            label="username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
            Create Account
          </Button>
          <div>
            <Link
              component={RouterLink}
              to="/login"
              color="primary"
              underline="hover"
              variant="subtitle1"
            >
              Already have an account
            </Link>
          </div>
        </Stack>
      </form>
    </Paper>
  );
}
