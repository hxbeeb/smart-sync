import React, { useState } from 'react';
import { FaUser, FaTools, FaHardHat, FaTruck, FaCog } from 'react-icons/fa';
import Sidebar from './SideBar';
import Navbar from './Navbar';

const Resources = () => {
  const [resources, setResources] = useState({
    personnel: [
      { name: 'John Doe', skill: 'Engineer', available: true },
      { name: 'Jane Doe', skill: 'Doctor', available: false },
      { name: 'Bob Smith', skill: 'Nurse', available: true },
    ],
    skilledWorkers: [
      { name: 'Mike Davis', skill: 'Electrician', available: true },
      { name: 'Emily Chen', skill: 'Plumber', available: false },
      { name: 'David Lee', skill: 'Carpenter', available: true },
    ],
    unskilledWorkers: [
      { name: 'Tom Johnson', available: true },
      { name: 'Lisa Nguyen', available: false },
      { name: 'Kevin White', available: true },
    ],
    equipment: [
      { name: 'Crane', available: true },
      { name: 'Bulldozer', available: false },
      { name: 'Dump Truck', available: true },
    ],
    machinery: [
      { name: 'Generator', available: true },
      { name: 'Pump', available: false },
      { name: 'Drill', available: true },
    ],
  });

  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleResourceSelect = (resource, category) => {
    setSelectedResource(resource);
    setSelectedCategory(category);
  };

  const handleResourceAvailability = (resource, category, availability) => {
    setResources({
      ...resources,
      [category]: resources[category].map((r) =>
        r.name === resource.name ? { ...r, available: availability } : r
      ),
    });
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-16 sm:ml-64 p-4 sm:p-8">
      
        <div className="p-4 sm:p-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-4 sm:mb-8">Resource Sharing Platform</h1>

          <div className="mb-4 sm:mb-8 flex flex-wrap space-x-2 sm:space-x-4">
            <button 
              className={`px-6 py-3 rounded-md transition duration-300 flex items-center ${selectedCategory === 'personnel' ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' : 'bg-white text-indigo-600 hover:bg-indigo-100'}`}
              onClick={() => setSelectedCategory('personnel')}
            >
              <FaUser className="mr-2" /> Personnel
            </button>
            <button 
              className={`px-6 py-3 rounded-md transition duration-300 flex items-center ${selectedCategory === 'skilledWorkers' ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' : 'bg-white text-indigo-600 hover:bg-indigo-100'}`}
              onClick={() => setSelectedCategory('skilledWorkers')}
            >
              <FaTools className="mr-2" /> Skilled Workers
            </button>
            <button 
              className={`px-6 py-3 rounded-md transition duration-300 flex items-center ${selectedCategory === 'unskilledWorkers' ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' : 'bg-white text-indigo-600 hover:bg-indigo-100'}`}
              onClick={() => setSelectedCategory('unskilledWorkers')}
            >
              <FaHardHat className="mr-2" /> Unskilled Workers
            </button>
            <button 
              className={`px-6 py-3 rounded-md transition duration-300 flex items-center ${selectedCategory === 'equipment' ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' : 'bg-white text-indigo-600 hover:bg-indigo-100'}`}
              onClick={() => setSelectedCategory('equipment')}
            >
              <FaTruck className="mr-2" /> Equipment
            </button>
            <button 
              className={`px-6 py-3 rounded-md transition duration-300 flex items-center ${selectedCategory === 'machinery' ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' : 'bg-white text-indigo-600 hover:bg-indigo-100'}`}
              onClick={() => setSelectedCategory('machinery')}
            >
              <FaCog className="mr-2" /> Machinery
            </button>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="w-full sm:w-1/3 bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-xl font-semibold text-indigo-800 mb-4">Resources</h2>
              <ul className="space-y-4">
                {selectedCategory && resources[selectedCategory].map((resource) => (
                  <li 
                    key={resource.name} 
                    className={`p-4 rounded-md cursor-pointer transition duration-300 ${selectedResource === resource ? 'bg-indigo-100' : 'bg-gray-50 hover:bg-gray-100'}`}
                    onClick={() => handleResourceSelect(resource, selectedCategory)}
                  >
                    <h3 className="text-lg font-semibold text-gray-800">{resource.name}</h3>
                    {resource.skill && <p className="text-sm text-gray-600">{resource.skill}</p>}
                    <p className={`text-sm ${resource.available ? 'text-green-600' : 'text-red-600'}`}>
                      {resource.available ? 'Available' : 'Not Available'}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full sm:w-2/3 bg-white rounded-lg shadow-md p-4 sm:p-6">
              {selectedResource ? (
                <div>
                  <h2 className="text-2xl font-bold text-indigo-800 mb-4">{selectedResource.name}</h2>
                  {selectedResource.skill && <p className="text-lg text-gray-600 mb-4">{selectedResource.skill}</p>}
                  <p className={`text-lg font-semibold mb-6 ${selectedResource.available ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedResource.available ? 'Available' : 'Not Available'}
                  </p>
                  <div className="space-x-4">
                    <button 
                      className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg transition duration-300"
                      onClick={() => handleResourceAvailability(selectedResource, selectedCategory, true)}
                    >
                      Make Available
                    </button>
                    <button 
                      className="bg-gradient-to-r from-red-400 to-red-500 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg transition duration-300"
                      onClick={() => handleResourceAvailability(selectedResource, selectedCategory, false)}
                    >
                      Make Unavailable
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-lg text-gray-600">Select a resource to view details</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
