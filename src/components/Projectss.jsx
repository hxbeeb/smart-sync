import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';

const Projectss = () => {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({ 
    id: null, 
    name: '', 
    progress: '', 
    departmentId: departmentId,
    startDate: '', // New start date field
    endDate: ''    // New end date field
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch projects from the backend
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`https://smart-sync-2hco.onrender.com/api/projects/${departmentId}`);
        setProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, [departmentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject(prevProject => ({
      ...prevProject,
      [name]: name === 'progress' ? Number(value) : value // Ensure progress is a number
    }));
  };

  const handleAddProject = async () => {
    try {
      const newProject = {
        name: project.name,
        progress: project.progress,
        startDate: project.startDate, // Include start date
        endDate: project.endDate       // Include end date
      };

      if (isEditing) {
        await axios.put(`https://smart-sync-2hco.onrender.com/api/projects/${departmentId}/${project.id}`, newProject);
        setIsEditing(false);
      } else {
        await axios.post(`https://smart-sync-2hco.onrender.com/api/projects/${departmentId}`, newProject);
      }

      setProject({ id: null, name: '', progress: 0, departmentId: departmentId, startDate: '', endDate: '' });

      const response = await axios.get(`https://smart-sync-2hco.onrender.com/api/projects/${departmentId}`);
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to add or update project:', error);
      alert('Failed to add or update project: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-8 bg-gradient-to-r from-purple-300 via-blue-200 to-pink-300 min-h-screen ml-64">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Department Projects</h2>

        {/* Container for Button and Form */}
        <div className="flex flex-col items-center mb-6">
          <button
            onClick={() => window.location.href = 'https://e2rna7cdzpmddlkmdxoc3w.streamlit.app/'}
            className="bg-gradient-to-r from-red-400 to-yellow-500 text-white p-3 rounded-lg w-full max-w-2xl mb-4 hover:shadow-lg hover:from-red-500 hover:to-yellow-600 transition duration-300 ease-in-out font-semibold pl-8"
          >
            Check Conflicts
          </button>

          <div className="p-6 bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              {isEditing ? 'Edit Project' : 'Add New Project'}
            </h3>
            <input
              type="text"
              name="name"
              value={project.name}
              onChange={handleInputChange}
              placeholder="Project Name"
              className="border border-gray-300 p-3 rounded-lg w-full mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="number"
              name="progress"
              value={project.progress}
              onChange={handleInputChange}
              placeholder="Progress (%)"
              className="border border-gray-300 p-3 rounded-lg w-full mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              min="0"
              max="100"
            />
            <input
              type="date"
              name="startDate"
              value={project.startDate}
              onChange={handleInputChange}
              placeholder="Start Date"
              className="border border-gray-300 p-3 rounded-lg w-full mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="date"
              name="endDate"
              value={project.endDate}
              onChange={handleInputChange}
              placeholder="End Date"
              className="border border-gray-300 p-3 rounded-lg w-full mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              onClick={handleAddProject}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-lg w-full hover:shadow-lg hover:from-green-500 hover:to-blue-600 transition duration-300 ease-in-out font-semibold"
            >
              {isEditing ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </div>

        {/* Project List */}
        <ul className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          {projects.map((project) => (
            <li
              key={project._id}
              className="p-4 mb-4 bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 rounded-lg hover:shadow-md hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
              onClick={() => navigate(`/projectss/${departmentId}/${project._id}/progress`, {
                state: {
                  Progress: project.progress
                }
              })}
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">{project.name}</span>
                <span className="text-sm text-gray-600">Progress: {project.progress}%</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/projectss/${departmentId}/${project._id}`, { state: { name: project.name, progress: project.progress } });
                }}
                className="text-sm text-blue-500 hover:underline mt-2 block"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projectss;
