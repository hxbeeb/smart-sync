import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './SideBar';
import Kanban from './Kanban';
import Navbar from './Navbar';

const projects = [
  { id: 1, name: 'Infrastructure Upgrade', progress: 70, deadline: '2024-12-31' },
  { id: 2, name: 'Healthcare Initiative', progress: 40, deadline: '2024-09-30' }
];

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64"> {/* Ensure that ml-64 matches the sidebar width */}
        <Navbar />
        <div className="bg-gradient-to-r from-purple-300 via-blue-200 to-pink-300 p-8 min-h-screen">
          {/* Project Progress Section */}
          <div className="mb-8">
            <div className="max-w-7xl mx-auto">
              <header className="mb-8">
                <h1 className="text-4xl font-extrabold text-blue-800 text-center">Dashboard</h1>
                <p className="text-lg text-gray-600 text-center mt-2">
                  Track project progress, deadlines, and interdepartmental conflicts.
                </p>
              </header>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.id}`}
                    className="bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-l hover:from-blue-500 hover:to-green-400"
                  >
                    <h2 className="text-xl font-bold mb-2">{project.name}</h2>
                    <p className="text-sm">Deadline: {project.deadline}</p>

                    <div className="relative pt-4">
                      <div className="h-2 bg-gray-300 rounded-full">
                        <div
                          className="h-2 bg-blue-600 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-right text-sm mt-1">
                        {project.progress}% Complete
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Kanban Board */}
          <Kanban />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
