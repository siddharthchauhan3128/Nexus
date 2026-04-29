"use client";

import { useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      if (result.user) {
        router.push("/");
      }
    } catch (error: any) {
      console.error("Login Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

   const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      router.push("/");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">

    <form className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6 border border-blue-100">

  <div className="text-center">
      <h2 className="text-3xl font-bold text-blue-700">
        LogIn to Nexus
      </h2>
      <p className="text-gray-500 mt-2">
        Login to access Nexus Dashboard
      </p>
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Email Address
      </label>

      <input
        type="email"
        value={email}
         onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 text-black"
      />
    </div>

    {/* Password */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Password
      </label>

      <input
        type="password"
        value={password}
         onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 text-black"
      />
    </div>

    {/* Role Dropdown
    <div> 
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Select Role
      </label>

      <select
        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 text-black"
      >
        <option>Select your role</option>
        <option value="ngo">NGO</option>
        <option value="volunteer">Volunteer</option>
        <option value="donor">Donor</option>
        <option value="community">Community Member</option>
      </select>
    </div> */}

    {/* Login Button */}
    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold transition-all duration-300"
    >
      Continue
    </button>

    {/* Divider */}
    <div className="flex items-center gap-4">
      <div className="flex-1 h-[1px] bg-gray-300"></div>
      <span className="text-gray-400 text-sm">OR</span>
      <div className="flex-1 h-[1px] bg-gray-300"></div>
    </div>

    {/* Google Login */}
    <button
      type="button" onClick={handleGoogleLogin}
      className="w-full border border-gray-300 py-3 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
        className="w-5 h-5"
        alt="Google"
      />

      <span className="font-medium text-gray-700">
        Continue with Google
      </span>
    </button>

  </form>
    </div>
  );
}