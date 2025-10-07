import { Container, useTheme } from "@mui/material";
import { Outlet } from "react-router";

function App() {
  const theme = useTheme();

  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh",
        width: "100vw",
        padding: "2rem",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Outlet />
    </Container>
  );
}

export default App;
