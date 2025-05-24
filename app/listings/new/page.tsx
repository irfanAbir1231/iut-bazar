"use client";
import { useState } from "react";

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
  const [type, setType] = useState("item");
  const [pricing, setPricing] = useState("fixed");
  const [visibility, setVisibility] = useState("university");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [photos, setPhotos] = useState<FileList | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to backend for new listing
    alert("Listing submitted!");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-zinc-900 rounded-md mt-10 shadow-lg border border-zinc-200 dark:border-zinc-700">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="item">Item</option>
          <option value="service">Service</option>
        </select>
        <select
          value={pricing}
          onChange={(e) => setPricing(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="fixed">Fixed Price</option>
          <option value="bidding">Bidding</option>
          <option value="hourly">Hourly Rate</option>
        </select>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="university">University Only</option>
          <option value="all">All Students</option>
        </select>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Description"
          rows={3}
          required
        />
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Condition (e.g., New, Good, Fair)"
          required={type === "item"}
          disabled={type === "service"}
        />
        <PriceAdvisor type={type} condition={condition} />
        <input
          type="file"
          multiple
          onChange={(e) => setPhotos(e.target.files)}
          className="w-full"
          accept="image/*"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
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
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Create New Listing
      </h1>
      <ListingForm />
    </div>
  );
}
