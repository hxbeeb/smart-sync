import React, { useState, useEffect } from 'react';
import { FaKey, FaTrash, FaSync, FaUserPlus } from 'react-icons/fa';

const APIManagement = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [departments, setDepartments] = useState(['Finance', 'Health', 'Education', 'Defense', 'Transportation']);
  const [collaborationRequests, setCollaborationRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('keys');

  useEffect(() => {
    // Simulated initial data
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
    setApiKeys([
      ...apiKeys,
      {
        key: newKey,
        permissions: [],
        department: '',
        createdAt: new Date().toISOString(),
        lastUsed: null,
      },
    ]);
    alert('New API key generated successfully');
  };

  const revokeApiKey = (key) => {
    setApiKeys(apiKeys.filter((apiKey) => apiKey.key !== key));
    alert('API key revoked successfully');
  };

  const updateApiKey = (key, updatedData) => {
    setApiKeys(
      apiKeys.map((apiKey) =>
        apiKey.key === key ? { ...apiKey, ...updatedData } : apiKey
      )
    );
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
    <div className="bg-gradient-to-r from-purple-300 via-blue-200 to-pink-300 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
          <h1 className="text-3xl font-bold text-white">Government API Key Management</h1>
        </div>
        <div className="p-6">
          <div className="flex mb-6">
            <button
              onClick={() => setActiveTab('keys')}
              className={`px-4 py-2 rounded-l-lg ${activeTab === 'keys' ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
            >
              API Keys
            </button>
            <button
              onClick={() => setActiveTab('collaborations')}
              className={`px-4 py-2 rounded-r-lg ${activeTab === 'collaborations' ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
            >
              Collaborations
            </button>
          </div>

          {activeTab === 'keys' && (
            <div className="mb-6 p-6 bg-white rounded-lg shadow-xl">
              <button
                onClick={generateApiKey}
                className="mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded hover:shadow-lg transition duration-300 flex items-center"
              >
                <FaKey className="mr-2" />
                Generate New API Key
              </button>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">API Key</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Used</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {apiKeys.map((apiKey) => (
                      <tr key={apiKey.key}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{apiKey.key}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <select
                            value={apiKey.department}
                            onChange={(e) => updateApiKey(apiKey.key, { department: e.target.value })}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                              <option key={dept} value={dept}>{dept}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <select
                            value=""
                            onChange={(e) => updateApiKey(apiKey.key, { permissions: [...apiKey.permissions, e.target.value] })}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                                  onClick={() => updateApiKey(apiKey.key, { permissions: apiKey.permissions.filter(p => p !== perm) })}
                                  className="ml-1 text-blue-400 hover:text-blue-600"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(apiKey.createdAt).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{apiKey.lastUsed ? new Date(apiKey.lastUsed).toLocaleString() : 'Never'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => revokeApiKey(apiKey.key)}
                            className="text-red-600 hover:text-red-900 mr-2"
                          >
                            <FaTrash />
                          </button>
                          <button
                            onClick={() => updateApiKey(apiKey.key, { key: Math.random().toString(36).substr(2, 16) })}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaSync />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === 'collaborations' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Collaboration Requests</h2>
              <div className="mb-4">
                {departments.map((fromDepartment) => (
                  <div key={fromDepartment} className="flex items-center mb-2">
                    <span className="mr-2">{fromDepartment}:</span>
                    <select
                      className="border border-gray-300 rounded"
                      onChange={(e) => initiateCollaboration(fromDepartment, e.target.value)}
                    >
                      <option value="">Select Department</option>
                      {departments.filter(dept => dept !== fromDepartment).map((toDepartment) => (
                        <option key={toDepartment} value={toDepartment}>{toDepartment}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {collaborationRequests.map((request, index) => (
                    <tr key={`${request.from}-${request.to}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.from}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.to}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {request.status === 'pending' && (
                          <button
                            onClick={() => approveCollaboration(index)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default APIManagement;
