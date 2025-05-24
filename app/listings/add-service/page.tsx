"use client";
import { useState } from "react";
import "../../globals.css"; // Assuming the homepage styles are in globals.css

export default function CreateServicePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [usedTime, setUsedTime] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [pricingMode, setPricingMode] = useState("fixed");
  const [condition, setCondition] = useState("good");
  const [category, setCategory] = useState("Electronics");
  const [visibility, setVisibility] = useState("university");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !location || !usedTime || !actualPrice) {
      setError("All fields are required");
      return;
    }
    setError("");
    alert("Service submitted! (frontend only)");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Add Service</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg text-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
            placeholder="Title"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
            rows={3}
            required
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-blue-500"
            placeholder="Location (e.g., IUT Hall, CSE Building)"
            required
          />
          <input
            type="number"
            value={usedTime}
            onChange={(e) => setUsedTime(e.target.value)}
            className="w-full p-3 border rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-blue-500"
            placeholder="Used Time (in years)"
            min="0"
            required
          />
          <input
            type="number"
            value={actualPrice}
            onChange={(e) => setActualPrice(e.target.value)}
            className="w-full p-3 border rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-blue-500"
            placeholder="Actual Price"
            min="0"
            required
          />
          <select
            value={pricingMode}
            onChange={(e) => setPricingMode(e.target.value)}
            className="w-full p-3 border rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="fixed">Fixed</option>
            <option value="bidding">Bidding</option>
            <option value="hourly">Hourly</option>
          </select>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full p-3 border rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="new">New</option>
            <option value="like new">Like New</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Books">Books</option>
            <option value="Clothing">Clothing</option>
            <option value="Other">Other</option>
          </select>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="w-full p-3 border rounded-lg text-base text-gray-900 focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="university">University</option>
            <option value="global">Global</option>
          </select>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            Post Service
          </button>
        </form>
      </div>
    </div>
  );
}
