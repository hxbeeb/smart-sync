import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkerForm from './WorkerForm'; // Keep the import for the form
import { useParams, useNavigate } from 'react-router-dom';

function Workers() {
  const { departmentId, projectId } = useParams();
  const [workers, setWorkers] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const navigate = useNavigate(); 

  // Fetch workers from the server
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get(`https://smart-sync-2hco.onrender.com:5000/api/projects/${departmentId}/${projectId}/workers`);
        setWorkers(response.data);
      } catch (error) {
        console.error('Failed to fetch workers:', error);
      }
    };
    fetchWorkers();
  }, [departmentId, projectId]);

  // Navigate to WorkerForm page for editing
  const handleEditWorker = (worker) => {
    navigate(`/projectss/${departmentId}/${projectId}/${worker._id}`, {
      state: {
        name: worker.name,
        role: worker.role,
        done: worker.done,
        completed: worker.completed,
        worked: worker.worked
      }
    });
  };

  // Handle form submission complete
  const handleFormComplete = (newWorker) => {
    setWorkers((prev) => [...prev, newWorker]); // Add the new worker to the list
    setShowModal(false); // Close modal after adding the worker
    window.location.reload();
  };

  return (
    <div className="p-8 bg-gradient-to-r from-purple-300 via-blue-200 to-pink-300 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Workers List</h1>

      {/* Add Worker Button */}
      <div className="text-center mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg hover:from-green-500 hover:to-blue-600 transition duration-300 ease-in-out"
        >
          Add Worker
        </button>
      </div>

      {/* Add Worker Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Worker</h2>
            <WorkerForm onComplete={handleFormComplete} departmentId={departmentId} projectId={projectId} />
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-lg mx-auto bg-white shadow-md rounded-lg p-8 mt-6">
        {workers.length === 0 ? (
          <p className="text-center">No workers found</p>
        ) : (
          <ul>
            {workers.map((worker) => (
              <li key={worker._id} className="mb-4 p-4 border rounded-lg bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 hover:shadow-md hover:scale-105 transition duration-300 ease-in-out">
                <p><strong>Name:</strong> {worker.name}</p>
                <p><strong>Role:</strong> {worker.role}</p>
                <p><strong>Hours Worked:</strong> {worker.worked}</p>
                <p><strong>Tasks Completed:</strong> {worker.completed}</p>
                <p><strong>Tasks to be Done:</strong> {worker.done}</p>
                <button
                  onClick={() => handleEditWorker(worker)}
                  className="mt-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold py-1 px-3 rounded-lg hover:shadow-lg hover:from-yellow-500 hover:to-yellow-600 transition duration-300 ease-in-out"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Workers;
