import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./auth/authContext.tsx";
import { io } from "socket.io-client";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./LoginPage.tsx";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Home from "./Home.tsx";

export const socket = io(import.meta.env.VITE_SOCKET_IO_URL, {
  ackTimeout: 10000,
  retries: 3,
  path: import.meta.env.VITE_SOCKET_IO_PATH,
});

socket.on("connect", () => {
  console.log("WebSocket connected");
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="login" element={<LoginPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
