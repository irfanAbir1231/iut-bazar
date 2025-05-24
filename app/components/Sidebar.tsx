"use client";
import Link from "next/link";
import { Sparkles, Plus, Bell, MessageCircle, User } from "lucide-react";

interface SidebarProps {
  open: boolean;
  toggleOpen: () => void;
  forceOpen: boolean;
}

export default function Sidebar({ open, toggleOpen, forceOpen }: SidebarProps) {
  return (
    <>
      <div className="fixed top-4 left-4 z-[100]">
        <button
          aria-label="Open sidebar"
          onClick={toggleOpen}
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg hover:scale-105 active:scale-95 focus:outline-none"
          style={{ minWidth: 48, minHeight: 48 }}
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">StudMarket</span>
        </button>
      </div>
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white/10 backdrop-blur-lg shadow-2xl flex flex-col justify-between z-50 transition-transform duration-700 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <div>
          <nav className="flex flex-col gap-1 mt-32 px-4">
            <Link
              href="/listings/add-item"
              className="sidebar-link flex items-center gap-2"
            >
              <Plus size={16} /> Add Item
            </Link>
            <Link
              href="/listings/add-service"
              className="sidebar-link flex items-center gap-2"
            >
              <Sparkles size={16} /> Add Service
            </Link>
            <Link
              href="/listings"
              className="sidebar-link flex items-center gap-2"
            >
              All Products
            </Link>
          </nav>
        </div>
        <div className="flex flex-col gap-2 px-4 pb-6">
          <Link
            href="/profile"
            className="sidebar-action flex items-center gap-2"
          >
            <User size={18} /> Account
          </Link>
        </div>
      </aside>
    </>
  );
}
