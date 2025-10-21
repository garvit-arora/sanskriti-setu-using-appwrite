import React from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
      <h2 className="text-xl font-bold text-orange-700">🌏 Sanskriti Sajha</h2>
      <nav className="flex gap-4">
        <Link to="/dashboard" className="hover:text-orange-700">Dashboard</Link>
        <Link to="/discover" className="hover:text-orange-700">Discover</Link>
        <Link to="/profile" className="hover:text-orange-700">Profile</Link>
        <Link to="/matches" className="hover:text-orange-700">Matches</Link>
        <Link to="/chat" className="hover:text-orange-700">Chat</Link>
        <Link to="/indiamap" className="hover:text-orange-700">India Map</Link>
        <button onClick={onLogout} className="text-red-600">Logout</button>
      </nav>
    </header>
  );
};

export default Header;
