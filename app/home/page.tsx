'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const user = sessionStorage.getItem("currentUser");
    if (!user) {
      router.push("/login");
    } else {
      const parsed = JSON.parse(user);
      setUsername(parsed.username);
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem("currentUser");
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Welcome {username}</h1>
      <button onClick={logout} className="bg-red-500 text-white p-2 rounded">
        Logout
      </button>
    </div>
  );
}
