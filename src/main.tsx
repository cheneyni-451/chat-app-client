import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { AuthProvider } from "./auth/authContext.tsx";
import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_SOCKET_IO_URL, {
  ackTimeout: 10000,
  retries: 3,
  path: import.meta.env.VITE_SOCKET_IO_PATH,
});

socket.on("connect", () => {
  console.log("WebSocket connected");
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
