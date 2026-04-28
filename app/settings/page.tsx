"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");

  const [name, setName] = useState("Alexander Mitchell");
  const [email, setEmail] = useState("alexander.m@perspectivex.ai");
  const [bio, setBio] = useState(
    "Digital curator and AI research analyst. Focused on visual data patterns."
  );

  const [darkMode, setDarkMode] = useState(false);
  const [aiGlow, setAiGlow] = useState(true);
  const [language, setLanguage] = useState("English (US)");

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <div className="flex-1 p-8">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600 mb-6">
          Manage your account preferences and security protocols.
        </p>

        <div className="flex gap-6">

          {/* LEFT MENU */}
          <div className="w-64 space-y-3">
            {[
              { key: "account", label: "Account Info" },
              { key: "security", label: "Security" },
              { key: "preferences", label: "Preferences" },
              { key: "notifications", label: "Notifications" },
            ].map((item) => (
              <div
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`p-3 rounded-xl cursor-pointer transition ${
                  activeTab === item.key
                    ? "bg-purple-100 text-purple-700 font-medium"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex-1 space-y-6">

            {/* ACCOUNT */}
            {activeTab === "account" && (
              <div className="bg-white p-6 rounded-2xl shadow-sm">

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      User Info
                    </h2>
                    <p className="text-sm text-gray-500">
                      Update your personal details
                    </p>
                  </div>

                  <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-lg">
                    👤
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-3 rounded-lg border border-gray-300 text-gray-800 focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 rounded-lg border border-gray-300 text-gray-800 focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-4 w-full p-3 rounded-lg border border-gray-300 text-gray-800 focus:ring-2 focus:ring-purple-500"
                  rows={3}
                />
              </div>
            )}

            {/* SECURITY */}
            {activeTab === "security" && (
              <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">

                <h2 className="text-lg font-semibold text-gray-900">
                  Security
                </h2>

                <div className="p-4 rounded-lg bg-gray-50 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">
                      Change Password
                    </p>
                    <p className="text-sm text-gray-500">
                      Last updated 4 months ago
                    </p>
                  </div>
                  <button className="text-purple-700 font-medium hover:underline">
                    Update
                  </button>
                </div>

                <div className="p-4 rounded-lg bg-gray-50 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm text-gray-500">
                      Recommended for security
                    </p>
                  </div>
                  <button className="text-purple-700 font-medium hover:underline">
                    Enable
                  </button>
                </div>
              </div>
            )}

            {/* PREFERENCES */}
            {activeTab === "preferences" && (
              <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">

                <h2 className="text-lg font-semibold text-gray-900">
                  Preferences
                </h2>

                {/* DARK MODE */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">Dark Mode</p>
                    <p className="text-sm text-gray-500">
                      Switch interface theme
                    </p>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 ${
                      darkMode ? "bg-purple-600" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full transition ${
                        darkMode ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* AI GLOW */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">
                      AI Processing Glow
                    </p>
                    <p className="text-sm text-gray-500">
                      Show animation during analysis
                    </p>
                  </div>
                  <button
                    onClick={() => setAiGlow(!aiGlow)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 ${
                      aiGlow ? "bg-purple-600" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full transition ${
                        aiGlow ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* LANGUAGE */}
                <div>
                  <p className="font-medium text-gray-800 mb-2">
                    Interface Language
                  </p>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                  >
                    <option>English (US)</option>
                    <option>Hindi</option>
                    <option>Spanish</option>
                  </select>
                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-4">
              <button className="text-gray-600 hover:text-gray-800">
                Cancel Changes
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-6 py-2 rounded-lg font-medium shadow hover:opacity-90 transition">
                Save All Changes
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}