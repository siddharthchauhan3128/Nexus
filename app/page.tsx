"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProtectedRoute from "@/components/Protectedroute";

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    resource: "",
    quantity: 0,
    location: "",
    urgency: "",
    suggestion: "",
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const lowerInput = input.toLowerCase();

    let resource = "food";

    if (lowerInput.includes("blanket")) {
      resource = "blankets";
    } else if (lowerInput.includes("water")) {
      resource = "water";
    } else if (lowerInput.includes("medicine")) {
      resource = "medicine";
    }

    const mockResponse = {
      resource,
      quantity: 10,
      location: "nearby area",
      urgency: "medium",
      suggestion:
        resource === "blankets"
          ? "Send blankets to shelter"
          : resource === "water"
          ? "Coordinate water distribution"
          : "Contact nearby NGO",
    };

    setData(mockResponse);
    setLoading(false);

  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getResourceIcon = (resource: string) => {
    switch (resource.toLowerCase()) {
      case "food":
        return "🍱";
      case "blankets":
        return "🧥";
      case "medicine":
        return "💊";
      case "water":
        return "💧";
      default:
        return "📦";
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center p-8">
      <h1 className="text-5xl font-bold text-blue-800 mb-10 text-center">
        Nexus: Smart Resource Bridge
      </h1>

      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-blue-100">
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full h-40 p-5 border border-gray-300 rounded-2xl mb-6 text-black text-lg outline-none focus:ring-4 focus:ring-blue-200 resize-none"
            placeholder="Describe what you have or need..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl text-white font-semibold text-lg transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Analyzing with AI..." : "Analyze with AI"}
          </button>
        </form>
      </div>

      {!data.resource && (
        <div className="mt-10 text-center text-gray-600 max-w-xl">
          <p className="text-lg">
            Describe available resources or urgent needs and let AI classify
            urgency, location, and recommended action.
          </p>
        </div>
      )}

      {data.resource && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8"
        >
          <div className="flex items-center gap-5 mb-8">
            <div className="text-5xl">
              {getResourceIcon(data.resource)}
            </div>

            <div>
              <h2 className="text-3xl font-bold capitalize text-blue-800">
                {data.resource}
              </h2>

              <p className="text-gray-500 text-sm">
                AI Classified Resource
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
            <div className="bg-blue-50 p-4 rounded-2xl">
              <p className="text-sm text-gray-500">Quantity</p>
              <p className="text-2xl font-bold">{data.quantity}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl">
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-xl font-semibold">{data.location}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl">
              <p className="text-sm text-gray-500 mb-2">Urgency</p>

              <span
                className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${getUrgencyColor(
                  data.urgency
                )}`}
              >
                {data.urgency}
              </span>
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl">
              <p className="text-sm text-gray-500">Suggested Action</p>
              <p className="text-lg font-medium">{data.suggestion}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
    </ProtectedRoute>
  );
}