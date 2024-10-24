import React, { useState } from 'react';
import { FaSearch, FaFileContract, FaMoneyBillWave, FaCalendarAlt, FaBuilding } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-teal-100 p-8">
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
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTenders.map(tender => (
                <tr key={tender.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tender.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${tender.budget.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(tender.deadline).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tender.departments.join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedTender(tender)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                  // Here you would typically navigate to a detailed tender page or open a modal with more information
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
  );
};

export default Tenders;