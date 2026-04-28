"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login"); // or "/login"
    }, 2000); // ⏱ adjust timing here

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">

      {/* IMAGE */}
      <img
        src="/splash.png"
        alt="PerspectiveX Splash"
        className="w-full h-full object-cover"
      />

    </div>
  );
}