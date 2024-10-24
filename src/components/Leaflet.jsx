import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

// Component to handle map zoom and center
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const Leaflet = () => {
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      name: 'Delhi Metro Expansion', 
      location: [28.6139, 77.2090], 
      status: 'In Progress',
      state: 'Delhi',
      stakeholders: ['Delhi Metro Rail Corporation', 'Delhi Government'],
      budget: '₹ 25,000 crore',
      timelineStart: '2021-01-01',
      timelineEnd: '2024-12-31',
    },
    { 
      id: 2, 
      name: 'Delhi Smart City Project', 
      location: [28.7041, 77.1025], 
      status: 'Planning',
      state: 'Delhi',
      stakeholders: ['New Delhi Municipal Council', 'Ministry of Urban Development'],
      budget: '₹ 1,900 crore',
      timelineStart: '2022-06-01',
      timelineEnd: '2025-05-31',
    },
  ]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]); // Center of Delhi
  const [mapZoom, setMapZoom] = useState(10);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    location: [28.6139, 77.2090],
    status: 'Planning',
    state: 'Delhi',
    stakeholders: '',
    budget: '',
    timelineStart: '',
    timelineEnd: '',
  });

  const handleMarkerClick = (project) => {
    setSelectedProject(project);
    setMapCenter(project.location);
    setMapZoom(12);
  };

  const handleListItemClick = (project) => {
    setSelectedProject(project);
    setMapCenter(project.location);
    setMapZoom(12);
  };

  const handleAction = (action) => {
    alert(`Action ${action} taken on project: ${selectedProject.name}`);
  };

  const handleAddProject = () => {
    setIsAddingProject(true);
    setSelectedProject(null);
  };

  const handleNewProjectChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const handleNewProjectSubmit = (e) => {
    e.preventDefault();
    const id = projects.length + 1;
    const newProjectData = {
      ...newProject,
      id,
      location: [parseFloat(newProject.location[0]), parseFloat(newProject.location[1])],
      stakeholders: newProject.stakeholders.split(',').map(s => s.trim()),
    };
    setProjects(prev => [...prev, newProjectData]);
    setIsAddingProject(false);
    setNewProject({
      name: '',
      location: [28.6139, 77.2090],
      status: 'Planning',
      state: 'Delhi',
      stakeholders: '',
      budget: '',
      timelineStart: '',
      timelineEnd: '',
    });
  };

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center py-4 bg-blue-600 text-white">Government Projects in Delhi</h1>
      <div className="flex-grow flex">
        <div className="w-1/2 relative">
          <MapContainer center={mapCenter} zoom={mapZoom} className="h-full">
            <MapController center={mapCenter} zoom={mapZoom} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {projects.map((project) => (
              <Marker 
                key={project.id} 
                position={project.location}
                eventHandlers={{
                  click: () => handleMarkerClick(project),
                }}
              >
                <Popup>{project.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <div className="w-1/2 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Project List</h2>
            <button
              onClick={handleAddProject}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Add New Project
            </button>
          </div>
          {isAddingProject ? (
            <form onSubmit={handleNewProjectSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={newProject.name}
                onChange={handleNewProjectChange}
                placeholder="Project Name"
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex space-x-2">
                <input
                  type="number"
                  name="location[0]"
                  value={newProject.location[0]}
                  onChange={handleNewProjectChange}
                  placeholder="Latitude"
                  className="w-1/2 p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  name="location[1]"
                  value={newProject.location[1]}
                  onChange={handleNewProjectChange}
                  placeholder="Longitude"
                  className="w-1/2 p-2 border rounded"
                  required
                />
              </div>
              <select
                name="status"
                value={newProject.status}
                onChange={handleNewProjectChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <input
                type="text"
                name="stakeholders"
                value={newProject.stakeholders}
                onChange={handleNewProjectChange}
                placeholder="Stakeholders (comma-separated)"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="budget"
                value={newProject.budget}
                onChange={handleNewProjectChange}
                placeholder="Budget"
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex space-x-2">
                <input
                  type="date"
                  name="timelineStart"
                  value={newProject.timelineStart}
                  onChange={handleNewProjectChange}
                  className="w-1/2 p-2 border rounded"
                  required
                />
                <input
                  type="date"
                  name="timelineEnd"
                  value={newProject.timelineEnd}
                  onChange={handleNewProjectChange}
                  className="w-1/2 p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Add Project
              </button>
            </form>
          ) : (
            <ul className="space-y-4">
              {projects.map((project) => (
                <li 
                  key={project.id} 
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedProject && selectedProject.id === project.id
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => handleListItemClick(project)}
                >
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p className="text-gray-600">Status: {project.status}</p>
                  <p className="text-gray-600">State: {project.state}</p>
                  <p className="text-gray-600">Budget: {project.budget}</p>
                  <p className="text-gray-600">Timeline: {project.timelineStart} to {project.timelineEnd}</p>
                  {selectedProject && selectedProject.id === project.id && (
                    <div className="mt-2 space-x-2">
                      <button
                        onClick={() => handleAction('view')}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleAction('monitor')}
                        className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                      >
                        Live Monitor
                      </button>
                      <button
                        onClick={() => handleAction('call')}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                      >
                        Call Supervisor
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaflet;