import React, { useState } from 'react';
import { FaSearch, FaPhone, FaEnvelope, FaBuilding } from 'react-icons/fa';
import Sidebar from './Sidebar'; // Import the Sidebar component

const legalAssistants = [
  { id: 1, name: 'Jane Doe', department: 'Criminal Law', phone: '(555) 123-4567', email: 'jane.doe@gov.org' },
  { id: 2, name: 'John Smith', department: 'Civil Law', phone: '(555) 987-6543', email: 'john.smith@gov.org' },
  { id: 3, name: 'Alice Johnson', department: 'Family Law', phone: '(555) 246-8135', email: 'alice.johnson@gov.org' },
  // Add more legal assistants as needed
];

const Legal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssistant, setSelectedAssistant] = useState(null);

  const filteredAssistants = legalAssistants.filter(assistant =>
    assistant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assistant.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 to-red-100 flex">
      <Sidebar /> {/* Add Sidebar here */}
      <div className="flex-1 ml-64 p-8"> {/* Ensure main content is offset by Sidebar width */}
        <h1 className="text-5xl font-extrabold text-center mb-10 text-red-800 tracking-tight">Legal Assistants Directory</h1>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 bg-red-600">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or department..."
                className="w-full py-2 px-4 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {filteredAssistants.map(assistant => (
              <div
                key={assistant.id}
                className="bg-gray-50 p-6 rounded-xl cursor-pointer hover:bg-red-50 transition duration-300 transform hover:scale-105"
                onClick={() => setSelectedAssistant(assistant)}
              >
                <h2 className="text-xl font-semibold text-blue-800">{assistant.name}</h2>
                <p className="text-gray-600"><FaBuilding className="inline mr-2" />{assistant.department}</p>
              </div>
            ))}
          </div>
        </div>
        {selectedAssistant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">{selectedAssistant.name}</h2>
              <p className="text-gray-600 mb-2"><FaBuilding className="inline mr-2" />{selectedAssistant.department}</p>
              <p className="text-gray-600 mb-2"><FaPhone className="inline mr-2" />{selectedAssistant.phone}</p>
              <p className="text-gray-600 mb-4"><FaEnvelope className="inline mr-2" />{selectedAssistant.email}</p>
              <div className="flex justify-between">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                  onClick={() => window.location.href = `mailto:${selectedAssistant.email}`}
                >
                  Contact
                </button>
                <button
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
                  onClick={() => setSelectedAssistant(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Legal;
