'use client';
interface User {
  gmail: string;
  password: string;
  securityQuestion: string;
  securityAnswer: string;
}
import { useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";

export default function AuthForm({ type }: { type: "login" | "register" }) {
  const router = useRouter();

  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");

  const securityQuestions = [
    "What is your pet's name?",
    "What is your mother's maiden name?",
    "What was the name of your first school?",
    "What is your favorite color?",
    "What city were you born in?"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (type === "register") {
      if (!gmail.endsWith("@gmail.com")) {
        return alert("Please use a valid Gmail address.");
      }

      if (password !== confirmPassword) {
        return alert("Passwords do not match.");
      }

      if (!securityQuestion || !securityAnswer) {
        return alert("Please select a security question and provide an answer.");
      }

const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

const userExists = users.find((u) => u.gmail === gmail);  
    if (userExists) return alert("User already exists");

      const hashedPassword = bcrypt.hashSync(password, 8);

      users.push({
        gmail,
        password: hashedPassword,
        securityQuestion,
        securityAnswer
      });

      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful!");
      router.push("/login");
    } else {
      const user = users.find((u: any) => u.gmail === gmail);
      if (!user) return alert("User not found");

      const valid = bcrypt.compareSync(password, user.password);
      if (!valid) return alert("Invalid password");

      sessionStorage.setItem("currentUser", JSON.stringify(user));
      router.push("/home");
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-10 space-y-6 border border-white/30 transition-all"
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-sm">
            {type === "login" ? "Welcome Back" : "Join Us"}
          </h1>
          <p className="text-white/70 text-sm">
            {type === "login" ? "Login to your account" : "Create a new account"}
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Gmail Address"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60 transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60 transition"
            required
          />

          {type === "register" && (
            <>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60 transition"
                required
              />

              <select
                value={securityQuestion}
                onChange={(e) => setSecurityQuestion(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/20 text-black border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60 transition"
                required
              >
                <option value="">Select Security Question</option>
                {securityQuestions.map((q, idx) => (
                  <option key={idx} value={q}>{q}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Security Answer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60 transition"
                required
              />
            </>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-white/30 hover:bg-white/40 text-white font-semibold rounded-xl transition shadow-md backdrop-blur-md"
        >
          {type === "login" ? "Login" : "Register"}
        </button>

        <div className="text-center text-white/70 text-sm space-y-2">
          {type === "login" ? (
            <>
              <p>
                Don't have an account?{" "}
                <a href="/register" className="underline hover:text-white">
                  Register
                </a>
              </p>
              <p>
                <a href="/forgot-password" className="underline hover:text-white">
                  Forgot Password?
                </a>
              </p>
            </>
          ) : (
            <p>
              Already have an account?{" "}
              <a href="/login" className="underline hover:text-white">
                Login
              </a>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
