"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Plus,
  User,
  GraduationCap,
  MapPin,
  MessageCircle,
  Star,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Heart,
  Share2,
  Filter,
  SortAsc,
  Bell,
  ShoppingCart,
  Zap,
  TrendingUp,
  Users,
  Award,
  Target,
  Sparkles,
  Globe,
  Shield,
  Clock,
  DollarSign,
  Laptop,
  Book,
  Car,
  Home,
  Shirt,
  Coffee,
} from "lucide-react";
import Sidebar from "./components/Sidebar";

// Types
type Listing = {
  id: number;
  title: string;
  price: number;
  condition: string;
  university: string;
  imageUrl: string;
  category: string;
  rating: number;
  seller: string;
  isNew?: boolean;
  discount?: number;
  timeLeft?: string;
};

// Mock data
const mockListings: Listing[] = [
  {
    id: 1,
    title: "MacBook Pro M2 14-inch",
    price: 85000,
    condition: "Like New",
    university: "BUET",
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    category: "Electronics",
    rating: 4.9,
    seller: "Ahmed Hassan",
    isNew: true,
    discount: 15,
  },
  {
    id: 2,
    title: "Calculus & Analytical Geometry",
    price: 1200,
    condition: "Good",
    university: "DU",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    category: "Books",
    rating: 4.5,
    seller: "Fatima Khan",
    timeLeft: "2d left",
  },
  {
    id: 3,
    title: "Gaming Setup Complete",
    price: 45000,
    condition: "Excellent",
    university: "NSU",
    imageUrl:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400",
    category: "Electronics",
    rating: 4.8,
    seller: "Rafiq Ahmed",
    discount: 20,
  },
  {
    id: 4,
    title: "Mountain Bike",
    price: 15000,
    condition: "Used",
    university: "BUET",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    category: "Sports",
    rating: 4.3,
    seller: "Sara Ali",
    isNew: true,
  },
  {
    id: 5,
    title: "iPhone 14 Pro",
    price: 95000,
    condition: "Like New",
    university: "IUB",
    imageUrl:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    category: "Electronics",
    rating: 4.9,
    seller: "Karim Uddin",
    discount: 10,
  },
  {
    id: 6,
    title: "Programming Books Bundle",
    price: 3500,
    condition: "Good",
    university: "AIUB",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    category: "Books",
    rating: 4.6,
    seller: "Nadia Islam",
  },
];

const categories = [
  { name: "Electronics", icon: Laptop, color: "blue" },
  { name: "Books", icon: Book, color: "green" },
  { name: "Transport", icon: Car, color: "red" },
  { name: "Housing", icon: Home, color: "purple" },
  { name: "Fashion", icon: Shirt, color: "pink" },
  { name: "Food", icon: Coffee, color: "orange" },
  { name: "Sports", icon: Target, color: "indigo" },
  { name: "Services", icon: Users, color: "teal" },
];

// Animated Counter Component
const AnimatedCounter = ({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          let start = 0;
          const startTime = Date.now();

          const updateCount = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const current = Math.floor(progress * end);
            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            }
          };

          updateCount();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, isVisible]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// Fade In Animation Component
