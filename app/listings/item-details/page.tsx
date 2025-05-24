"use client";
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Image as ImageIcon, X } from "lucide-react";

// Demo listing data (replace with real fetch in production)
const demoListing = {
  id: 1,
  title: "MacBook Pro M2 14-inch",
  price: 85000,
  condition: "Like New",
  university: "BUET",
  imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
  category: "Electronics",
  rating: 4.9,
  seller: "Ahmed Hassan",
};

export default function MeetupPage() {
  const [chatOpen, setChatOpen] = useState(false);
  interface Message {
    text: string;
    sender: string;
    image?: string;
  }

  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi, is this still available?", sender: "me" },
    { text: "Yes, it is!", sender: "seller" },
    { text: "Can you do a little discount?", sender: "me" },
    { text: "Let's chat!", sender: "seller" },
  ]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatOpen, messages]);

  const handleSend = () => {
    if (!input.trim() && !image) return;
    setMessages((msgs) => [
      ...msgs,
      { text: input, image: image ?? undefined, sender: "me" },
    ]);
    setInput("");
    setImage(null);
    // Simulate seller reply
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { text: "(Seller reply demo)", sender: "seller" },
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
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={demoListing.imageUrl}
            alt={demoListing.title}
            className="w-full md:w-64 h-48 object-cover rounded-xl border"
          />
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-black">{demoListing.title}</h1>
              <div className="text-xl text-black font-semibold mb-2">৳{demoListing.price.toLocaleString()}</div>
              <div className="text-black mb-1">Condition: {demoListing.condition}</div>
              <div className="text-black mb-1">University: {demoListing.university}</div>
              <div className="text-black mb-1">Seller: {demoListing.seller}</div>
              <div className="text-black mb-1">Category: {demoListing.category}</div>
            </div>
            <button
              className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg flex items-center gap-2 shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all"
              onClick={() => setChatOpen(true)}
            >
              <MessageCircle size={20} />
              Message Seller
            </button>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              onClick={() => setChatOpen(false)}
            >
              <X size={24} />
            </button>
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
              <h3 className="font-semibold text-black">Chat with {demoListing.seller}</h3>
              <p className="text-xs text-black">Product: {demoListing.title}</p>
            </div>
            <div ref={chatRef} className="p-4 space-y-3 max-h-96 overflow-y-auto flex-1 bg-gradient-to-br from-gray-50 to-white">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg p-3 text-sm max-w-[80%] break-words ${
                    msg.sender === "me"
                      ? "bg-blue-500 text-white ml-auto shadow-md"
                      : "bg-gray-100 text-black mr-auto shadow"
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
                    <ImageIcon size={20} className="text-black" color="black" />
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
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-black"
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
      )}
      <div>
        Meetup page content here.
      </div>
    </div>
  );
}
