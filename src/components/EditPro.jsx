import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditPro = () => {
  const { departmentId, projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { name, progress } = location.state || {};
  const [project, setProject] = useState({ name: name || '', progress: progress || 0 });
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`https://smart-sync-2hco.onrender.com/api/projects/${departmentId}/${projectId}`);
        setProject(response.data); // Load project data into form
      } catch (error) {
        console.error('Failed to fetch project:', error);
        setErrorMessage('Error loading project data.');
      }
    };

    if (!name || !progress) {
      fetchProject();
    }
  }, [departmentId, projectId, name, progress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: name === 'progress' ? parseInt(value) : value,
    }));
  };

  const handleUpdateProject = async () => {
    if (!project.name) {
      setErrorMessage('Project name is required.');
      return;
    }

    try {
      const updatedProject = {
        name: project.name,
        progress: project.progress,
      };

      await axios.put(`https://smart-sync-2hco.onrender.com/api/projects/${departmentId}/${projectId}`, updatedProject);
      navigate(`/projectss/${departmentId}`);
    } catch (error) {
      console.error('Failed to update project:', error);
      setErrorMessage('Failed to update project: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Edit Project</h3>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Project Name
          </label>
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleInputChange}
            placeholder="Project Name"
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="progress">
            Progress (%)
          </label>
          <input
            type="number"
            name="progress"
            value={project.progress}
            onChange={handleInputChange}
            placeholder="Progress (%)"
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            max="100"
          />
        </div>

        <button
          onClick={handleUpdateProject}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full font-semibold"
        >
          Update Project
        </button>
      </div>
    </div>
  );
};

export default EditPro;
