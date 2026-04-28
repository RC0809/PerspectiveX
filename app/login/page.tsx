"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  // ✅ STATE (correct placement)
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!email || !password) return;

    // fake auth
    localStorage.setItem("user", email);

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200">

      {/* CARD */}
      <div className="w-[400px] bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/40">

        {/* LOGO */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-xl bg-purple-200 flex items-center justify-center mb-3">
            ✨
          </div>
          <h1 className="text-2xl font-bold text-purple-700">
            PerspectiveX
          </h1>
          <p className="text-sm text-gray-500">
            The Curator of Intelligence
          </p>
        </div>

        {/* ✅ TABS (FIXED + SPACING) */}
        <div className="flex gap-2 mb-6 bg-gray-100 rounded-lg p-1">

          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
              activeTab === "login"
                ? "bg-white shadow text-purple-700"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
              activeTab === "signup"
                ? "bg-white shadow text-purple-700"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Sign Up
          </button>

        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-xs text-gray-600">
            EMAIL ADDRESS
          </label>
          <input
            type="email"
            placeholder="name@company.com"
            className="w-full mt-1 p-3 rounded-lg bg-gray-100 text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600">
            <span>PASSWORD</span>
            {activeTab === "login" && (
              <span className="text-purple-600 cursor-pointer">
                Forgot password?
              </span>
            )}
          </div>

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full mt-1 p-3 rounded-lg bg-gray-100 text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* ✅ EXTRA FIELD FOR SIGNUP */}
        {activeTab === "signup" && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full mb-4 p-3 rounded-lg bg-gray-100 text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-300"
          />
        )}

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white py-3 rounded-lg shadow-lg hover:opacity-90 transition"
        >
          {activeTab === "login" ? "Sign In" : "Create Account"}
        </button>

        {/* DIVIDER */}
        <div className="text-center text-xs text-gray-400 my-4">
          OR CONTINUE WITH
        </div>

        {/* GOOGLE */}
        <button className="w-full border py-2 rounded-lg bg-white shadow-sm">
          Google
        </button>

        {/* FOOTER */}
        <p className="text-xs text-gray-400 text-center mt-4">
          By continuing, you agree to PerspectiveX's Terms of Service and Privacy Policy.
        </p>

      </div>

    </div>
  );
}