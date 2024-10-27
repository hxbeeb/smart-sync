import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './SideBar';
import Kanban from './Kanban';
import Navbar from './Navbar';
import axios from 'axios';
import { useAuth } from './AuthContext';

const departments = [
  { id: '670b6fd0f66f94a7fe927396', name: 'Department of Health' },
  { id: '670b6ff5f66f94a7fe927397', name: 'Department of Education' },
  { id: '670b7007f66f94a7fe927398', name: 'Department of Agriculture' },
  { id: '670b7026f66f94a7fe927399', name: 'Department of Urban Development' },
  { id: '670b7041f66f94a7fe92739a', name: 'Roads & Buildings Department' },
  { id: '670b705cf66f94a7fe92739b', name: 'Department of Environment' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userDept } = useAuth();

  // Select department based on userDept or default to the first department
  const selectedDepartment = departments.find((dept) => dept.name === userDept) || departments[0];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `https://smart-sync-2hco.onrender.com/api/projects/${selectedDepartment.id}`
        );
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selectedDepartment.id]);

  const handleAddProject = () => {
    navigate(`/projectss/${selectedDepartment.id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow bg-gradient-to-r from-gray-300 to-white min-h-screen ml-64"> {/* Changed to grey to white gradient */}
        <Navbar />
        <div className="px-8 py-4">
          <h1 className="text-5xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
            Dashboard
          </h1>

          {/* Add Project Button */}
          <div className="mb-6 text-center">
            <button
              onClick={handleAddProject}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Add Project
            </button>
          </div>

          {/* Project Progress Section */}
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-blue-800 capitalize">
              {userDept || 'Department Progress'}
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Track project progress, deadlines, and interdepartmental conflicts.
            </p>
          </header>

          {/* Projects Display */}
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => navigate(`/projectss/${selectedDepartment.id}/${project._id}`, { state: { name: project.name, progress: project.progress } })}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-l hover:from-blue-500 hover:to-green-400 cursor-pointer"
              >
                <h2 className="text-xl font-bold mb-2">{project.name}</h2>
                <div className="relative pt-4">
                  <div className="h-2 bg-gray-300 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-sm mt-1">{project.progress}% Complete</p>
                </div>
              </div>
            ))}
          </div>
          
          ) : (
            <p className="text-center text-gray-500">No projects available at the moment.</p>
          )}

          {/* Kanban Board */}
          <Kanban />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
