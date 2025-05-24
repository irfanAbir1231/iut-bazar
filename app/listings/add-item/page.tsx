"use client";
import { useState } from "react";
import "../../globals.css"; // Assuming the homepage styles are in globals.css

const ListingForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [yearsUsed, setYearsUsed] = useState("1");
  const [actualPrice, setActualPrice] = useState("");
  const [suggestedPrice, setSuggestedPrice] = useState("");
  const [error, setError] = useState("");

  const getMaxPercent = () => {
    if (yearsUsed === "1") return 0.8;
    if (yearsUsed === "2") return 0.75;
    if (yearsUsed === "3") return 0.6;
    if (yearsUsed === "4") return 0.5;
    return 0.6;
  };

  const handleSuggestedPrice = () => {
    const price = parseFloat(actualPrice);
    if (isNaN(price) || price <= 0) {
      setError("Enter a valid actual price");
      return;
    }
    const percent = getMaxPercent();
    const maxSuggested = Math.floor(price * percent);
    if (suggestedPrice && parseFloat(suggestedPrice) <= maxSuggested) {
      // User's value is already valid, do not change
      setError("");
      return;
    }
    setSuggestedPrice(maxSuggested.toString());
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call
    alert("Listing submitted!");
  };

  const maxSuggested = actualPrice
    ? Math.floor(parseFloat(actualPrice) * getMaxPercent())
    : undefined;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Add Product</h1>
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
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Year(s) of Use
              </label>
              <select
                value={yearsUsed}
                onChange={(e) => setYearsUsed(e.target.value)}
                className="w-full p-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">3+ (more than 3 years)</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Actual Price (৳)
              </label>
              <input
                type="number"
                value={actualPrice}
                onChange={(e) => setActualPrice(e.target.value)}
                className="w-full p-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
                min="1"
                required
              />
            </div>
          </div>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Suggested Price (৳)
              </label>
              <input
                type="number"
                value={suggestedPrice}
                onChange={(e) => setSuggestedPrice(e.target.value)}
                className="w-full p-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
                min="1"
                required
                max={maxSuggested}
              />
              {maxSuggested && (
                <div className="text-xs text-gray-500 mt-1">
                  Max allowed: ৳{maxSuggested}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleSuggestedPrice}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition focus:ring-2 focus:ring-green-500"
            >
              Suggest
            </button>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <input
            type="file"
            accept="image/*"
            className="w-full p-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            Post Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default function NewListingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      {/* <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 mb-8"> */}
        {/* <h1 className="text-3xl font-bold mb-6 text-gray-900">Add Product</h1> */}
        <ListingForm />
      {/* </div> */}
    </div>
  );
}
