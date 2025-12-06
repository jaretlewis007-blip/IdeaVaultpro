"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { db } from "@/firebase/config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Save to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        role: "creator",
        createdAt: serverTimestamp(),
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Sign-up failed:", error);
      alert(error.message);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center text-white">
      <h1 className="text-3xl mb-4 font-bold">Sign Up</h1>

      <form onSubmit={handleSignUp} className="flex flex-col space-y-3 w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded bg-gray-800 border border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded bg-gray-800 border border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-yellow-500 py-2 rounded font-bold hover:bg-yellow-600"
        >
          Create Account
        </button>
      </form>

      <p className="mt-3 text-gray-300">
        Already have an account?{" "}
        <a href="/signin" className="text-yellow-400 underline">Sign in</a>
      </p>
    </div>
  );
}
