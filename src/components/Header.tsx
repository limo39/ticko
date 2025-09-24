import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Ticket Booking System</h1>
          <nav className="space-x-4">
            <a href="/" className="hover:text-blue-200 transition-colors">
              Home
            </a>
            <a href="/matches" className="hover:text-blue-200 transition-colors">
              Matches
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;