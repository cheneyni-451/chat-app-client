import "./styles/App.css";
import { useAuth } from "./auth/useAuth";
import Home from "./Home";
import LoginPage from "./LoginPage";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const auth = useAuth();
  return (
    <ThemeProvider theme={darkTheme}>
      <Container
        sx={{
          height: "100%",
          width: "100%",
          backgroundColor: "#1e1e2e",
        }}
      >
        {auth.user ? <Home /> : <LoginPage />}
      </Container>
    </ThemeProvider>
  );
}

export default App;
