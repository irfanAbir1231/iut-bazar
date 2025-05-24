"use client";
import { useState } from "react";
import "../../globals.css";

const ListingForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [usedTime, setUsedTime] = useState("1");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("item");
  const [pricingMode, setPricingMode] = useState("fixed");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("good");
  const [visibility, setVisibility] = useState("university");
  const [university, setUniversity] = useState("IUT");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fileInput = (e.target as HTMLFormElement).querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const image = fileInput?.files?.[0];

    if (!image) {
      setError("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("usedTime", usedTime);
    formData.append("type", type);
    formData.append("pricingMode", pricingMode);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("visibility", visibility);
    formData.append("university", university);
    formData.append("images", image);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/listings/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.message || "Failed to post listing");
        return;
      }

      setSuccess("Listing posted successfully!");
      setError("");
      setTitle("");
      setDescription("");
      setLocation("");
      setUsedTime("1");
      setPrice("");
      setCategory("");
      fileInput.value = "";
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Add Listing</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg text-lg text-gray-900"
            placeholder="Title"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-lg text-base text-gray-900"
            placeholder="Description"
            rows={3}
            required
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border rounded-lg text-base text-gray-900"
            placeholder="Location (e.g., IUT Hall)"
            required
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 border rounded-lg text-gray-900"
            required
          >
            <option value="item">Item</option>
            <option value="service">Service</option>
          </select>
          <select
            value={pricingMode}
            onChange={(e) => setPricingMode(e.target.value)}
            className="w-full p-3 border rounded-lg text-gray-900"
            required
          >
            <option value="fixed">Fixed</option>
            <option value="bidding">Bidding</option>
            <option value="hourly">Hourly</option>
          </select>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full p-3 border rounded-lg text-gray-900"
          >
            <option value="new">New</option>
            <option value="like new">Like New</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border rounded-lg text-gray-900"
            placeholder="Category (e.g., Electronics, Books)"
            required
          />
          <div className="flex gap-4">
            <select
              value={usedTime}
              onChange={(e) => setUsedTime(e.target.value)}
              className="w-full p-3 border rounded-lg text-gray-900"
              required
            >
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3">3 Years</option>
              <option value="4">More than 3 Years</option>
            </select>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border rounded-lg text-gray-900"
              placeholder="Price (৳)"
              min="0"
              required
            />
          </div>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="w-full p-3 border rounded-lg text-gray-900"
          >
            <option value="university">University Only</option>
            <option value="global">Global</option>
          </select>
          <input
            type="text"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className="w-full p-3 border rounded-lg text-gray-900"
            placeholder="University"
            required
          />
          <input
            type="file"
            accept="image/*"
            className="w-full p-3 border rounded-lg text-gray-900"
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-500 text-sm">{success}</div>}
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
  return <ListingForm />;
}
