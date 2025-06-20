import React from 'react';
import { Twitter, MessageCircle, Github, FileText, Book } from 'lucide-react';

const Tooltip = () => (
  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    <span className="bg-black text-white text-xs font-bold rounded py-1 px-2 whitespace-nowrap z-10 relative">
      Coming Soon
    </span>
    <div className="w-3 h-3 bg-black transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-8">
              <img src="/pulse.png" alt="Pulse Finance" className="h-8 w-8" />
              <span className="text-2xl font-bold italic">Pulse</span>
            </div>
            <div className="flex space-x-4">
              <div className="relative group">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer">
                  <Twitter size={20} />
                </div>
                <Tooltip />
              </div>
              <div className="relative group">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer">
                  <MessageCircle size={20} />
                </div>
                <Tooltip />
              </div>
              <div className="relative group">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer">
                  <Github size={20} />
                </div>
                <Tooltip />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Legal</h3>
            <ul className="space-y-4">
              <li className="relative group w-fit">
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Terms of Service</span>
                <Tooltip />
              </li>
              <li className="relative group w-fit">
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                <Tooltip />
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Developers</h3>
            <ul className="space-y-4">
              <li className="relative group w-fit">
                <div className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 cursor-pointer">
                  <Book size={16} />
                  <span>Documentation</span>
                </div>
                <Tooltip />
              </li>
              <li className="relative group w-fit">
                <div className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 cursor-pointer">
                  <FileText size={16} />
                  <span>API Reference</span>
                </div>
                <Tooltip />
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="relative group w-fit">
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact Us</span>
                <Tooltip />
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center">
          <p className="text-gray-400">© 2025 Pulse Finance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;