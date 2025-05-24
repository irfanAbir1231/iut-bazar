"use client";
import React, { useState, useRef, useEffect } from "react";
import { Image as ImageIcon, X, UserCircle } from "lucide-react";

// Demo data: list of buyers and their chats
const buyers = [
  {
    id: 1,
    name: "Fatima Khan",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    lastMessage: "Can you do a little discount?",
    messages: [
      { text: "Hi, is this still available?", sender: "buyer" } as const,
      { text: "Yes, it is!", sender: "seller" } as const,
      { text: "Can you do a little discount?", sender: "buyer" } as const,
      { text: "Let's chat!", sender: "seller" } as const,
    ],
  },
  {
    id: 2,
    name: "Rafiq Ahmed",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    lastMessage: "Is the charger included?",
    messages: [
      { text: "Is the charger included?", sender: "buyer" } as const,
      { text: "Yes, full box.", sender: "seller" } as const,
    ],
  },
  {
    id: 3,
    name: "Nadia Islam",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    lastMessage: "Can I pick up from campus?",
    messages: [
      { text: "Can I pick up from campus?", sender: "buyer" } as const,
      { text: "Yes, sure!", sender: "seller" } as const,
    ],
  },
];

const demoListing = {
  id: 1,
  title: "MacBook Pro M2 14-inch",
  price: 85000,
  condition: "Like New",
  university: "BUET",
  imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
  category: "Electronics",
  rating: 4.9,
  seller: "You (Seller)",
};

interface Message {
  text: string;
  sender: "buyer" | "seller";
  image?: string;
}

export default function SellerItemDetailsPage() {
  const [selectedBuyer, setSelectedBuyer] = useState(buyers[0]);
  const [messages, setMessages] = useState<Message[]>(selectedBuyer.messages);
  const [input, setInput] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(selectedBuyer.messages);
  }, [selectedBuyer]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() && !image) return;
    setMessages((msgs) => [
      ...msgs,
      { text: input, image: image ?? undefined, sender: "seller" },
    ]);
    setInput("");
    setImage(null);
    // Simulate buyer reply
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { text: "(Buyer reply demo)", sender: "buyer" },
      ]);
    }, 1000);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 mb-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar: Buyers List */}
        <div className="w-full md:w-72 border-r border-gray-100 pr-6 mb-8 md:mb-0">
          <h2 className="text-lg font-bold mb-4">Interested Buyers</h2>
          <div className="space-y-2">
            {buyers.map((buyer) => (
              <div
                key={buyer.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-blue-50 ${selectedBuyer.id === buyer.id ? "bg-blue-100" : ""}`}
                onClick={() => setSelectedBuyer(buyer)}
              >
                {buyer.avatar ? (
                  <img src={buyer.avatar} alt={buyer.name} className="w-10 h-10 rounded-full object-cover border" />
                ) : (
                  <UserCircle className="w-10 h-10 text-gray-400" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{buyer.name}</div>
                  <div className="text-xs text-gray-500 truncate">{buyer.lastMessage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Main: Listing Details & Chat */}
        <div className="flex-1 flex flex-col">
          <div className="flex gap-6 mb-6 items-center">
            <img
              src={demoListing.imageUrl}
              alt={demoListing.title}
              className="w-32 h-24 object-cover rounded-xl border"
            />
            <div>
              <h1 className="text-2xl font-bold mb-1">{demoListing.title}</h1>
              <div className="text-lg text-blue-600 font-semibold mb-1">৳{demoListing.price.toLocaleString()}</div>
              <div className="text-gray-600 text-sm mb-1">Condition: {demoListing.condition}</div>
              <div className="text-gray-600 text-sm mb-1">University: {demoListing.university}</div>
              <div className="text-gray-600 text-sm mb-1">Category: {demoListing.category}</div>
            </div>
          </div>
          {/* Chat Box */}
          <div className="flex-1 flex flex-col bg-gray-50 rounded-2xl border border-gray-100">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
              <h3 className="font-semibold text-gray-900">Chat with {selectedBuyer.name}</h3>
              <p className="text-xs text-gray-600">Product: {demoListing.title}</p>
            </div>
            <div ref={chatRef} className="p-4 space-y-3 max-h-96 overflow-y-auto flex-1 bg-gradient-to-br from-gray-50 to-white">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg p-3 text-sm max-w-[80%] break-words ${
                    msg.sender === "seller"
                      ? "bg-blue-500 text-white ml-auto shadow-md"
                      : "bg-gray-100 text-gray-900 mr-auto shadow"
                  }`}
                >
                  {msg.text && <div>{msg.text}</div>}
                  {msg.image && (
                    <img src={msg.image} alt="sent" className="mt-2 max-h-32 rounded border" />
                  )}
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-b-2xl">
              <div className="flex gap-2 items-center">
                <label className="cursor-pointer flex items-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFile}
                  />
                  <span className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all">
                    <ImageIcon size={20} />
                  </span>
                </label>
                {image && (
                  <div className="relative">
                    <img src={image} alt="preview" className="h-10 w-10 object-cover rounded" />
                    <button
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1 text-gray-500 hover:text-red-500"
                      onClick={() => setImage(null)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
                />
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={handleSend}
                  disabled={!input.trim() && !image}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
