"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "Dashboard", path: "/" },
  { label: "Upload Image", path: "/processing" },
  { label: "Current Analysis", path: "/result" },
  { label: "History", path: "/history" },
  { label: "Settings", path: "/settings" },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 flex-col gap-6 border-r border-zinc-200 bg-white px-5 py-6 shadow-md md:flex">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-purple-600 text-sm font-semibold text-white shadow-md">
          PX
        </div>
        <div className="leading-tight">
          <div className="text-base font-extrabold tracking-tight text-transparent bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text">
            PerspectiveX
          </div>
          <div className="text-xs text-zinc-500">AI workspace</div>
        </div>
      </div>

      <nav className="space-y-1">
        {menu.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={[
                "flex items-center justify-between rounded-lg px-4 py-2 text-sm transition",
                isActive
                  ? "bg-purple-100 text-purple-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100",
              ].join(" ")}
            >
              <span>{item.label}</span>
              <span className="text-xs text-zinc-400">›</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-purple-200 bg-purple-50 p-4 shadow-sm">
        <div className="text-xs font-semibold text-purple-800">Tip</div>
        <div className="mt-1 text-xs leading-5 text-purple-700/80">
          Upload an image, then step through processing to view insights.
        </div>
      </div>
    </aside>
  );
}

