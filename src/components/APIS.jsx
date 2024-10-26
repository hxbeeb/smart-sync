import React, { useState, useEffect } from 'react';
import { FaKey, FaTrash } from 'react-icons/fa';
import Sidebar from './Sidebar'; // Import your Sidebar component

const APIManagement = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [departments, setDepartments] = useState(['Finance', 'Health', 'Education', 'Defense', 'Transportation']);
  const [collaborationRequests, setCollaborationRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('keys');

  useEffect(() => {
    setApiKeys([
      {
        key: 'abc123def456',
        department: 'Finance',
        permissions: ['projects', 'budgets'],
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        key: 'ghi789jkl012',
        department: 'Health',
        permissions: ['projects', 'people', 'resource_pools'],
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        lastUsed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]);
  }, []);

  const generateApiKey = () => {
    const newKey = Math.random().toString(36).substr(2, 16);
    setApiKeys([...apiKeys, {
      key: newKey,
      permissions: [],
      department: '',
      createdAt: new Date().toISOString(),
      lastUsed: null,
    }]);
    alert('New API key generated successfully');
  };

  const revokeApiKey = (key) => {
    setApiKeys(apiKeys.filter((apiKey) => apiKey.key !== key));
    alert('API key revoked successfully');
  };

  const updateApiKey = (key, updatedData) => {
    setApiKeys(apiKeys.map((apiKey) =>
      apiKey.key === key ? { ...apiKey, ...updatedData } : apiKey
    ));
  };

  const initiateCollaboration = (fromDepartment, toDepartment) => {
    setCollaborationRequests([...collaborationRequests, { from: fromDepartment, to: toDepartment, status: 'pending' }]);
    alert(`Collaboration initiated between ${fromDepartment} and ${toDepartment}`);
  };

  const approveCollaboration = (index) => {
    const updatedRequests = [...collaborationRequests];
    updatedRequests[index].status = 'approved';
    setCollaborationRequests(updatedRequests);
    alert('Collaboration approved');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-green-50 to-teal-100">
      <Sidebar /> {/* Ensure Sidebar is consistent */}
      <div className="flex-1 ml-64 p-8"> {/* Flex content offset */}
        <h1 className="text-5xl font-extrabold text-center mb-10 text-teal-800 tracking-tight">API Management Dashboard</h1>
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-teal-600 p-6 rounded-t-2xl">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('keys')}
                className={`px-4 py-2 rounded-l-lg ${activeTab === 'keys' ? 'bg-blue-400 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
              >
                API Keys
              </button>
              <button
                onClick={() => setActiveTab('collaborations')}
                className={`px-4 py-2 rounded-r-lg ${activeTab === 'collaborations' ? 'bg-blue-400 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
              >
                Collaborations
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'keys' && (
              <div className="mb-6 p-6 bg-white rounded-lg shadow-xl">
                <button
                  onClick={generateApiKey}
                  className="mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded hover:shadow-lg transition duration-300 flex items-center"
                >
                  <FaKey className="mr-2" />
                  Generate New API Key
                </button>
                <div className="overflow-x-auto"> {/* Allows horizontal scrolling for table */}
                  <table className="min-w-full bg-white table-auto">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">API Key</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Created At</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Last Used</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {apiKeys.map((apiKey) => (
                        <tr key={apiKey.key}>
                          <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{apiKey.key}</td>
                          <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                            <select
                              value={apiKey.department}
                              onChange={(e) => updateApiKey(apiKey.key, { department: e.target.value })}
                              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                              <option value="">Select Department</option>
                              {departments.map((dept) => (
                                <option key={dept} value={dept}>{dept}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                            <select
                              value=""
                              onChange={(e) => updateApiKey(apiKey.key, { permissions: [...apiKey.permissions, e.target.value] })}
                              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                              <option value="">Add Permission</option>
                              {['projects', 'conflicts', 'budgets', 'people', 'tenders', 'collaborations', 'resource_pools', 'community_redressals'].map((perm) => (
                                <option key={perm} value={perm}>{perm}</option>
                              ))}
                            </select>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {apiKey.permissions.map((perm) => (
                                <span key={perm} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {perm}
                                  <button
                                    className="ml-1 text-blue-500 hover:text-blue-700"
                                    onClick={() => updateApiKey(apiKey.key, { permissions: apiKey.permissions.filter(p => p !== perm) })}
                                  >
                                    &times;
                                  </button>
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{new Date(apiKey.createdAt).toLocaleDateString()}</td>
                          <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{apiKey.lastUsed ? new Date(apiKey.lastUsed).toLocaleDateString() : 'Never'}</td>
                          <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                            <button onClick={() => revokeApiKey(apiKey.key)} className="text-red-600 hover:text-red-800">
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* Similar structure for the 'collaborations' tab can be added here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIManagement;
