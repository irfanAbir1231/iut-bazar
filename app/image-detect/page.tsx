"use client";
import React, { useState } from "react";

export default function ImageDetectPage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  type DetectionResult = {
    label: string;
    suggestedPrice: number;
    explanation: string;
  } | null;

  const [result, setResult] = useState<DetectionResult>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    setResult(null);
    setError("");
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");
    if (!image) {
      setError("Please select an image.");
      setLoading(false);
      return;
    }
    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];
        const res = await fetch("/api/image-detect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: base64 }),
        });
        const data = await res.json();
        if (res.ok) setResult(data);
        else setError(data.error || "Detection failed");
        setLoading(false);
      };
      reader.readAsDataURL(image);
    } catch {
      setError("Failed to process image.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">AI Image Price Advisor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" accept="image/*" onChange={handleFile} />
        {preview && (
          <img src={preview} alt="preview" className="h-40 w-auto rounded" />
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Detecting..." : "Detect & Suggest Price"}
        </button>
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {result && (
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <div className="font-bold">Detected: {result.label}</div>
          <div className="text-blue-600 font-semibold">
            Suggested Price: ${result.suggestedPrice}
          </div>
          <div className="text-gray-600 text-sm mt-2">{result.explanation}</div>
        </div>
      )}
    </div>
  );
}
