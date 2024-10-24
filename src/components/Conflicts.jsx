import React, { useState } from 'react';
import { FaPlus, FaFilter, FaMapMarkerAlt, FaRobot, FaEnvelope, FaPhone, FaChartBar, FaMoneyBillWave } from 'react-icons/fa';
import Navbar from './Navbar';
import Sidebar from './SideBar'; // Import the Sidebar component

const Conflicts = () => {
  const [conflicts, setConflicts] = useState([
    {
      id: 1,
      title: "Infrastructure Contract Bidding",
      description: "A government official's family member is involved in a company bidding for a major infrastructure project.",
      status: 'unresolved',
      location: "South Delhi",
      stakeholders: ["Delhi Development Authority", "Public Works Department"],
      dateCreated: "2024-09-10",
      agency: "Delhi Development Authority",
      budget: 5000000,
      budgetUsed: 2000000,
    },
    {
      id: 2,
      title: "Environmental Policy Lobbying",
      description: "A policymaker owns shares in an energy company affected by proposed environmental regulations.",
      status: 'in_progress',
      location: "North Delhi",
      stakeholders: ["Delhi Pollution Control Committee", "Ministry of Environment"],
      dateCreated: "2024-08-22",
      agency: "Delhi Pollution Control Committee",
      budget: 3000000,
      budgetUsed: 1500000,
    },
    {
      id: 3,
      title: "Education Curriculum Development",
      description: "A board member of the education department also runs a private tutoring company that may benefit from curriculum changes.",
      status: 'resolved',
      location: "Central Delhi",
      stakeholders: ["Directorate of Education", "NCERT"],
      dateCreated: "2024-09-12",
      agency: "Directorate of Education",
      budget: 2000000,
      budgetUsed: 1800000,
    },
  ]);

  const [newConflict, setNewConflict] = useState({ 
    title: '', 
    description: '', 
    location: '', 
    stakeholders: '', 
    dateCreated: '',
    agency: '',
    budget: '',
    budgetUsed: ''
  });
  const [expandedId, setExpandedId] = useState(null);
  const [filterDate, setFilterDate] = useState('');
  const [filterAgency, setFilterAgency] = useState('');

  const handleStatusChange = (id, newStatus) => {
    setConflicts(conflicts.map(conflict => 
      conflict.id === id ? { ...conflict, status: newStatus } : conflict
    ));
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'unresolved': return 'bg-red-500';
      case 'in_progress': return 'bg-yellow-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleAddConflict = () => {
    const newConflictData = {
      id: conflicts.length + 1,
      title: newConflict.title,
      description: newConflict.description,
      location: newConflict.location,
      stakeholders: newConflict.stakeholders.split(',').map(s => s.trim()),
      dateCreated: newConflict.dateCreated,
      status: 'unresolved',
      agency: newConflict.agency,
      budget: parseFloat(newConflict.budget),
      budgetUsed: parseFloat(newConflict.budgetUsed),
    };
    setConflicts([...conflicts, newConflictData]);
    setNewConflict({ 
      title: '', 
      description: '', 
      location: '', 
      stakeholders: '', 
      dateCreated: '',
      agency: '',
      budget: '',
      budgetUsed: ''
    });
  };

  const filteredConflicts = conflicts
    .filter(conflict => !filterDate || conflict.dateCreated >= filterDate)
    .filter(conflict => !filterAgency || conflict.agency === filterAgency);

  const groupedConflicts = filteredConflicts.reduce((groups, conflict) => {
    const agency = conflict.agency;
    if (!groups[agency]) {
      groups[agency] = [];
    }
    groups[agency].push(conflict);
    return groups;
  }, {});

  const agencies = [...new Set(conflicts.map(conflict => conflict.agency))];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar /> {/* Add the Sidebar component here */}
      <div className="flex-1 ml-64"> {/* Add margin-left to offset the sidebar */}
        <Navbar />
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-indigo-800 mb-8 text-center">Government Conflicts of Interest</h1>

            {/* Add New Conflict */}
            <div className="mb-8 bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center">
                <FaPlus className="mr-2" /> Add New Conflict
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <input 
                  type="text" 
                  placeholder="Title" 
                  value={newConflict.title} 
                  onChange={(e) => setNewConflict({ ...newConflict, title: e.target.value })} 
                  className="p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                />
                <input 
                  type="text" 
                  placeholder="Location (e.g., South Delhi)" 
                  value={newConflict.location} 
                  onChange={(e) => setNewConflict({ ...newConflict, location: e.target.value })} 
                  className="p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                />
                <input 
                  type="text" 
                  placeholder="Agency" 
                  value={newConflict.agency} 
                  onChange={(e) => setNewConflict({ ...newConflict, agency: e.target.value })} 
                  className="p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                />
                <textarea 
                  placeholder="Description" 
                  value={newConflict.description} 
                  onChange={(e) => setNewConflict({ ...newConflict, description: e.target.value })} 
                  className="p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent md:col-span-2 lg:col-span-3" 
                  rows="3"
                />
                <input 
                  type="text" 
                  placeholder="Stakeholders (comma separated)" 
                  value={newConflict.stakeholders} 
                  onChange={(e) => setNewConflict({ ...newConflict, stakeholders: e.target.value })} 
                  className="p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                />
                <input 
                  type="date" 
                  value={newConflict.dateCreated} 
                  onChange={(e) => setNewConflict({ ...newConflict, dateCreated: e.target.value })} 
                  className="p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                />
                <input 
                  type="number" 
                  placeholder="Budget" 
                  value={newConflict.budget} 
                  onChange={(e) => setNewConflict({ ...newConflict, budget: e.target.value })} 
                  className="p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                />
                <input 
                  type="number" 
                  placeholder="Budget Used" 
                  value={newConflict.budgetUsed} 
                  onChange={(e) => setNewConflict({ ...newConflict, budgetUsed: e.target.value })} 
                  className="p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                />
              </div>
              <button onClick={handleAddConflict} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105">
                Add Conflict
              </button>
            </div>

            {/* Filters */}
            <div className="mb-8 bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center">
                <FaFilter className="mr-2" /> Filter Conflicts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-700 mb-1">By Date</label>
                  <input 
                    id="dateFilter"
                    type="date" 
                    value={filterDate} 
                    onChange={(e) => setFilterDate(e.target.value)} 
                    className="p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                  />
                </div>
                <div>
                  <label htmlFor="agencyFilter" className="block text-sm font-medium text-gray-700 mb-1">By Agency</label>
                  <select 
                    id="agencyFilter"
                    value={filterAgency} 
                    onChange={(e) => setFilterAgency(e.target.value)}
                    className="p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">All Agencies</option>
                    {agencies.map(agency => (
                      <option key={agency} value={agency}>{agency}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Agency Overview */}
            <div className="mb-8 bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center">
                <FaChartBar className="mr-2" /> Agency Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agencies.map(agency => {
                  const agencyConflicts = conflicts.filter(c => c.agency === agency);
                  const totalBudget = agencyConflicts.reduce((sum, c) => sum + c.budget, 0);
                  const totalBudgetUsed = agencyConflicts.reduce((sum, c) => sum + c.budgetUsed, 0);
                  const percentUsed = (totalBudgetUsed / totalBudget) * 100;
                  return (
                    <div key={agency} className="bg-gray-50 p-4 rounded-lg shadow">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{agency}</h3>
                      <p className="text-sm text-gray-600 mb-1">Total Budget: ₹{totalBudget.toLocaleString()}</p>
                      <p className="text-sm text-gray-600 mb-2">Budget Used: ₹{totalBudgetUsed.toLocaleString()}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentUsed}%` }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{percentUsed.toFixed(1)}% used</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Grouped Conflicts by Agency */}
            {Object.keys(groupedConflicts).map(agency => (
              <div key={agency} className="mb-12">
                <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> {agency}
                </h2>
                <div className="space-y-6">
                  {groupedConflicts[agency].map((conflict) => (
                    <div key={conflict.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:shadow-xl">
                      <div 
                        className="p-6 cursor-pointer"
                        onClick={() => toggleExpand(conflict.id)}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-semibold text-gray-800">{conflict.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(conflict.status)} text-white`}>
                            {conflict.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{conflict.description}</p>
                        <p className="text-sm text-gray-500">Created on: {new Date(conflict.dateCreated).toLocaleDateString()}</p>
                        <div className="mt-4 flex items-center">
                          <FaMoneyBillWave className="text-green-500 mr-2" />
                          <span className="text-sm text-gray-600">Budget: ₹{conflict.budget.toLocaleString()} | Used: ₹{conflict.budgetUsed.toLocaleString()}</span>
                        </div>
                      </div>
                      {expandedId === conflict.id && (
                        <div className="px-6 pb-6 bg-gray-50">
                          <div className="mb-6">
                            <h4 className="font-semibold text-lg text-indigo-700 mb-3">Change Status</h4>
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleStatusChange(conflict.id, 'resolved')} 
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                              >
                                Resolved
                              </button>
                              <button 
                                onClick={() => handleStatusChange(conflict.id, 'in_progress')} 
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
                              >
                                In Progress
                              </button>
                              <button 
                                onClick={() => handleStatusChange(conflict.id, 'unresolved')} 
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                              >
                                Unresolved
                              </button>
                            </div>
                          </div>

                          <div className="mb-6">
                            <h4 className="font-semibold text-lg text-indigo-700 mb-3">Contact Stakeholders</h4>
                            <div className="space-y-3">
                              {conflict.stakeholders.map((stakeholder, index) => (
                                <div key={index} className="flex justify-between items-center bg-white p-3 rounded-md shadow">
                                  <p className="text-gray-700 font-medium">{stakeholder}</p>
                                  <div className="space-x-4">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-300 flex items-center">
                                      <FaEnvelope className="mr-1" /> Message
                                    </button>
                                    <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-300 flex items-center">
                                      <FaPhone className="mr-1" /> Call
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex space-x-4">
                            <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300 flex items-center">
                              <FaMapMarkerAlt className="mr-2" /> Visualize on Map
                            </button>
                            <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300 flex items-center">
                              <FaRobot className="mr-2" /> AI Suggestion to Resolve
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conflicts;