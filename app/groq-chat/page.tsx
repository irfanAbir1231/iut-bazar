"use client";
import React, { useState } from "react";

export default function GroqChatPage() {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful assistant." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    const newMessages = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(newMessages);
    setInput("");
    try {
      const res = await fetch("/api/groq-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (res.ok && data.choices && data.choices[0]?.message?.content) {
        setMessages([
          ...newMessages,
          { role: "assistant", content: data.choices[0].message.content },
        ]);
      } else {
        setError(data.error || "Failed to get response");
      }
    } catch {
      setError("Failed to connect to Groq API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Groq Chat (Llama 3)</h2>
      <div className="h-64 overflow-y-auto bg-gray-50 rounded p-2 mb-4">
        {messages
          .filter((m) => m.role !== "system")
          .map((m, i) => (
            <div
              key={i}
              className={`mb-2 p-2 rounded text-sm ${
                m.role === "user"
                  ? "bg-blue-100 text-right ml-10"
                  : "bg-green-100 text-left mr-10"
              }`}
            >
              <span className="block whitespace-pre-line">{m.content}</span>
            </div>
          ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading || !input.trim()}
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}
