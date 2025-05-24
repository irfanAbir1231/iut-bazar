"use client";
import React from "react";
import { Sparkles } from "lucide-react";

const Footer = () => (
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
);

export default Footer;
