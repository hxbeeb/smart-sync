import React, { useState } from "react";
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';

// Initial project tasks data
const initialColumns = {
  "To Do": [
    { id: 1, title: "Design Wireframes", description: "Create initial wireframes for the platform" },
    { id: 2, title: "Write User Stories", description: "Prepare user stories for the development team" }
  ],
  "In Progress": [
    { id: 3, title: "Backend API", description: "Develop the API for user authentication" },
  ],
  "Done": [
    { id: 4, title: "UI Design", description: "Complete the UI design for the dashboard" }
  ]
};

const columnColors = {
  "To Do": "bg-red-100 border-red-300",
  "In Progress": "bg-yellow-100 border-yellow-300",
  "Done": "bg-green-100 border-green-300"
};

export default function Kanban() {
  const [columns, setColumns] = useState(initialColumns);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [addingTo, setAddingTo] = useState(null);

  const handleDragStart = (event, task, columnName) => {
    event.dataTransfer.setData("task", JSON.stringify({ task, columnName }));
  };

  const handleDrop = (event, columnName) => {
    const { task, columnName: sourceColumn } = JSON.parse(event.dataTransfer.getData("task"));
    if (sourceColumn !== columnName) {
      const sourceTasks = columns[sourceColumn].filter((item) => item.id !== task.id);
      const updatedColumns = {
        ...columns,
        [sourceColumn]: sourceTasks,
        [columnName]: [...columns[columnName], task],
      };
      setColumns(updatedColumns);
    }
  };

  const allowDrop = (event) => event.preventDefault();

  const handleAddTask = (columnName) => {
    if (newTask.title.trim() !== "") {
      const task = { id: Date.now(), ...newTask };
      setColumns({
        ...columns,
        [columnName]: [...columns[columnName], task],
      });
      setNewTask({ title: "", description: "" });
      setAddingTo(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6 sm:px-8 lg:px-12">
      <h1 className="text-4xl font-bold text-indigo-600 text-center mb-8"> Project Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.keys(columns).map((columnName) => (
          <div key={columnName} className={`rounded-lg shadow-lg p-4 ${columnColors[columnName]} border-2`}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{columnName}</h2>
            <div
              onDrop={(event) => handleDrop(event, columnName)}
              onDragOver={allowDrop}
              className="min-h-[300px] p-2 bg-white rounded-lg"
            >
              {columns[columnName].map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-4 mb-4 rounded-lg shadow border-2 border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-move"
                  draggable
                  onDragStart={(event) => handleDragStart(event, task, columnName)}
                >
                  <h3 className="text-lg font-bold text-indigo-700">{task.title}</h3>
                  <p className="text-gray-600 mt-2">{task.description}</p>
                </div>
              ))}
              {addingTo === columnName ? (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Task title"
                    className="w-full p-2 mb-2 border rounded"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                  <textarea
                    placeholder="Task description"
                    className="w-full p-2 mb-2 border rounded"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleAddTask(columnName)}
                      className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setAddingTo(null)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setAddingTo(columnName)}
                  className="w-full mt-4 bg-white border-2 border-dashed border-gray-300 p-2 rounded-lg text-gray-500 hover:bg-gray-50 flex items-center justify-center"
                >
                  <PlusIcon className="h-5 w-5 mr-2" /> Add Task
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
