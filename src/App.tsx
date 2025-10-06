import { Container } from "@mui/material";
import { Outlet } from "react-router";

function App() {
  return (
    <Container
      maxWidth={false}
      sx={{ height: "100vh", width: "100vw", padding: "2rem" }}
    >
      <Outlet />
    </Container>
  );
}

export default App;
