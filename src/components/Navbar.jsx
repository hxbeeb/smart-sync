import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';  // Icons for the hamburger menu
import { BiUserCircle } from 'react-icons/bi'; // Icon for the user profile
import { useAuth } from './AuthContext'; // Import your authentication context

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const { userEmail, logout ,userDept} = useAuth();
// Assuming you have a user object in AuthContext

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-300 via-blue-200 to-pink-300 text-black p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold"></div>

        {/* Hamburger icon for mobile view */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-3xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Menu Items */}
        <ul className={`md:flex space-x-4 ${isOpen ? 'block' : 'hidden'} md:block`}>
          {/* <li><Link to="/projects" className="hover:text-gray-800">Projects</Link></li> */}
          <li><Link to="/conflicts" className="hover:text-gray-800">Conflicts</Link></li>
          <li><Link to="/leaflet" className="hover:text-gray-800">Map</Link></li>
          {/* <li><Link to="/chat" className="hover:text-gray-800">Communication</Link></li> */}
          {/* <li><Link to="/resources" className="hover:text-gray-800">Resources</Link></li> */}
          {/* <li><Link to="/tenders" className="hover:text-gray-800">Tenders</Link></li> */}
          {/* <li><Link to="/legal" className="hover:text-gray-800">Legal</Link></li> */}
          <li><Link to="/disputes" className="hover:text-gray-800">Disputes</Link></li>
          {/* <li><Link to="/api" className="hover:text-gray-800">APIs</Link></li> */}
        </ul>

        {/* User Profile Circle */}
        <div className="relative">
          <button onClick={toggleDropdown} className="focus:outline-none">
            <BiUserCircle className="text-3xl" />
          </button>
          {isDropdownOpen && (
  <div className="absolute right-0 mt-2 w-auto max-w-xs bg-white shadow-lg rounded-lg">
    <div className="p-2 text-black">
      <p className="font-semibold">User Email:</p>
      <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">{userDept}</p>
    </div>
    <div className="border-t border-gray-200"></div>
    <button 
      onClick={() => {
        logout();
        setIsDropdownOpen(false); // Close dropdown after logging out
      }} 
      className="w-full text-left p-2 hover:bg-gray-100 rounded-b-lg text-red-500">
      Logout
    </button>
  </div>
)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
