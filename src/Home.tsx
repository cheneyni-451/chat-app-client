import { useAuth } from "./auth/useAuth";

export default function Home() {
  const auth = useAuth();

  return <div>{auth.user?.name}</div>;
}
