"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

type HistoryItem = {
  image: string;
  date: string;
};

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(stored);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <div className="flex-1 p-8">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          History
        </h1>

        {/* EMPTY STATE */}
        {history.length === 0 ? (
          <div className="h-[60vh] flex items-center justify-center text-gray-500">
            No history yet. Upload an image to get started.
          </div>
        ) : (

          /* GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {history.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition"
              >
                {/* IMAGE */}
                <div className="h-40 flex items-center justify-center bg-gray-50 rounded-xl mb-4">
                  <img
                    src={item.image}
                    className="max-h-full object-contain rounded"
                  />
                </div>

                {/* DATE */}
                <p className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleString()}
                </p>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}