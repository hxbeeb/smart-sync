import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const WorkerForm = ({ isEditing, currentWorker, onComplete, departmentId, projectId }) => {
  const { state } = useLocation(); // Get the state from the navigate function
  const { name, role, worked, completed, done } = state || {}; // Extract state values

  const [worker, setWorker] = useState({
    name: '',
    role: '',
    hoursWorked: 0,
    tasksCompleted: 0,
    tasksToBeDone: 1,
    departmentId,
    projectId,
  });

  // Update form when editing or reset when adding a new worker
  useEffect(() => {
    if (isEditing && currentWorker) {
      setWorker(currentWorker);
    } else if (state) {
      setWorker({
        name: name || '',
        role: role || '',
        hoursWorked: worked || 0,
        tasksCompleted: completed || 0,
        tasksToBeDone: done || 1,
        departmentId,
        projectId,
      });
    } else {
      setWorker({
        name: '',
        role: '',
        hoursWorked: 0,
        tasksCompleted: 0,
        tasksToBeDone: 1,
        departmentId,
        projectId,
      });
    }
  }, [isEditing, currentWorker, departmentId, projectId, state]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorker((prev) => ({
      ...prev,
      [name]: name === 'hoursWorked' || name === 'tasksCompleted' || name === 'tasksToBeDone' ? Number(value) : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newWorker = {
        name: worker.name,
        role: worker.role,
        completed: worker.tasksCompleted,
        done: worker.tasksToBeDone,
        worked: worker.hoursWorked,
      };
      if (isEditing) {
        // Update worker
        await axios.put(
          `https://smart-sync-2hco.onrender.com/api/projects/${departmentId}/${projectId}/workers/${currentWorker._id}`,
          newWorker
        );
        console.log('Worker updated');
      } else {
        // Add new worker
        await axios.post(
          `https://smart-sync-2hco.onrender.com/api/projects/${departmentId}/${projectId}/workers`,
          newWorker
        );
        console.log('Worker added');
      }
      onComplete(); // Notify parent component to refresh worker list
    } catch (error) {
      console.error('Failed to save worker:', error);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-md rounded-lg p-8 mb-6">
      <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Worker' : 'Add Worker'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={worker.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Role Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Role:</label>
          <input
            type="text"
            name="role"
            value={worker.role}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Hours Worked Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Hours Worked:</label>
          <input
            type="number"
            name="hoursWorked"
            value={worker.hoursWorked}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Tasks Completed Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Tasks Completed:</label>
          <input
            type="number"
            name="tasksCompleted"
            value={worker.tasksCompleted}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Tasks to be Done Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Tasks to be Done:</label>
          <input
            type="number"
            name="tasksToBeDone"
            value={worker.tasksToBeDone}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg hover:from-green-500 hover:to-blue-600 transition duration-300 ease-in-out"
        >
          {isEditing ? 'Update' : 'Add'} Worker
        </button>
      </form>
    </div>
  );
};

export default WorkerForm;
