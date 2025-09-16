import "./App.css";
import { useAuth } from "./auth/useAuth";
import Home from "./Home";
import LoginPage from "./LoginPage";

function App() {
  const auth = useAuth();
  return auth.user ? <Home /> : <LoginPage />;
}

export default App;
