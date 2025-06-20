import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/pulse.png" alt="Pulse Finance" className="h-8 w-8" />
            <span className="text-2xl font-bold">Pulse Finance</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/#how-it-works" className="hover:text-gray-300 transition-colors">How It Works</a>
            <Link to="/earn" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium">
              Earn
            </Link>
          </nav>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-4">
              <a href="/#how-it-works" className="hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>How It Works</a>
              <Link to="/earn" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium w-fit" onClick={() => setIsMenuOpen(false)}>
                Earn
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;