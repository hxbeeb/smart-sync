import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './SideBar'; // Import your Sidebar component

const departments = [
  { id: '670b6fd0f66f94a7fe927396', name: 'Department of Health' },
  { id: '670b6ff5f66f94a7fe927397', name: 'Department of Education' },
  { id: '670b7007f66f94a7fe927398', name: 'Department of Agriculture' },
  { id: '670b7026f66f94a7fe927399', name: 'Department of Urban Development' },
  { id: '670b7041f66f94a7fe92739a', name: 'Department of Transport' },
  { id: '670b705cf66f94a7fe92739b', name: 'Department of Environment' },
];

const Departments = () => {
  const navigate = useNavigate();

  const handleDepartmentClick = (departmentId) => {
    navigate(`/projectss/${departmentId}`);
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Ensure the sidebar is visible alongside the main content */}
      <div className="flex-grow p-8 bg-gradient-to-r from-purple-300 via-blue-200 to-pink-300 min-h-screen ml-64"> {/* Added left margin */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Indian State Departments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department) => (
            <div
              key={department.id}
              className="bg-white rounded-lg shadow-xl p-6 cursor-pointer transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out"
              onClick={() => handleDepartmentClick(department.id)}
            >
              <h3 className="text-2xl font-semibold text-center text-gray-700 mb-4">{department.name}</h3>
              <p className="text-center text-gray-600">
                Explore projects and initiatives under {department.name}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Departments;
