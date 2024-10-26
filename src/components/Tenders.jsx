import React, { useState } from 'react';
import { FaSearch, FaFileContract, FaMoneyBillWave, FaCalendarAlt, FaBuilding } from 'react-icons/fa';
import Sidebar from './Sidebar'; // Adjust the import path as necessary

const tenders = [
  { id: 1, title: 'IT Infrastructure Upgrade', budget: 5000000, deadline: '2024-06-30', departments: ['IT', 'Finance'] },
  { id: 2, title: 'Public Transportation Expansion', budget: 15000000, deadline: '2024-12-31', departments: ['Transportation', 'Urban Development'] },
  { id: 3, title: 'Healthcare Facilities Modernization', budget: 10000000, deadline: '2024-09-30', departments: ['Health', 'Infrastructure'] },
  // Add more tenders as needed
];

const Tenders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTender, setSelectedTender] = useState(null);

  const filteredTenders = tenders.filter(tender =>
    tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tender.departments.some(dept => dept.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-green-50 to-teal-100">
      <Sidebar />
      <div className="flex-1 ml-64 p-8"> {/* Ensure main content is offset by Sidebar width */}
        <h1 className="text-5xl font-extrabold text-center mb-10 text-teal-800 tracking-tight">Joint Tenders Inventory</h1>
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 bg-teal-600">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tenders by title or department..."
                className="w-full py-2 px-4 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {filteredTenders.map(tender => (
              <div
                key={tender.id}
                className="bg-gray-50 p-6 rounded-xl cursor-pointer hover:bg-teal-50 transition duration-300 transform hover:scale-105"
                onClick={() => setSelectedTender(tender)}
              >
                <h2 className="text-xl font-semibold text-teal-800">{tender.title}</h2>
                <p className="text-gray-600"><FaBuilding className="inline mr-2" />Departments: {tender.departments.join(', ')}</p>
                <p className="text-gray-600"><FaMoneyBillWave className="inline mr-2" />Budget: ${tender.budget.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
        {selectedTender && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">{selectedTender.title}</h2>
              <p className="text-gray-600 mb-2"><FaMoneyBillWave className="inline mr-2" />Budget: ${selectedTender.budget.toLocaleString()}</p>
              <p className="text-gray-600 mb-2"><FaCalendarAlt className="inline mr-2" />Deadline: {new Date(selectedTender.deadline).toLocaleDateString()}</p>
              <p className="text-gray-600 mb-4"><FaBuilding className="inline mr-2" />Departments: {selectedTender.departments.join(', ')}</p>
              <div className="flex justify-between">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                  onClick={() => {
                    alert('Viewing full tender details');
                  }}
                >
                  <FaFileContract className="inline mr-2" />
                  View Full Tender
                </button>
                <button
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
                  onClick={() => setSelectedTender(null)}
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

export default Tenders;
