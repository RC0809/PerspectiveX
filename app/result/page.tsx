"use client";

import { useEffect, useMemo, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";

type Analysis = {
  technical: string;
  social: string;
  environmental: string;
  ethical: string;
};

type View = {
  label: string;
  type: "original" | "generated";
  src?: string;
  extra?: boolean; // 🔥 NEW
};

export default function ResultPage() {
  const [img, setImg] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState<View | null>(null);
  const [showAllViews, setShowAllViews] = useState(false); // 🔥 NEW

  const router = useRouter();

  const cards = useMemo(
    () => [
      { title: "Technical Perspective", key: "technical" as const },
      { title: "Social Perspective", key: "social" as const },
      { title: "Environmental Perspective", key: "environmental" as const },
      { title: "Ethical Perspective", key: "ethical" as const },
    ],
    []
  );

  // LOAD IMAGE
  useEffect(() => {
    const stored = sessionStorage.getItem("uploadedImage");

    if (!stored) {
      router.push("/");
      return;
    }

    setImg(stored);
  }, [router]);

  // FAKE AI
  useEffect(() => {
    if (!img) return;
  
    const fakeResult: Analysis = {
      technical:
        "The chair features a stable base with balanced proportions and ergonomic structure.",
      social:
        "Suitable for home and office usage, offering comfort and usability.",
      environmental:
        "Designed for indoor use with durable materials.",
      ethical:
        "No ethical concerns observed. Meets standard safety practices.",
    };
  
    setAnalysis(fakeResult);
    setLoading(false);
  }, [img]);

  // DOWNLOAD
  const downloadReport = () => {
    if (!img) return;

    const doc = new jsPDF("p", "mm", "a4");

    doc.text("PerspectiveX Report", 20, 20);
    doc.addImage(img, "JPEG", 20, 30, 170, 100);

    doc.save("report.pdf");
  };

  // 🔥 UPDATED VIEWS (UI SAME)
  const views: View[] = [
    { label: "Front View", type: "original" },
    { label: "Front-Right View", type: "generated", src: "/views/front-right.jpg" },
    { label: "Right View", type: "generated", src: "/views/right.jpg" },
    { label: "Right-Rear View", type: "generated", src: "/views/right-rear.jpg" },
    { label: "Rear View", type: "generated", src: "/views/rear.jpg" },
    { label: "Top View", type: "generated", src: "/views/top.jpg" },

    // 🔥 EXTRA (hidden initially)
    { label: "Rear-Left View", type: "generated", src: "/views/left-rear.jpg", extra: true },
    { label: "Left View", type: "generated", src: "/views/left.jpg", extra: true },
    { label: "Front-Left View", type: "generated", src: "/views/front-left.jpg", extra: true },
  ];

  // 🔥 FILTER LOGIC (NO UI CHANGE)
  const displayedViews = showAllViews
    ? views
    : views.filter((v) => !v.extra);

    if (!analysis) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 p-8 flex gap-8">

        {/* LEFT */}
        <div className="w-[70%] space-y-6">

          {/* IMAGE */}
          <div className="bg-white rounded-xl shadow-xl p-4 relative">
            <span className="absolute top-4 right-4 bg-purple-600 text-white px-4 py-1 rounded-full text-sm">
              AI ANALYZED
            </span>

            <div className="flex justify-center">
              {img && (
                <img
                  src={img}
                  className="max-w-[280px] max-h-[350px] object-contain rounded-xl"
                />
              )}
            </div>
          </div>

          {/* VIEWS */}
          <div className="bg-white rounded-xl shadow-xl p-5">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold text-lg text-purple-500">AI Generated Views</h3>
              <span className="text-xs text-purple-500">Multi-View</span>
            </div>

            {/* SAME GRID */}
            <div className="grid grid-cols-2 gap-5">
              {displayedViews.map((view, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-xl p-3 shadow-sm hover:shadow-lg transition cursor-pointer"
                  onClick={() => setSelectedView(view)}
                >
                  <img
                    src={
                      view.type === "original"
                        ? img || undefined
                        : view.src
                    }
                    className="w-full h-48 object-contain rounded-lg bg-gray-100"
                  />

                  <p className="text-sm mt-2 text-gray-600 text-center">
                    {view.label}
                  </p>

                  {view.type === "generated" && (
                    <p className="text-xs text-purple-500 text-center">
                      AI Generated
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* 🔥 BUTTON (ONLY ADDITION) */}
            <button
              onClick={() => setShowAllViews(!showAllViews)}
              className="mt-4 text-purple-600 text-sm font-medium"
            >
              {showAllViews ? "Show Less" : "Show Full 360° Views"}
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-[30%] space-y-5">

          {cards.map((c, i) => (
            <div
              key={c.title}
              className="bg-white rounded-2xl shadow-sm p-5 flex gap-4 items-start border border-gray-100"
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-lg">
                {i === 0 && "⚙️"}
                {i === 1 && "👥"}
                {i === 2 && "🌿"}
                {i === 3 && "⚖️"}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {c.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {analysis[c.key]}
                </p>
              </div>
            </div>
          ))}

          <button
            onClick={downloadReport}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white py-3 rounded-xl"
          >
            Download Report
          </button>
          <button
  onClick={() => {
    sessionStorage.removeItem("uploadedImage");
    router.push("/dashboard");
  }}
  className="w-full bg-white border border-purple-500 text-purple-600 py-3 rounded-xl mt-3 hover:bg-purple-50 transition font-medium"
>
  New Analysis
</button>
        </div>

      </div>

      {/* MODAL */}
      {selectedView && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center"
          onClick={() => setSelectedView(null)}
        >
          <img
            src={
              selectedView.type === "original"
                ? img || undefined
                : selectedView.src
            }
            className="max-w-[90%] max-h-[90%]"
          />
        </div>
      )}
    </div>
  );
}