'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";

export default function ForgotPassword() {
  const router = useRouter();

  const [gmail, setGmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [user, setUser] = useState<any>(null);

  const handleFindUser = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find((u: any) => u.gmail === gmail);

    if (!found) {
      alert("User not found!");
      return;
    }

    setUser(found);
    setSecurityQuestion(found.securityQuestion);
  };

  const handleReset = () => {
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (securityAnswer !== user.securityAnswer) {
      alert("Incorrect security answer!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: any) => {
      if (u.gmail === gmail) {
        return {
          ...u,
          password: bcrypt.hashSync(newPassword, 8),
        };
      }
      return u;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert("Password has been reset!");
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-10 space-y-6 border border-white/30 transition-all">
        <h1 className="text-3xl font-bold text-white text-center">Forgot Password</h1>

        {!user ? (
          <>
            <input
              type="email"
              placeholder="Enter your Gmail"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60 transition"
            />
            <button
              onClick={handleFindUser}
              className="w-full py-3 bg-white/30 hover:bg-white/40 text-white font-semibold rounded-xl transition shadow-md backdrop-blur-md"
            >
              Find My Account
            </button>
          </>
        ) : (
          <>
            <p className="text-white/80 text-sm">Security Question:</p>
            <div className="w-full p-3 rounded-xl bg-white/20 text-white border border-white/30">
              {securityQuestion}
            </div>

            <input
              type="text"
              placeholder="Your Answer"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60 transition"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60 transition"
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60 transition"
            />

            <button
              onClick={handleReset}
              className="w-full py-3 bg-white/30 hover:bg-white/40 text-white font-semibold rounded-xl transition shadow-md backdrop-blur-md"
            >
              Reset Password
            </button>
          </>
        )}

        <div className="text-center text-white/70 text-sm mt-4">
          <a href="/login" className="underline hover:text-white">Back to Login</a>
        </div>
      </div>
    </div>
  );
}
