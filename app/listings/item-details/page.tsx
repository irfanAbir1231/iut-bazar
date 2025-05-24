"use client";
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";

// Demo listing data (replace with real fetch in production)
const demoListing = {
  id: 1,
  title: "MacBook Pro M2 14-inch",
  description: "Apple M2, 16GB RAM, 512GB SSD. Used for university projects. No scratches, battery health 98%.",
  price: 95000, // Actual price
  suggestedPrice: 85000,
  condition: "Like New",
  university: "BUET",
  location: "Dhaka, Bangladesh",
  yearOfUse: 1,
  imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
  category: "Electronics",
  rating: 4.9,
  seller: "Ahmed Hassan",
};


export default function MeetupPage() {
  // Chat logic (unchanged)
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

  // Bidding logic
  const [bidAmount, setBidAmount] = useState<number | "">("");
  const [highestBid, setHighestBid] = useState<number>(demoListing.suggestedPrice);
  // const [bidding, setBidding] = useState(false); // Not used, remove to fix warning
  const [timer, setTimer] = useState<number>(60); // 1 minute
  const [timerActive, setTimerActive] = useState(false);
  const [bidStatus, setBidStatus] = useState<string>("");
  // Demo: user credits
  const [userCredits, setUserCredits] = useState<number>(100000000);

  const [winner, setWinner] = useState<string | null>(null);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0 && timerActive) {
      setBidStatus("Bidding ended. Highest bidder wins!");
      setTimerActive(false);
      setWinner("You"); // For demo, assume current user is winner
    }
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  const handleBid = () => {
    if (typeof bidAmount !== "number" || bidAmount < highestBid + 10) {
      setBidStatus(`Bid must be at least ${highestBid + 10} credits.`);
      return;
    }
    if (bidAmount > userCredits) {
      setBidStatus("You cannot bid more than your available credits.");
      return;
    }
    setHighestBid((prev) => {
      const newBid = (typeof bidAmount === "number" ? bidAmount : prev + 10);
      setUserCredits((c) => c - newBid);
      setBidStatus("Bid placed! Waiting for seller response or timer to end.");
      if (!timerActive) {
        setTimer(10);
        setTimerActive(true);
      }
      setBidAmount("");
      return newBid;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-8 items-start">
        {/* Product Details Left */}
        <div className="w-full md:w-[calc(60%-1rem)] bg-white rounded-2xl shadow-xl p-8 mb-8 self-start">
          <Image
            src={demoListing.imageUrl}
            alt={demoListing.title}
            width={400}
            height={192}
            className="w-full md:w-64 h-48 object-cover rounded-xl border mb-4"
            style={{ objectFit: "cover" }}
            priority
          />
          <h1 className="text-3xl font-bold mb-2">{demoListing.title}</h1>
          <div className="text-gray-700 mb-2">{demoListing.description}</div>
          <div className="text-gray-600 mb-1">Location: {demoListing.location}</div>
          <div className="text-gray-600 mb-1">Year(s) of Use: 
            <select className="ml-2 border rounded px-2 py-1" value={demoListing.yearOfUse} disabled>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>3+</option>
            </select>
          </div>
          <div className="text-gray-600 mb-1">Condition: {demoListing.condition}</div>
          <div className="text-gray-600 mb-1">University: {demoListing.university}</div>
          <div className="text-gray-600 mb-1">Seller: {demoListing.seller}</div>
          <div className="text-gray-600 mb-1">Category: {demoListing.category}</div>
          <div className="text-gray-600 mb-1">Actual Price: <span className="font-semibold">৳{demoListing.price.toLocaleString()}</span></div>
          <div className="text-gray-600 mb-1">Suggested Price: <span className="font-semibold">৳{demoListing.suggestedPrice.toLocaleString()}</span></div>
          <button
            className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg flex items-center gap-2 shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            onClick={() => setChatOpen(true)}
          >
            <MessageCircle size={20} />
            Message Seller
          </button>
        </div>
        {/* Bidding Section Right */}
        <div className="w-full md:w-[400px] bg-white rounded-2xl shadow-xl p-8 mb-8 self-start">
          <h2 className="text-2xl font-bold mb-4 text-purple-700">Bidding</h2>
          <div className="mb-2 text-gray-700">Current Highest Bid: <span className="font-semibold text-blue-600">{highestBid} credits</span></div>
          <div className="mb-2 text-gray-700">Suggested Price: <span className="font-semibold">{demoListing.suggestedPrice} credits</span></div>
          <div className="mb-2 text-gray-700">Your Credits: <span className="font-semibold">{userCredits} credits</span></div>
          {winner ? (
            <>
              <div className="mb-4 text-green-700 font-bold text-xl">SOLD</div>
              <div className="mb-2 text-gray-800 font-semibold">Winner: <span className="text-blue-700">{winner}</span></div>
            </>
          ) : (
            <>
              <div className="mb-2 text-gray-700">Minimum Next Bid: <span className="font-semibold">{highestBid + 10} credits</span></div>
              <div className="flex gap-2 items-center mb-4">
                <input
                  type="number"
                  min={highestBid + 10}
                  className="border rounded px-3 py-2 flex-1"
                  placeholder={`Enter bid (min ${highestBid + 10})`}
                  value={bidAmount}
                  onChange={e => setBidAmount(e.target.value === "" ? "" : Number(e.target.value))}
                  disabled={userCredits < 10 || timer === 0}
                />
                <button
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                  onClick={handleBid}
                  disabled={userCredits < 10 || timer === 0}
                >
                  Place Bid
                </button>
              </div>
              {timerActive && (
                <div className="mb-2 text-red-600 font-semibold">Time left: {timer}s</div>
              )}
              {bidStatus && (
                <div className="mb-2 text-purple-700 font-semibold">{bidStatus}</div>
              )}
              <div className="text-xs text-gray-500 mt-2">
                * You must have at least 10 credits to bid. First bid starts a 1-minute timer. If timer ends, highest bidder wins. If outbid, your credits are refunded.
              </div>
            </>
          )}
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
              <h3 className="font-semibold text-gray-900">Chat with {demoListing.seller}</h3>
              <p className="text-xs text-gray-600">Product: {demoListing.title}</p>
            </div>
            <div ref={chatRef} className="p-4 space-y-3 max-h-96 overflow-y-auto flex-1 bg-gradient-to-br from-gray-50 to-white">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg p-3 text-sm max-w-[80%] break-words ${
                    msg.sender === "me"
                      ? "bg-blue-500 text-white ml-auto shadow-md"
                      : "bg-gray-100 text-gray-900 mr-auto shadow"
                  }`}
                >
                  {msg.text && <div>{msg.text}</div>}
                  {msg.image && (
                    <Image src={msg.image} alt="sent" width={128} height={64} className="mt-2 max-h-32 rounded border" style={{ objectFit: "cover" }} />
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
                    <Image src={image} alt="preview" width={40} height={40} className="h-10 w-10 object-cover rounded" style={{ objectFit: "cover" }} />
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
      )}
    </div>
  );
}