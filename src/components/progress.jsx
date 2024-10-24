import React, { useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { FaCheckCircle, FaExclamationTriangle, FaClock } from 'react-icons/fa';

const Progress = () => {
  const { departmentId, projectId } = useParams();
  const location = useLocation();
  const { Progress } = location.state || { overallProgress: 0 };

  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', workers: ['Worker A', 'Worker B'], startDate: '2024-10-01', endDate: '2024-10-07', progress: 80 },
    { id: 2, name: 'Task 2', workers: ['Worker C'], startDate: '2024-10-03', endDate: '2024-10-10', progress: 50 },
    { id: 3, name: 'Task 3', workers: ['Worker D'], startDate: '2024-09-25', endDate: '2024-10-05', progress: 100 },
  ]);

  const [newTask, setNewTask] = useState({
    name: '',
    workers: '',
    startDate: '',
    endDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (newTask.name && newTask.workers && newTask.startDate && newTask.endDate) {
      const newTaskData = {
        id: tasks.length + 1,
        name: newTask.name,
        workers: newTask.workers.split(',').map(worker => worker.trim()),
        startDate: newTask.startDate,
        endDate: newTask.endDate,
        progress: 0
      };

      setTasks([...tasks, newTaskData]);

      setNewTask({
        name: '',
        workers: '',
        startDate: '',
        endDate: ''
      });
    }
  };

  const isOverdue = (task) => {
    const today = new Date();
    return new Date(task.endDate) < today && task.progress < 100;
  };

  return (
    <div className="p-8 bg-gradient-to-r from-purple-300 via-blue-200 to-pink-300 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Project Progress Dashboard</h2>
        <Link to={`/projectss/${departmentId}/${projectId}/workers`}>
          <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:shadow-lg hover:from-green-500 hover:to-blue-600 transition duration-200">
            Workers
          </button>
        </Link>
      </div>

      <p className="text-lg mt-2 text-gray-600">Overall Project Completion: {Progress}%</p>
      <ProgressBar progress={Progress} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 mb-4 bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-xl font-semibold text-gray-800">{task.name}</h3>
            <p className="text-gray-600">Assigned Workers: {task.workers.join(', ')}</p>
            <p className="text-gray-600">Start Date: {task.startDate}</p>
            <p className="text-gray-600">End Date: {task.endDate}</p>
            <p className="text-gray-600">Progress: {task.progress}%</p>
            <div className={`absolute top-4 right-4 ${isOverdue(task) ? 'text-red-500' : task.progress === 100 ? 'text-green-500' : 'text-yellow-500'}`}>
              {task.progress === 100 ? <FaCheckCircle /> : isOverdue(task) ? <FaExclamationTriangle /> : <FaClock />}
            </div>
            <p className={`mt-2 ${isOverdue(task) ? 'text-red-500' : task.progress === 100 ? 'text-green-500' : 'text-yellow-500'}`}>
              {task.progress === 100 ? 'Completed' : isOverdue(task) ? 'Overdue' : 'In Progress'}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h3 className="text-xl font-bold mb-4 text-indigo-700">Add New Task</h3>
        <form onSubmit={handleAddTask}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Task Name
            </label>
            <input
              type="text"
              name="name"
              value={newTask.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter task name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workers">
              Assigned Workers
            </label>
            <input
              type="text"
              name="workers"
              value={newTask.workers}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter workers (comma-separated)"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={newTask.startDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
              Expected End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={newTask.endDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-md hover:shadow-lg hover:from-green-500 hover:to-blue-600 transition duration-200"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default Progress;
