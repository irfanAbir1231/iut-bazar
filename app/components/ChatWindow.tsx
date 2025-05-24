import React, { useEffect, useRef, useState } from "react";

interface Message {
  text?: string;
  image?: string; // base64
  sender: "me" | "them";
  timestamp: number;
}

const MOCK_MESSAGES: Message[] = [
  {
    text: "Hey, is this still available?",
    sender: "me",
    timestamp: Date.now() - 60000,
  },
  { text: "Yes, it is!", sender: "them", timestamp: Date.now() - 59000 },
];

const mockFetchMessages = (listingId: string): Promise<Message[]> => {
  // Simulate fetching new messages
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...MOCK_MESSAGES]);
    }, 300);
  });
};

const ChatWindow = ({ listingId }: { listingId: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Polling for new messages
  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      const msgs = await mockFetchMessages(listingId);
      if (mounted) setMessages(msgs);
    };
    fetch();
    const interval = setInterval(fetch, 2000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [listingId]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input && !image) return;
    setMessages((msgs) => [
      ...msgs,
      {
        text: input || undefined,
        image: image || undefined,
        sender: "me",
        timestamp: Date.now(),
      },
    ]);
    setInput("");
    setImage(null);
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
    <div className="h-96 flex flex-col bg-gray-100 rounded-md p-4">
      <div ref={chatRef} className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded mb-2 max-w-xs ${
              msg.sender === "me"
                ? "bg-blue-100 self-end"
                : "bg-white self-start"
            }`}
          >
            {msg.text && <div>{msg.text}</div>}
            {msg.image && (
              <img
                src={msg.image}
                alt="uploaded"
                className="mt-1 max-h-32 rounded border"
              />
            )}
            <div className="text-xs text-gray-400 mt-1 text-right">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          className="mb-0"
          onChange={handleFile}
        />
        {image && (
          <img
            src={image}
            alt="preview"
            className="h-8 w-8 object-cover rounded"
          />
        )}
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={handleSend}
          disabled={!input && !image}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
