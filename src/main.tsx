import "./styles/style.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./hooks/useAuth.tsx";
import { io } from "socket.io-client";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginForm from "./LoginForm.tsx";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Home from "./Home.tsx";
import SignUpForm from "./SignUpForm.tsx";
import { catppuccinPalettes } from "./colors.ts";
import AuthLayout from "./AuthLayout.tsx";
import RequireAuth from "./RequireAuth.tsx";

export const socket = io(import.meta.env.VITE_SOCKET_IO_URL, {
  ackTimeout: 10000,
  retries: 3,
  path: import.meta.env.VITE_SOCKET_IO_PATH,
});

socket.on("connect", () => {
  console.log("WebSocket connected");
});

const mocha = catppuccinPalettes.mocha;

const darkTheme = createTheme({
  palette: {
    primary: {
      main: mocha.blue,
      contrastText: mocha.base,
    },
    secondary: {
      main: mocha.mauve,
      contrastText: mocha.base,
    },
    error: {
      main: mocha.red,
      contrastText: mocha.base,
    },
    warning: {
      main: mocha.yellow,
      contrastText: mocha.base,
    },
    info: {
      main: mocha.sky,
      contrastText: mocha.base,
    },
    success: {
      main: mocha.green,
      contrastText: mocha.base,
    },
    text: {
      primary: mocha.text,
      secondary: mocha.subtext0,
    },
    background: {
      default: mocha.base,
      paper: mocha.mantle,
    },
  },
  typography: {
    allVariants: {
      color: mocha.text,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: mocha.surface2,
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route element={<RequireAuth />}>
                <Route index element={<Home />} />
              </Route>
              <Route element={<AuthLayout />}>
                <Route path="signup" element={<SignUpForm />} />
                <Route path="login" element={<LoginForm />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
