"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-6 text-gold">Sign In</h1>

      <input
        className="w-full p-3 bg-white/10 rounded mb-4"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full p-3 bg-white/10 rounded mb-4"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={login}
        className="w-full p-3 bg-gold text-black rounded font-bold"
      >
        Login
      </button>

      <p className="mt-4 text-center text-sm">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-gold underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
