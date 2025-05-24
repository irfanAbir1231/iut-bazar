import { useState } from "react";

const MOCK_LISTINGS = [
  { title: "Laptop", price: 180 },
  { title: "Phone", price: 90 },
  { title: "Book", price: 10 },
  { title: "Laptop", price: 250 },
];

const Chatbot = () => {
  const [query, setQuery] = useState("");

  const handleQuery = () => {
    // Mock: filter laptops under $200
    if (/laptop.*under.*\$?([0-9]+)/i.test(query)) {
      const max = parseInt(query.match(/\$?([0-9]+)/)?.[1] || "0", 10);
      const filtered = MOCK_LISTINGS.filter(
        (l) => l.title.toLowerCase() === "laptop" && l.price <= max
      );
      alert(
        filtered.length
          ? `Found: ${filtered
              .map((l) => l.title + " ($" + l.price + ")")
              .join(", ")}`
          : "No matching listings."
      );
    } else {
      alert(`Searching for: ${query}`);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-md shadow-md z-50 w-80">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        placeholder="Ask about listings..."
      />
      <button
        onClick={handleQuery}
        className="p-2 bg-blue-500 text-white rounded w-full"
      >
        Ask
      </button>
    </div>
  );
};

export default Chatbot;
