import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar'; // Import your Sidebar component

const Disputes = () => {
  const navigate = useNavigate();
  const [disputes, setDisputes] = useState([]);
  const [dispute, setDispute] = useState({ title: '', description: '', hearingDate: '', parties: '', comments: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        const response = await axios.get(`https://smart-sync-2hco.onrender.com/api/disputes`);
        setDisputes(response.data);
      } catch (error) {
        console.error('Failed to fetch disputes:', error);
      }
    };

    fetchDisputes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDispute(prevDispute => ({
      ...prevDispute,
      [name]: value
    }));
  };

  const handleAddDispute = async () => {
    try {
      const newDispute = {
        title: dispute.title,
        description: dispute.description,
        hearingDate: dispute.hearingDate,
        parties: dispute.parties,
        comments: dispute.comments,
      };

      if (isEditing) {
        await axios.put(`https://smart-sync-2hco.onrender.com/api/disputes/${dispute.id}`, newDispute);
        setIsEditing(false);
      } else {
        await axios.post(`http://localhost:5000/api/disputes`, newDispute);
      }

      setDispute({ title: '', description: '', hearingDate: '', parties: '', comments: '' });
      const response = await axios.get(`https://smart-sync-2hco.onrender.com/api/disputes`);
      setDisputes(response.data);
    } catch (error) {
      console.error('Failed to add or update dispute:', error);
      alert('Failed to add or update dispute: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Ensure the sidebar is visible alongside the main content */}
      <div className="flex-grow p-8 bg-gradient-to-r from-purple-300 via-blue-200 to-pink-300 min-h-screen ml-64"> {/* Add left margin to avoid overlap */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Dispute Management</h2>

        <div className="mb-6 p-6 bg-white rounded-lg shadow-xl max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            {isEditing ? 'Edit Dispute' : 'Submit New Dispute'}
          </h3>
          <input
            type="text"
            name="title"
            value={dispute.title}
            onChange={handleInputChange}
            placeholder="Dispute Title"
            className="border border-gray-300 p-3 rounded-lg w-full mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="description"
            value={dispute.description}
            onChange={handleInputChange}
            placeholder="Dispute Description"
            className="border border-gray-300 p-3 rounded-lg w-full mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="date"
            name="hearingDate"
            value={dispute.hearingDate}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-lg w-full mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="parties"
            value={dispute.parties}
            onChange={handleInputChange}
            placeholder="Parties Involved"
            className="border border-gray-300 p-3 rounded-lg w-full mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="comments"
            value={dispute.comments}
            onChange={handleInputChange}
            placeholder="Additional Comments"
            className="border border-gray-300 p-3 rounded-lg w-full mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            onClick={handleAddDispute}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-lg w-full hover:shadow-lg hover:from-green-500 hover:to-blue-600 transition duration-300 ease-in-out font-semibold"
          >
            {isEditing ? 'Update Dispute' : 'Submit Dispute'}
          </button>
        </div>

        {/* Dispute List */}
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Dispute List</h3>
          <ul>
            {disputes.map((dispute) => (
              <li
                key={dispute._id}
                className="p-4 mb-4 bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 rounded-lg hover:shadow-md hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                onClick={() => navigate(`/disputes/${dispute._id}`, { state: { title: dispute.title, description: dispute.description } })}
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">{dispute.title}</span>
                  <span className="text-sm text-gray-600">Status: {dispute.status}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the list item click
                    navigate(`/disputes/${dispute._id}`, { state: { title: dispute.title, description: dispute.description } });
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
    </div>
  );
};

export default Disputes;
