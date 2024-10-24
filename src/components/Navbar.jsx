import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';  // Icons for the hamburger menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-300 via-blue-200 to-pink-300 text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Platform</div>

        {/* Hamburger icon for mobile view */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-3xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Menu Items */}
        <ul className={`md:flex space-x-4 ${isOpen ? 'block' : 'hidden'} md:block`}>
          <li><Link to="/projects" className="hover:text-gray-800">Projects</Link></li>
          <li><Link to="/conflicts" className="hover:text-gray-800">Conflicts</Link></li>
          <li><Link to="/leaflet" className="hover:text-gray-800">Map</Link></li>
          <li><Link to="/chat" className="hover:text-gray-800">Communication</Link></li>
          <li><Link to="/resources" className="hover:text-gray-800">Resources</Link></li>
          <li><Link to="/tenders" className="hover:text-gray-800">Tenders</Link></li>
          <li><Link to="/legal" className="hover:text-gray-800">Legal</Link></li>
          <li><Link to="/disputes" className="hover:text-gray-800">Disputes</Link></li>
          <li><Link to="/api" className="hover:text-gray-800">APIs</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
