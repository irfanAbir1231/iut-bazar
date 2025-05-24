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
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlygWcz51gyDexlstejSgZZ2LSxqF4rBz3wQ&s?text=Laptop",
    category: "Electronics",
  },
  {
    id: 2,
    title: "Mountain Bike",
    price: 12000,
    condition: "Fair",
    university: "DU",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlygWcz51gyDexlstejSgZZ2LSxqF4rBz3wQ&s?text=Bike",
    category: "Vehicles",
  },
  {
    id: 3,
    title: "Desk Chair",
    price: 2000,
    condition: "Good",
    university: "IUT",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlygWcz51gyDexlstejSgZZ2LSxqF4rBz3wQ&s?text=Chair",
    category: "Furniture",
  },
  // Services
  {
    id: 4,
    title: "Math Tutoring",
    price: "500/hr",
    condition: "N/A",
    university: "BRACU",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlygWcz51gyDexlstejSgZZ2LSxqF4rBz3wQ&s?text=Tutoring",
    category: "Service",
  },
  {
    id: 5,
    title: "Laundry Service",
    price: "150/hr",
    condition: "N/A",
    university: "IUT",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlygWcz51gyDexlstejSgZZ2LSxqF4rBz3wQ&s?text=Laundry",
    category: "Service",
  },
  {
    id: 6,
    title: "Food Delivery",
    price: "100/hr",
    condition: "N/A",
    university: "DU",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlygWcz51gyDexlstejSgZZ2LSxqF4rBz3wQ&s?text=Delivery",
    category: "Service",
  },
  {
    id: 7,
    title: "Car Wash",
    price: "250/hr",
    condition: "N/A",
    university: "IUT",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlygWcz51gyDexlstejSgZZ2LSxqF4rBz3wQ&s?text=Car+Wash",
    category: "Service",
  },
  {
    id: 8,
    title: "Home Cooking",
    price: "300/hr",
    condition: "N/A",
    university: "BRACU",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlygWcz51gyDexlstejSgZZ2LSxqF4rBz3wQ&s?text=Cooking",
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
    className="w-full p-3 border rounded-xl text-gray-900 bg-white/30 backdrop-blur-md focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out border-gray-200/50 hover:border-blue-300/50"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-10">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6 p-6 bg-white/30 backdrop-blur-md rounded-3xl shadow-lg border border-white/20">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchBar query={query} setQuery={setQuery} />
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full sm:w-auto p-3 border rounded-xl bg-white/30 backdrop-blur-md text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out border-gray-200/50 hover:border-blue-300/50"
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full sm:w-auto p-3 border rounded-xl bg-white/30 backdrop-blur-md text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out border-gray-200/50 hover:border-blue-300/50"
              >
                {conditions.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full sm:w-auto p-3 border rounded-xl bg-white/30 backdrop-blur-md text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out border-gray-200/50 hover:border-blue-300/50"
              >
                {universities.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((listing) => (
            <div
              key={listing.id}
              className="bg-white/30 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 duration-300 ease-in-out text-gray-900 border border-white/20 overflow-hidden hover:bg-white/40"
            >
              <ListingCard
                id={listing.id}
                title={listing.title}
                price={listing.price}
                condition={listing.condition}
                university={listing.university}
                imageUrl={listing.imageUrl}
                category={listing.category}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
