"use client";
import { useState } from "react";

const SUGGESTED_PRICE_LIMITS = [
  { years: 1, percent: 0.8 },
  { years: 2, percent: 0.75 },
  { years: 3, percent: 0.6 },
  { years: 4, percent: 0.5 },
];

const PriceAdvisor = ({
  type,
  condition,
}: {
  type: string;
  condition: string;
}) => {
  const suggestPrice = () => {
    let range = "";
    if (type === "item") {
      if (/new/i.test(condition)) range = "$80-$100";
      else if (/good/i.test(condition)) range = "$50-$70";
      else range = "$20-$40";
    } else if (type === "service") {
      range = "$10-$30/hr";
    } else {
      range = "N/A";
    }
    alert(`Suggested price: ${range}`);
  };
  return (
    <button
      type="button"
      onClick={suggestPrice}
      className="p-2 bg-green-500 text-white rounded mb-2"
    >
      Suggest Price
    </button>
  );
};

const ListingForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [yearsUsed, setYearsUsed] = useState("1");
  const [actualPrice, setActualPrice] = useState("");
  const [suggestedPrice, setSuggestedPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
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
    <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100 mt-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg text-lg"
          placeholder="Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded-lg text-base"
          placeholder="Description"
          rows={3}
          required
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 border rounded-lg text-base"
          placeholder="Location (e.g., IUT Hall, CSE Building)"
          required
        />
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium">
              Year(s) of Use
            </label>
            <select
              value={yearsUsed}
              onChange={(e) => setYearsUsed(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">3+ (more than 3 years)</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium">
              Actual Price (৳)
            </label>
            <input
              type="number"
              value={actualPrice}
              onChange={(e) => setActualPrice(e.target.value)}
              className="w-full p-2 border rounded-lg"
              min="1"
              required
            />
          </div>
        </div>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium">
              Suggested Price (৳)
            </label>
            <input
              type="number"
              value={suggestedPrice}
              onChange={(e) => setSuggestedPrice(e.target.value)}
              className="w-full p-2 border rounded-lg"
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
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Suggest
          </button>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full"
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Post Listing
        </button>
      </form>
    </div>
  );
};

export default function NewListingPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Add Product</h1>
      <ListingForm />
    </div>
  );
}
