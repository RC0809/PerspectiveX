"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Current Analysis", path: "/result" },
  { label: "History", path: "/history" },
  { label: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 flex-col gap-6 border-r border-zinc-200 bg-white px-5 py-6 shadow-md md:flex">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-purple-600 text-white font-semibold">
          PX
        </div>
        <div>
          <div className="font-bold text-purple-600">PerspectiveX</div>
          <div className="text-xs text-gray-500">AI workspace</div>
        </div>
      </div>

      <nav className="space-y-1">
        {menu.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex justify-between px-4 py-2 rounded-lg text-sm ${
                isActive
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.label}
              <span>›</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}