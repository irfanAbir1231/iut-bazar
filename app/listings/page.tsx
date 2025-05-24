"use client";
import { useState } from "react";
import ListingCard from "../components/ListingCard";

const demoListings = [
  // Items
  {
    id: 1,
    title: "Used Laptop",
    price: 25000,
    condition: "Good",
    university: "IUT",
    imageUrl: "https://via.placeholder.com/300x160.png?text=Laptop",
    category: "Electronics",
  },
  {
    id: 2,
    title: "Mountain Bike",
    price: 12000,
    condition: "Fair",
    university: "DU",
    imageUrl: "https://via.placeholder.com/300x160.png?text=Bike",
    category: "Vehicles",
  },
  {
    id: 3,
    title: "Desk Chair",
    price: 2000,
    condition: "Good",
    university: "IUT",
    imageUrl: "https://via.placeholder.com/300x160.png?text=Chair",
    category: "Furniture",
  },
  // Services
  {
    id: 4,
    title: "Math Tutoring",
    price: "500/hr",
    condition: "N/A",
    university: "BRACU",
    imageUrl: "https://via.placeholder.com/300x160.png?text=Tutoring",
    category: "Service",
  },
  {
    id: 5,
    title: "Laundry Service",
    price: "150/hr",
    condition: "N/A",
    university: "IUT",
    imageUrl: "https://via.placeholder.com/300x160.png?text=Laundry",
    category: "Service",
  },
  {
    id: 6,
    title: "Food Delivery",
    price: "100/hr",
    condition: "N/A",
    university: "DU",
    imageUrl: "https://via.placeholder.com/300x160.png?text=Delivery",
    category: "Service",
  },
  {
    id: 7,
    title: "Car Wash",
    price: "250/hr",
    condition: "N/A",
    university: "IUT",
    imageUrl: "https://via.placeholder.com/300x160.png?text=Car+Wash",
    category: "Service",
  },
  {
    id: 8,
    title: "Home Cooking",
    price: "300/hr",
    condition: "N/A",
    university: "BRACU",
    imageUrl: "https://via.placeholder.com/300x160.png?text=Cooking",
    category: "Service",
  },
];

const categories = ["All", "Electronics", "Service", "Vehicles"];
const conditions = ["All", "New", "Good", "Fair", "N/A"];
const universities = ["All", "IUT", "BRACU", "DU"];

const SearchBar = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (v: string) => void;
}) => (
  <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="w-full p-2 border rounded mb-4"
    placeholder="Search listings..."
  />
);

export default function ListingsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [condition, setCondition] = useState("All");
  const [university, setUniversity] = useState("All");

  const filtered = demoListings.filter((l) => {
    const matchesQuery = l.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || l.category === category;
    const matchesCondition = condition === "All" || l.condition === condition;
    const matchesUniversity =
      university === "All" || l.university === university;
    return (
      matchesQuery && matchesCategory && matchesCondition && matchesUniversity
    );
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <SearchBar query={query} setQuery={setQuery} />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="p-2 border rounded"
        >
          {conditions.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          className="p-2 border rounded"
        >
          {universities.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((listing) => (
          <ListingCard key={listing.id} {...listing} />
        ))}
      </div>
    </div>
  );
}
