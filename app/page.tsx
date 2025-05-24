"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Plus,
  User,
  BookOpen,
  Bike,
  GraduationCap,
  MapPin,
  MessageCircle,
  Star,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const demoListings = [
  {
    id: 1,
    title: "MacBook Pro 13-inch",
    price: 85000,
    condition: "Excellent",
    university: "IUT",
    imageUrl:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=240&fit=crop",
    category: "Electronics",
    rating: 4.8,
    seller: "Ahmed Rahman",
  },
  {
    id: 2,
    title: "Advanced Calculus Tutoring",
    price: 800,
    condition: "N/A",
    university: "BRACU",
    imageUrl:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=240&fit=crop",
    category: "Service",
    rating: 4.9,
    seller: "Fatima Khan",
  },
  {
    id: 3,
    title: "Mountain Bike - Trek",
    price: 25000,
    condition: "Good",
    university: "DU",
    imageUrl:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=240&fit=crop",
    category: "Vehicles",
    rating: 4.7,
    seller: "Rahim Ahmed",
  },
  {
    id: 4,
    title: "Programming Books Set",
    price: 1500,
    condition: "Like New",
    university: "NSU",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=240&fit=crop",
    category: "Books",
    rating: 4.6,
    seller: "Sara Islam",
  },
  {
    id: 5,
    title: "Digital Camera Canon",
    price: 45000,
    condition: "Good",
    university: "BUET",
    imageUrl:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=240&fit=crop",
    category: "Electronics",
    rating: 4.8,
    seller: "Karim Hassan",
  },
  {
    id: 6,
    title: "Web Development Course",
    price: 1200,
    condition: "N/A",
    university: "IUB",
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=240&fit=crop",
    category: "Service",
    rating: 4.9,
    seller: "Nabila Roy",
  },
];

interface ListingCardProps {
  title: string;
  price: number;
  condition: string;
  university: string;
  imageUrl: string;
  category: string;
  rating: number;
  seller: string;
}

const ListingCard = ({
  title,
  price,
  condition,
  university,
  imageUrl,
  category,
  rating,
  seller,
}: ListingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${
        isHovered ? "scale-105" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className={`w-full h-48 object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : ""
          }`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-blue-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
            {category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 bg-white/90 text-gray-800 text-xs font-medium rounded-md backdrop-blur-sm">
            {university}
          </span>
        </div>
        <div
          className={`absolute bottom-4 left-4 right-4 transform transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-center text-white text-sm">
            <User size={14} className="mr-1" />
            {seller}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400 fill-current mr-1" />
            <span className="text-sm text-gray-600">{rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-600">
            ৳{price.toLocaleString()}
          </span>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-md ${
              condition === "Excellent"
                ? "bg-green-100 text-green-700"
                : condition === "Good"
                ? "bg-blue-100 text-blue-700"
                : condition === "Fair"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {condition}
          </span>
        </div>

        <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium transform hover:scale-105">
          Contact Seller
        </button>
      </div>
    </div>
  );
};

const AnimatedCounter = ({
  end,
  duration = 2000,
}: {
  end: number;
  duration?: number;
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
      observer.observe(ref.current as Element);
    }

    return () => observer.disconnect();
  }, [end, duration, isVisible]);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>}>
      {count.toLocaleString()}
    </span>
  );
};

const ParallaxSection = ({
  children,
  className = "",
  offset = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}) => {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -offset;
        setScrollY(rate);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return (
    <div ref={ref} className={className}>
      <div style={{ transform: `translateY(${scrollY}px)` }}>{children}</div>
    </div>
  );
};

const FadeInOnScroll = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
};

export default function EnhancedMarketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log(`Searching for: ${searchQuery}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1
                className={`text-2xl font-bold transition-colors ${
                  scrollY > 50 ? "text-gray-900" : "text-white"
                }`}
              >
                StudMarket
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className={`transition-colors ${
                  scrollY > 50
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white/90 hover:text-white"
                }`}
              >
                Browse
              </a>
              <a
                href="#"
                className={`transition-colors ${
                  scrollY > 50
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white/90 hover:text-white"
                }`}
              >
                Sell
              </a>
              <a
                href="#"
                className={`transition-colors ${
                  scrollY > 50
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white/90 hover:text-white"
                }`}
              >
                About
              </a>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus size={18} />
                <span>List Item</span>
              </button>
              <button
                className={`p-2 rounded-lg transition-colors ${
                  scrollY > 50
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white/90 hover:bg-white/10"
                }`}
              >
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <ParallaxSection className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </ParallaxSection>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <FadeInOnScroll>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your Campus
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Marketplace
              </span>
            </h1>
          </FadeInOnScroll>

          <FadeInOnScroll delay={200}>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Connect, trade, and thrive within your university community
            </p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={400}>
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 backdrop-blur-md rounded-2xl">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-6 py-4 bg-white text-gray-900 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search for textbooks, electronics, services..."
                />
                <button
                  onClick={handleSearch}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                >
                  <Search size={20} />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={600}>
            <div className="mt-12 flex justify-center">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-blue-600">
                  <AnimatedCounter end={15000} />+
                </div>
                <div className="text-gray-600">Active Students</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-purple-600">
                  <AnimatedCounter end={8500} />+
                </div>
                <div className="text-gray-600">Listings Posted</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-green-600">
                  <AnimatedCounter end={25} />+
                </div>
                <div className="text-gray-600">Universities</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-orange-600">
                  ৳<AnimatedCounter end={2500000} />
                </div>
                <div className="text-gray-600">Total Traded</div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Featured Listings
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover amazing deals from students in your area
              </p>
            </div>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demoListings.map((listing, index) => (
              <FadeInOnScroll key={listing.id} delay={index * 100}>
                <ListingCard {...listing} />
              </FadeInOnScroll>
            ))}
          </div>

          <FadeInOnScroll delay={600}>
            <div className="text-center mt-12">
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
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

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Browse Categories
              </h2>
              <p className="text-xl text-gray-600">
                Find exactly what you're looking for
              </p>
            </div>
          </FadeInOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Textbooks",
                count: "2.3k",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: GraduationCap,
                title: "Electronics",
                count: "1.8k",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: Bike,
                title: "Vehicles",
                count: "945",
                color: "from-green-500 to-green-600",
              },
              {
                icon: MessageCircle,
                title: "Services",
                count: "1.2k",
                color: "from-orange-500 to-orange-600",
              },
            ].map((category, index) => (
              <FadeInOnScroll key={category.title} delay={index * 100}>
                <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <category.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600">{category.count} items</p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4">
          <FadeInOnScroll>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Trading?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of students already using StudMarket
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Sign Up Free
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">StudMarket</h3>
              <p className="text-gray-400">
                Connecting students across universities for safe and secure
                trading.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Platform</h4>
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
                  Create Listing
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Messages
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Support</h4>
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
                  Safety Tips
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Legal</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Community Guidelines
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 StudMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
