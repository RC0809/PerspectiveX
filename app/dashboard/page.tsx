"use client";

import { useEffect, useState, useId, useRef } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";


export default function Home() {
  const router = useRouter();
  
  // ✅ ADD THIS BLOCK (VERY IMPORTANT)

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/login");
    }
  }, []);
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  

  function setFile(file: File | null) {
    if (image?.startsWith("blob:")) {
      URL.revokeObjectURL(image);
    }


    if (!file) {
      setImage(null);
      setFileName(null);
      sessionStorage.removeItem("uploadedImage");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    
    setFileName(file.name);

    const reader = new FileReader();

    reader.onloadend = () => {
    const base64 = reader.result as string;

    setImage(base64);
    
    // ✅ store BASE64, not object URL
    sessionStorage.setItem("uploadedImage", base64);
    
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="min-h-dvh bg-gray-50 text-zinc-900">
      <div className="flex min-h-dvh">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-4 sm:px-6">
              <div className="md:hidden">
                <div className="flex items-center gap-2">
                  <div className="grid size-9 place-items-center rounded-xl bg-purple-600 text-xs font-semibold text-white shadow-md">
                    PX
                  </div>
                  <div className="text-sm font-extrabold tracking-tight text-transparent bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text">
                    PerspectiveX
                  </div>
                </div>
              </div>

              <div className="flex flex-1 items-center">
                <div className="relative w-full max-w-xl">
                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
                    <span className="text-sm">⌕</span>
                  </div>
                  <input
                    type="search"
                    placeholder="Search projects, presets, or history…"
                    className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-9 text-sm text-zinc-900 shadow-md outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-600/10"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="hidden rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-md transition hover:bg-zinc-50 sm:inline-flex"
                >
                  Upgrade
                </button>
                <button
                onClick={() => {
                  localStorage.removeItem("user");
                  router.push("/login");
                }}
                className="rounded-xl bg-red-500 px-3 py-2 text-sm font-medium text-white shadow-md hover:bg-red-600 transition"
              >
                Logout
              </button>
                <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-3 py-2 shadow-md">
                  <div className="grid size-8 place-items-center rounded-xl bg-purple-100 text-xs font-semibold text-purple-700">
                    RS
                  </div>
                  <div className="hidden leading-tight sm:block">
                    <div className="text-sm font-semibold">Ray</div>
                    <div className="text-xs text-zinc-500">Pro</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="mx-auto flex w-full max-w-6xl flex-1 gap-6 px-4 py-8 sm:px-6">
            <section className="min-w-0 flex-1">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md sm:p-8">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    New Perspective Analysis
                  </h1>
                  <p className="text-sm leading-6 text-zinc-500">
                    Upload an image and apply a preset to generate a fresh visual
                    perspective.
                  </p>
                </div>

                <div className="mt-8">
                  <input
                   id={inputId}
                   ref={fileRef}
                   type="file"
                   accept="image/*"
                   className="hidden"
                   onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />

                  <div
                    className={[
                      "group relative overflow-hidden rounded-2xl border-2 border-dashed bg-zinc-50 p-8 shadow-sm transition",
                      isDragging
                        ? "border-purple-500 ring-4 ring-purple-600/10"
                        : "border-purple-300 hover:border-purple-500",
                    ].join(" ")}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDragging(true);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDragging(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDragging(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDragging(false);
                      const file = e.dataTransfer.files?.[0] ?? null;
                      setFile(file);
                    }}
                  >
                    <div className="mx-auto flex max-w-md flex-col items-center text-center">
                      <div className="grid size-12 place-items-center rounded-2xl bg-white text-zinc-700 shadow-sm ring-1 ring-zinc-200">
                        <span className="text-lg">⬆</span>
                      </div>
                      <div className="mt-4 text-sm font-semibold text-zinc-900">
                        Drag & drop your image here
                      </div>
                      <div className="mt-1 text-sm text-zinc-500">
                        {fileName ? (
                          <>
                            Selected{" "}
                            <span className="font-medium text-zinc-700">
                              {fileName}
                            </span>
                          </>
                        ) : (
                          "PNG, JPG, GIF, WebP up to ~10MB"
                        )}
                      </div>

                      <div className="mt-5 flex items-center gap-3">
                        <label
                          htmlFor={inputId}
                          className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 px-4 py-2.5 text-sm font-medium text-white shadow-md transition hover:from-purple-700 hover:to-violet-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-600/20"
                        >
                          Choose File
                        </label>
                        {image ? (
                          <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-md transition hover:bg-zinc-50"
                            onClick={() => setFile(null)}
                          >
                            Clear
                          </button>
                        ) : null}
                      </div>
                    </div>

                    {image ? (
                      <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-md">
                        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
                          <div className="text-xs font-semibold text-zinc-700">
                            Preview
                          </div>
                          <div className="text-xs text-zinc-500">Ready</div>
                        </div>
                        <div className="p-4">
                          <img
                            src={image}
                            alt={
                              fileName
                                ? `Preview of ${fileName}`
                                : "Uploaded image preview"
                            }
                            className="h-auto w-full rounded-xl object-contain"
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:from-purple-700 hover:to-violet-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-600/20 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={!image}
                    onClick={() => {
                      if (!image) return;
                      sessionStorage.setItem("uploadedImage", image);
                      router.push("/processing");
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </section>

            <aside className="hidden w-80 shrink-0 lg:block">
              <div className="sticky top-[88px] space-y-4">
                <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-purple-700">
                      Analysis Presets
                    </div>
                    <button
                      type="button"
                      className="text-xs font-medium text-zinc-500 transition hover:text-zinc-700"
                    >
                      View all
                    </button>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      {
                        title: "Hyper-Realistic Render",
                        desc: "Crisp lighting, high fidelity textures.",
                      },
                      {
                        title: "Architectural Geometry",
                        desc: "Clean lines, precise structure emphasis.",
                      },
                      {
                        title: "Abstract Distortion",
                        desc: "Experimental forms with surreal motion.",
                      },
                    ].map((p) => (
                      <button
                        key={p.title}
                        type="button"
                        className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-left shadow-md transition hover:-translate-y-0.5 hover:border-purple-200 hover:bg-purple-50/40 hover:shadow-md"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 grid size-8 place-items-center rounded-xl bg-purple-100 text-purple-700 shadow-sm">
                            <span className="text-xs">✦</span>
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-zinc-900">
                              {p.title}
                            </div>
                            <div className="mt-1 text-xs leading-5 text-zinc-500">
                              {p.desc}
                            </div>
                          </div>
                        </div>
                        <div className="mt-1 text-xs leading-5 text-zinc-500">
                          {" "}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-md">
                  <div className="text-sm font-semibold text-zinc-900">
                    Output
                  </div>
                  <div className="mt-2 text-sm text-zinc-500">
                    Your analysis results will appear here once generated.
                  </div>
                  <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-xs text-zinc-500">
                    Queue: 0 jobs
                  </div>
                </div>
              </div>
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
}
