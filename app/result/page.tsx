"use client";

import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultsPage() {
  const router = useRouter();

  const [img, setImg] = useState<string | null>(null);
  const [selectedView, setSelectedView] = useState<any>(null);
  const [showAllViews, setShowAllViews] = useState(false);

  useEffect(() => {
    const storedImg = sessionStorage.getItem("uploadedImage");

    if (!storedImg) {
      router.replace("/dashboard");
    } else {
      setImg(storedImg);
    }
  }, [router]);

  // ✅ Views (your images)
  const views = [
    { label: "Front", src: "/views/front.jpg" },
    { label: "Left", src: "/views/left.jpg" },
    { label: "Right", src: "/views/right.jpg" },
    { label: "Rear", src: "/views/rear.jpg" },
    { label: "Top", src: "/views/top.jpg" },
    { label: "Front Left", src: "/views/front-left.jpg" },
    { label: "Front Right", src: "/views/front-right.jpg" },
    { label: "Left Rear", src: "/views/left-rear.jpg" },
    { label: "Right Rear", src: "/views/right-rear.jpg" },
  ];

  const displayedViews = showAllViews ? views : views.slice(0, 4);

  // ✅ Dummy analysis
  const analysis = {
    design: "Modern ergonomic structure",
    users: "Office & home users",
    eco: "Eco-friendly materials",
    safety: "Stable & durable build",
  };

  const cards = [
    { title: "Design Analysis", key: "design" },
    { title: "Target Users", key: "users" },
    { title: "Sustainability", key: "eco" },
    { title: "Safety", key: "safety" },
  ];

  // ✅ FIXED DOWNLOAD
  const downloadReport = () => {
    const content = `
PerspectiveX Report

Image Analysis:
- Design: ${analysis.design}
- Users: ${analysis.users}
- Sustainability: ${analysis.eco}
- Safety: ${analysis.safety}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "PerspectiveX_Report.txt";
    a.click();
  };

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
              <h3 className="font-semibold text-lg text-purple-500">
                AI Generated Views
              </h3>
              <span className="text-xs text-purple-500">Multi-View</span>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {displayedViews.map((view, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-xl p-3 shadow-sm hover:shadow-lg transition cursor-pointer"
                  onClick={() => setSelectedView(view)}
                >
                  <img
                    src={view.src}
                    className="w-full h-48 object-contain rounded-lg bg-gray-100"
                  />

                  <p className="text-sm mt-2 text-gray-600 text-center">
                    {view.label}
                  </p>

                  <p className="text-xs text-purple-500 text-center">
                    AI Generated
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAllViews(!showAllViews)}
              className="mt-4 text-purple-600 text-sm font-medium"
            >
              {showAllViews ? "Show Less" : "Show Full 360° Views"}
            </button>
          </div>
        </div>

        {/* RIGHT */}
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
                  {analysis[c.key as keyof typeof analysis]}
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
            src={selectedView.src}
            className="max-w-[90%] max-h-[90%]"
          />
        </div>
      )}
    </div>
  );
}