const FadeInOnScroll = ({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const getTransform = () => {
    switch (direction) {
      case "up":
        return "translate-y-8";
      case "down":
        return "-translate-y-8";
      case "left":
        return "translate-x-8";
      case "right":
        return "-translate-x-8";
      default:
        return "translate-y-8";
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible
          ? "opacity-100 translate-y-0 translate-x-0"
          : `opacity-0 ${getTransform()}`
      }`}
    >
      {children}
    </div>
  );
};

// ChatGPT Style Navbar
const ChatGPTNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center space-x-3 transition-all duration-300 ${
                scrolled ? "transform scale-95" : ""
              }`}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <span
                className={`text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent transition-all ${
                  scrolled ? "text-gray-900" : "text-white drop-shadow-lg"
                }`}
              >
                StudMarket
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {loggedIn && (
              <>
                <NavLink scrolled={scrolled} href="#browse">
                  Browse
                </NavLink>
                <NavLink scrolled={scrolled} href="#sell">
                  Sell
                </NavLink>
                <div className="w-px h-6 bg-gray-300 mx-2"></div>
              </>
            )}

            {!loggedIn ? (
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                  Log in
                </button>
                <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all transform hover:scale-105">
                  Sign up
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <IconButton scrolled={scrolled} icon={Bell} />
                <IconButton scrolled={scrolled} icon={MessageCircle} />
                <button className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
                  <Plus size={16} />
                  <span>List Item</span>
                </button>
                <div className="relative">
                  <button className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium hover:scale-110 transition-transform">
                    A
                  </button>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                scrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-xl">
          <div className="px-4 py-6 space-y-4">
            <a
              href="#browse"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              Browse
            </a>
            <a
              href="#sell"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              Sell
            </a>
            <a
              href="#about"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </a>
            <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg">
              List Item
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({
  children,
  href,
  scrolled,
}: {
  children: React.ReactNode;
  href: string;
  scrolled: boolean;
}) => (
  <a
    href={href}
    className={`px-3 py-2 text-sm font-medium rounded-lg transition-all hover:bg-gray-100/50 ${
      scrolled
        ? "text-gray-700 hover:text-gray-900"
        : "text-white/90 hover:text-white hover:bg-white/10"
    }`}
  >
    {children}
  </a>
);

const IconButton = ({
  icon: Icon,
  scrolled,
}: {
  icon: any;
  scrolled: boolean;
}) => (
  <button
    className={`p-2 rounded-lg transition-all hover:scale-110 ${
      scrolled
        ? "text-gray-700 hover:bg-gray-100"
        : "text-white/90 hover:bg-white/10"
    }`}
  >
    <Icon size={20} />
  </button>
);

// Enhanced Listing Card
const ListingCard = ({ listing }: { listing: Listing }) => {
  const [liked, setLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] overflow-hidden border border-gray-100">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {listing.isNew && (
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
              NEW
            </span>
          )}
          {listing.discount && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
              -{listing.discount}%
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => setLiked(!liked)}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              liked
                ? "bg-red-500 text-white"
                : "bg-white/80 text-gray-700 hover:bg-white"
            }`}
          >
            <Heart size={16} fill={liked ? "currentColor" : "none"} />
          </button>
          <button className="p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-700 hover:bg-white transition-all">
            <Share2 size={16} />
          </button>
        </div>

        {/* Time Left Overlay */}
        {listing.timeLeft && (
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
            <Clock size={12} />
            {listing.timeLeft}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {listing.title}
          </h3>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
            <Star size={14} className="text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-yellow-700">
              {listing.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">
              ৳{listing.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">{listing.condition}</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-blue-600">
              {listing.university}
            </div>
            <div className="text-xs text-gray-500">{listing.seller}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
            {listing.category}
          </span>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 opacity-0 group-hover:opacity-100">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

// Categories Grid
const CategoriesGrid = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <FadeInOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find exactly what you need in our organized categories
            </p>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <FadeInOnScroll key={category.name} delay={index * 100}>
              <div
                className={`group relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 cursor-pointer border border-gray-100 hover:border-${category.color}-200`}
              >
                <div
                  className={`w-12 h-12 bg-${category.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <category.icon
                    className={`w-6 h-6 text-${category.color}-600`}
                  />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-${category.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`}
                />
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

// Floating Action Button
const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful assistant." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    const newMessages = [...messages, { role: "user", content: input }];
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
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
      >
        <MessageCircle
          size={24}
          className="group-hover:rotate-12 transition-transform"
        />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">3</span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 transform transition-all duration-300">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">
              StudMarket Assistant
            </h3>
            <p className="text-sm text-gray-600">How can I help you today?</p>
          </div>
          <div
            ref={chatRef}
            className="p-6 space-y-3 max-h-[32rem] min-h-[20rem] overflow-y-auto bg-gray-50"
          >
            {messages
              .filter((m) => m.role !== "system")
              .map((m, i) => (
                <div
                  key={i}
                  className={`mb-2 p-2 rounded text-sm font-medium ${
                    m.role === "user"
                      ? "bg-blue-600 text-white text-right ml-10"
                      : "bg-purple-100 text-purple-900 text-left mr-10"
                  }`}
                >
                  <span className="block whitespace-pre-line">{m.content}</span>
                </div>
              ))}
          </div>
          <form
            onSubmit={handleSend}
            className="p-4 border-t border-gray-200 flex gap-2"
          >
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              disabled={loading || !input.trim()}
            >
              {loading ? "..." : "Send"}
            </button>
          </form>
          {error && <div className="text-red-500 px-4 pb-2">{error}</div>}
        </div>
      )}
    </div>
  );
};

// Demo user state (replace with real auth logic)
const DEMO_USER = {
  name: "Fatima Khan",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
};

// Main Component
export default function EnhancedStudMarket() {
  const [searchQuery, setSearchQuery] = useState("");
  const [listings] = useState<Listing[]>(mockListings);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Simulate user state
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  // Save user to localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    if (!sidebarOpen) return;
    const handleClick = (e: MouseEvent) => {
      const sidebar = document.querySelector("aside");
      if (sidebar && !sidebar.contains(e.target as Node)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [sidebarOpen]);

  useEffect(() => {
    // If user is not set but authToken exists, fetch user info
    if (!user && typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((userData) => {
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
          });
      }
    }
  }, [user]);

  const Hamburger = () =>
    !sidebarOpen ? (
      <button
        aria-label="Open sidebar"
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-[100] bg-[#18214a] hover:bg-[#10162e] text-white p-6 rounded-2xl shadow-lg transition-all"
        style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.12)" }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="16" fill="none" />
          <rect x="10" y="14" width="20" height="2.5" rx="1.25" fill="white" />
          <rect x="10" y="19" width="20" height="2.5" rx="1.25" fill="white" />
          <rect x="10" y="24" width="20" height="2.5" rx="1.25" fill="white" />
        </svg>
      </button>
    ) : null;

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log(`Searching for: ${searchQuery}`);
    }
  };

  // Top right button/avatar
  const TopRightUser = () => (
    <div className="fixed top-4 right-6 z-[100]">
      {user ? (
        <button
          className="flex items-center gap-2 bg-white/80 hover:bg-white rounded-full px-3 py-1 shadow transition"
          onClick={() => (window.location.href = "/profile")}
        >
          <img
            src={user.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover border"
          />
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow hover:from-blue-600 hover:to-purple-700 transition"
            onClick={() => (window.location.href = "/auth/signin")}
          >
            Login
          </button>
          <button
            className="px-5 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full shadow hover:from-purple-600 hover:to-blue-700 transition"
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        open={sidebarOpen}
        toggleOpen={() => setSidebarOpen((v) => !v)}
        forceOpen={sidebarOpen}
        user={user}
      />
      <Hamburger />
      <TopRightUser />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-purple-600/90 to-indigo-800/90" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
          <div className="absolute top-60 right-32 w-24 h-24 bg-yellow-400/20 rounded-full animate-bounce" />
          <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-pink-400/20 rounded-full animate-ping" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto pt-16">
          <FadeInOnScroll>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">
                Bangladesh's #1 Student Marketplace
              </span>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={200}>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              Your Campus
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                StudMarket
              </span>
            </h1>
          </FadeInOnScroll>

          <FadeInOnScroll delay={400}>
            <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto">
              Connect, trade, and thrive within your university community. Buy
              and sell everything from textbooks to electronics with trusted
              fellow students.
            </p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={600}>
            <div className="max-w-3xl mx-auto mb-12">
              <div className="flex flex-col sm:flex-row gap-4 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white text-gray-900 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search for textbooks, electronics, services..."
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 shadow-lg"
                >
                  <Search size={20} />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={800}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm border border-white/20">
                📚 Textbooks
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm border border-white/20">
                💻 Electronics
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm border border-white/20">
                🚲 Transport
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm border border-white/20">
                🏠 Housing
              </span>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={1000}>
            <div className="flex justify-center">
              <ChevronDown size={32} className="animate-bounce text-white/70" />
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4">
          <FadeInOnScroll>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-blue-600">
                  <AnimatedCounter end={15000} suffix="+" />
                </div>
                <div className="text-gray-600 font-medium">Active Students</div>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-purple-600">
                  <AnimatedCounter end={8500} suffix="+" />
                </div>
                <div className="text-gray-600 font-medium">Listings Posted</div>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-green-600">
                  <AnimatedCounter end={25} suffix="+" />
                </div>
                <div className="text-gray-600 font-medium">Universities</div>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-orange-600">
                  <AnimatedCounter prefix="৳" end={2500000} />
                </div>
                <div className="text-gray-600 font-medium">Total Traded</div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Categories Section */}
      <CategoriesGrid />

      {/* Featured Listings */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  Trending Now
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Featured Listings
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover amazing deals from verified students in your area
              </p>
            </div>
          </FadeInOnScroll>

          {/* Filter Bar */}
          <FadeInOnScroll delay={200}>
            <div className="flex flex-wrap items-center justify-between mb-12 p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                  <Filter size={18} />
                  <span className="font-medium">Filter</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  <SortAsc size={18} />
                  <span className="font-medium">Sort</span>
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Showing {listings.length} results</span>
              </div>
            </div>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing, index) => (
              <FadeInOnScroll key={listing.id} delay={index * 100}>
                <ListingCard listing={listing} />
              </FadeInOnScroll>
            ))}
          </div>

          <FadeInOnScroll delay={600}>
            <div className="text-center mt-12">
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto shadow-lg">
                View All Listings
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50" />
        <div className="relative max-w-7xl mx-auto px-4">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                How StudMarket Works
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Simple, secure, and designed for students
              </p>
            </div>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Account",
                description:
                  "Sign up with your university email to join your campus community",
                icon: User,
                color: "blue",
              },
              {
                step: "02",
                title: "List or Browse Items",
                description:
                  "Post items for sale or browse through thousands of listings",
                icon: Search,
                color: "purple",
              },
              {
                step: "03",
                title: "Connect & Trade",
                description:
                  "Chat with buyers/sellers and complete transactions safely on campus",
                icon: MessageCircle,
                color: "green",
              },
            ].map((item, index) => (
              <FadeInOnScroll key={index} delay={index * 200}>
                <div className="relative text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 border border-gray-100">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div
                      className={`w-8 h-8 bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 rounded-full flex items-center justify-center text-white font-bold text-sm`}
                    >
                      {item.step}
                    </div>
                  </div>
                  <div
                    className={`w-16 h-16 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4`}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why Choose StudMarket?
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Built specifically for students, by students
              </p>
            </div>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Verified Students Only",
                description:
                  "All users verified with university email addresses for maximum security",
              },
              {
                icon: MapPin,
                title: "Campus-Based Trading",
                description:
                  "Trade with students from your university or nearby campuses",
              },
              {
                icon: Zap,
                title: "Instant Messaging",
                description:
                  "Built-in chat system for quick communication with buyers and sellers",
              },
              {
                icon: Award,
                title: "Rating System",
                description:
                  "Rate and review other students to build a trustworthy community",
              },
              {
                icon: Globe,
                title: "Multi-University",
                description:
                  "Connect with students from universities across Bangladesh",
              },
              {
                icon: DollarSign,
                title: "No Hidden Fees",
                description:
                  "List items for free and pay only small transaction fees",
              },
            ].map((feature, index) => (
              <FadeInOnScroll key={index} delay={index * 100}>
                <div className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <FadeInOnScroll>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Start Trading?
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Join thousands of students already using StudMarket
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                Get Started Free
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105">
                Learn More
              </button>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">StudMarket</span>
              </div>
              <p className="text-gray-400">
                Bangladesh's leading student marketplace connecting university
                communities.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Browse Listings
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Post Item
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  How It Works
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Safety Tips
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Report Issue
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Community Guidelines
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>
              &copy; 2024 StudMarket. All rights reserved. Made with ❤️ for
              students.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <FloatingChatButton />
    </div>
  );
}
