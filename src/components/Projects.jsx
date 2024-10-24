import React, { useState } from "react";
import Navbar from "./Navbar";
// Sample project data (replace with actual data)
const initialProjects = [
  {
    id: 1,
    name: "Govt Roadworks At Hyderabad -Necklace road",
    description: "Roadworks for constructing race track",
    created_at: "2024-09-01",
    link: "/projects/necklace-road",
    code: "// write relevant details...",
  },
  // ... other projects ...
];

export default function Projects() {

  const [projects, setProjects] = useState(initialProjects);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [selectedProject, setSelectedProject] = useState(null);

  const handleAddProject = (e) => {
    e.preventDefault();
    const project = {
      id: projects.length + 1,
      ...newProject,
      created_at: new Date().toISOString().split('T')[0],
      link: `/projects/${newProject.name.toLowerCase().replace(/\s+/g, '-')}`,
      code: "// New project code...",
    };
    setProjects([...projects, project]);
    setNewProject({ name: "", description: "" });
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 py-12 px-6 sm:px-8 lg:px-12">
      {/* Page Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">Projects</h1>
        <p className="text-lg text-gray-600">
          Browse through our most recent projects and add new ones.
        </p>
      </header>

      {/* Add New Project Form */}
      <form onSubmit={handleAddProject} className="mb-12 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Project Name"
          value={newProject.name}
          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <textarea
          placeholder="Project Description"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
          Add Project
        </button>
      </form>

      {/* Project List */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-3">{project.name}</h2>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <p className="text-sm text-gray-500">
                  Created on:{" "}
                  <span className="font-semibold text-gray-800">{new Date(project.created_at).toLocaleDateString()}</span>
                </p>
              </div>
              <div className="bg-indigo-700 text-center py-3">
                <span className="text-white font-semibold">Click to View bRIEF </span>
              </div>
            </div>
          ))}
      </div>

      {/* Project Code Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedProject.name} - Code</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              <code>{selectedProject.code}</code>
            </pre>
            <button
              onClick={() => setSelectedProject(null)}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
