"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProcessingPage() {
  const router = useRouter();

  const messages = [
    "Analyzing composition...",
    "Detecting patterns...",
    "Generating insights...",
    "Finalizing results...",
  ];

  const [step, setStep] = useState(0);

  useEffect(() => {
    const img = sessionStorage.getItem("uploadedImage");
  
    if (!img) {
      router.replace("/");
      return;
    }
  
    // Message animation (runs once)
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < messages.length) {
        setStep(current);
      }
    }, 1600);
  
    // ⏳ Controlled delay (6 sec max)
    const timeout = setTimeout(() => {
      router.replace("/result"); // 🔥 IMPORTANT: use replace
    }, 6000);
  
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []); // ❗ REMOVE router dependency

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center">

        {/* Icon */}
        <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-violet-500 text-white text-xl animate-pulse">
          ⚡
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800">
          Analyzing your image...
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 mt-2">
          Generating multiple perspectives using AI
        </p>

        {/* Dynamic Message */}
        <p className="mt-4 text-purple-600 font-medium">
          {messages[step]}
        </p>

        {/* Dots */}
        <div className="flex justify-center gap-1 mt-2">
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-150"></span>
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-300"></span>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          This may take a few seconds
        </p>
      </div>
    </div>
  );
}