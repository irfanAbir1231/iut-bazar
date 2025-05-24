"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHover, setSidebarHover] = useState(false);

  // Show sidebar if open or hovered
  const showSidebar = sidebarOpen || sidebarHover;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div
          className="fixed top-0 left-0 z-50"
          onMouseEnter={() => setSidebarHover(true)}
          onMouseLeave={() => setSidebarHover(false)}
        >
          <Sidebar
            open={showSidebar}
            toggleOpen={() => setSidebarOpen((v) => !v)}
            forceOpen={sidebarOpen}
          />
        </div>
        <main
          className={`transition-all duration-700 ${
            showSidebar ? "ml-64" : "ml-0"
          }`}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
