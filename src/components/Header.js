import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="32" height="32"><rect width="256" height="256" fill="none"/><rect x="60" y="56" width="40" height="144" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="156" y="56" width="40" height="144" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M196,80h28a8,8,0,0,1,8,8v80a8,8,0,0,1-8,8H196" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M60,176H32a8,8,0,0,1-8-8V88a8,8,0,0,1,8-8H60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="100" y1="128" x2="156" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="232" y1="128" x2="244" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="12" y1="128" x2="24" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            <h1 className="text-2xl font-bold text-white">Fitness Diet Tracker</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Dashboard</a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Food Log</a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Nutrition</a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Reports</a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Settings</a>
          </nav>

          {/* User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors">
              Sign In
            </button>
            <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="80" cy="172" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="80" cy="60" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="172" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="60" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,224a60,60,0,0,1,96,0,60,60,0,0,1,96,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,112a60,60,0,0,1,96,0h0a60,60,0,0,1,96,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><path d="M152,152,234.35,129a8,8,0,0,0,.27-15.21l-176-65.28A8,8,0,0,0,48.46,58.63l65.28,176a8,8,0,0,0,15.21-.27Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><polyline points="24 180 68 164 108 180 148 164 188 180 232 164" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="24" y1="128" x2="232" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,172.73V184a32,32,0,0,1-32,32H80a32,32,0,0,1-32-32V171.27" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48.2,92a8,8,0,0,1-7.83-10.29C49.49,53.24,85.26,32,128,32s78.52,21.25,87.63,49.73A8,8,0,0,1,207.8,92Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-blue-500">
            <ul className="flex flex-col space-y-3 pb-4">
              <li><a href="#" className="text-white hover:text-blue-200 block">Dashboard</a></li>
              <li><a href="#" className="text-white hover:text-blue-200 block">Food Log</a></li>
              <li><a href="#" className="text-white hover:text-blue-200 block">Nutrition</a></li>
              <li><a href="#" className="text-white hover:text-blue-200 block">Reports</a></li>
              <li><a href="#" className="text-white hover:text-blue-200 block">Settings</a></li>
              <li><a href="#" className="text-white hover:text-blue-200 block">Sign In</a></li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;