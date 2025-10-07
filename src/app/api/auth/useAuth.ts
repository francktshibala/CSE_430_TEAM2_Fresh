// app/hooks/useAuth.ts
import { useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  name: string;
  accountType: string;
}

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  console.log("Checking authentication...");
  fetch("/api/auth/profile")
    .then((res) => {
      console.log("Response status:", res.status);
      if (!res.ok) throw new Error("Not authenticated");
      return res.json();
    })
    .then((data) => {
      console.log("User data:", data);
      setUser(data.user);
    })
    .catch((err) => {
      console.log("Auth error:", err);
      setUser(null);
    })
    .finally(() => setLoading(false));
}, []);

  return { user, loading };
}
