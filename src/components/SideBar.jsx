import React from 'react';
import { Link } from 'react-router-dom';
import { FaComments, FaVideo, FaGavel, FaFileAlt, FaTasks, FaHandsHelping, FaClipboardList, FaCode, FaExclamationCircle } from 'react-icons/fa'; // Icons

const Sidebar = () => {
  return (
    <div className="h-screen bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 text-black w-64 flex flex-col fixed left-0 top-0 overflow-y-auto">
      <div className="flex items-center justify-center h-20">
        <h1 className="text-3xl font-bold">Tools</h1>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-4 p-4">
          <li>
            <Link to="/issues" className="flex items-center space-x-3 hover:bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-md transition">
              <FaExclamationCircle className="text-xl" />
              <span>Issues</span>
            </Link>
          </li>
          <li>
            <Link to="/chat" className="flex items-center space-x-3 hover:bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-md transition">
              <FaComments className="text-xl" />
              <span>Chat</span>
            </Link>
          </li>
          <li>
            <Link to="/cctv" className="flex items-center space-x-3 hover:bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-md transition">
              <FaVideo className="text-xl" />
              <span>Monitor CCTV</span>
            </Link>
          </li>
          <li>
            <Link to="/departments" className="flex items-center space-x-3 hover:bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-md transition">
              <FaTasks className="text-xl" />
              <span>Progress</span>
            </Link>
          </li>
          <li>
            <Link to="/disputes" className="flex items-center space-x-3 hover:bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-md transition">
              <FaGavel className="text-xl" />
              <span>Resolve Disputes</span>
            </Link>
          </li>
          <li>
            <Link to="/legal" className="flex items-center space-x-3 hover:bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-md transition">
              <FaFileAlt className="text-xl" />
              <span>Legal Assistant</span>
            </Link>
          </li>
          <li>
            <Link to="/tenders" className="flex items-center space-x-3 hover:bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-md transition">
              <FaClipboardList className="text-xl" />
              <span>Joint Tenders</span>
            </Link>
          </li>
          <li>
            <Link to="/resources" className="flex items-center space-x-3 hover:bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-md transition">
              <FaHandsHelping className="text-xl" />
              <span>Request Resources</span>
            </Link>
          </li>
          <li>
            <Link to="/api" className="flex items-center space-x-3 hover:bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-md transition">
              <FaCode className="text-xl" />
              <span>APIs</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
