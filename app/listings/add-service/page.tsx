"use client";
import { useState } from "react";

const SERVICE_TYPES = [
  "Vehicle Service",
  "Tutoring Service",
  "Laundry Service",
  "Delivery Service",
  "Cooking Service",
];

export default function CreateServicePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [location, setLocation] = useState("");
  const [hours, setHours] = useState("");
  const [charge, setCharge] = useState("");
  const [serviceType, setServiceType] = useState(SERVICE_TYPES[0]);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !title ||
      !description ||
      !location ||
      !hours ||
      !charge ||
      !serviceType
    ) {
      setError("All fields are required");
      return;
    }
    setError("");
    alert("Service submitted! (frontend only)");
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Add Service</h1>
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
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 border rounded-lg text-base"
          placeholder="Location (e.g., IUT Hall, CSE Building)"
          required
        />
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="w-full p-3 border rounded-lg text-base"
          placeholder="Hours (e.g., 2, 5, 10)"
          min="1"
          required
        />
        <input
          type="number"
          value={charge}
          onChange={(e) => setCharge(e.target.value)}
          className="w-full p-3 border rounded-lg text-base"
          placeholder="Offered Service Charge (per hour)"
          min="0"
          required
        />
        <select
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className="w-full p-3 border rounded-lg text-base"
          required
        >
          {SERVICE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Post Service
        </button>
      </form>
    </div>
  );
}
