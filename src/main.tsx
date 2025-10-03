import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { AuthProvider } from "./auth/authContext.tsx";
import { io } from "socket.io-client";

export const socket = io("ws://localhost:3000", {
  ackTimeout: 10000,
  retries: 3,
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
