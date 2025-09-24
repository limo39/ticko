import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold hover:text-blue-200">
            Ticket Booking System
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-blue-200 transition-colors">
              Matches
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;