import { useState, type FormEvent } from "react";
import { login } from "./apis/userApis";
import { useAuth } from "./auth/useAuth";
import { Button, Grid, TextField } from "@mui/material";

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
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ height: "100%" }}
    >
      <form
        onSubmit={handleLoginFormSubmit}
        style={{
          padding: "5rem",
          backgroundColor: "#1e1e2e",
        }}
      >
        <Grid container spacing={2} direction={"column"}>
          <Grid>
            <TextField
              type="email"
              label="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid>
            <TextField
              type="password"
              label="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid>
            <Button type="submit" variant="contained" color="primary">
              Log In
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
