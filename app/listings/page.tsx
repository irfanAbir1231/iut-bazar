"use client";
import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";

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
    className="w-full p-3 border rounded-xl text-black bg-white/30 backdrop-blur-md focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out border-gray-200/50 hover:border-blue-300/50 placeholder-black"
    placeholder="Search listings..."
  />
);

export default function ListingsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [condition, setCondition] = useState("All");
  const [university, setUniversity] = useState("All");

  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/listings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch listings");
        }
        const data = await res.json();
        setListings(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      }
    };

    fetchListings();
  }, []);

  const filtered = listings.filter((l: any) => {
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
    <div className="min-h-screen bg-gray-50 py-10 flex flex-col items-center">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-8 text-purple-600">
          All Listings
        </h1>
        <div className="mb-6 p-6 bg-white/30 backdrop-blur-md rounded-3xl shadow-lg border border-white/20">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchBar query={query} setQuery={setQuery} />
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full sm:w-auto p-3 border rounded-xl bg-white/30 backdrop-blur-md text-black focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out border-gray-200/50 hover:border-blue-300/50"
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full sm:w-auto p-3 border rounded-xl bg-white/30 backdrop-blur-md text-black focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out border-gray-200/50 hover:border-blue-300/50"
              >
                {conditions.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full sm:w-auto p-3 border rounded-xl bg-white/30 backdrop-blur-md text-black focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out border-gray-200/50 hover:border-blue-300/50"
              >
                {universities.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
          {filtered.map((listing: any) => (
            <div
              key={listing._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 duration-300 ease-in-out text-black border border-white/20 overflow-hidden hover:bg-white/40 text-black"
            >
              <ListingCard
                id={listing._id}
                title={listing.title}
                price={listing.price}
                condition={listing.condition}
                university={listing.university}
                imageUrl={listing.imageUrls?.[0] || "/default.png"}
                category={listing.category}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
