"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("visited");

    if (hasVisited) {
      router.replace("/dashboard");
      return;
    }

    sessionStorage.setItem("visited", "true");

    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <img
        src="/splash.png"
        alt="PerspectiveX Splash"
        className="w-full h-full object-cover"
      />
    </div>
  );
}