"use client";
import Link from "next/link";
import { Sparkles, Plus, Bell, MessageCircle, User, Menu } from "lucide-react";

interface SidebarProps {
  open: boolean;
  toggleOpen: () => void;
  forceOpen: boolean;
  user?: { name: string; avatar: string } | null;
}

export default function Sidebar({
  open,
  toggleOpen,
  forceOpen,
  user,
}: SidebarProps) {
  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full w-64 flex flex-col justify-between z-50 transition-transform duration-700 ${
          open
            ? "translate-x-0 border-r border-white/20"
            : "-translate-x-full border-none"
        }`}
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-60 backdrop-blur-xl -z-10 rounded-none" />
        <div className="flex items-center gap-3 px-6 pt-8 pb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">StudMarket</span>
        </div>
        <div>
          <nav className="flex flex-col gap-2 mt-8 px-4">
            <Link
              href="/listings/add-item"
              className="sidebar-link flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/20 transition-colors"
            >
              <Plus size={16} /> Add Item
            </Link>
            <Link
              href="/listings/add-service"
              className="sidebar-link flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/20 transition-colors"
            >
              <Sparkles size={16} /> Add Service
            </Link>
            <Link
              href="/listings"
              className="sidebar-link flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/20 transition-colors"
            >
              All Products
            </Link>
          </nav>
        </div>
        <div className="flex flex-col gap-2 px-4 pb-6">
          {user ? (
            <div className="flex items-center gap-3 p-3 rounded-md bg-white/10">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover border"
              />
              <span className="font-semibold text-white truncate">
                {user.name}
              </span>
            </div>
          ) : (
            <Link
              href="/profile"
              className="sidebar-action flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/20 transition-colors"
            >
              <User size={18} /> Account
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
