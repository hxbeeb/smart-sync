import React, { useState } from 'react';
import axios from 'axios';

const IssueForm = ({ onIssueSubmit }) => {
  const [issue, setIssue] = useState({
    title: '',
    description: '',
    postedBy: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssue({ ...issue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/issues/submit', issue);
      onIssueSubmit();
      alert('Issue submitted successfully');
      setIssue({ title: '', description: '', postedBy: '' });
    } catch (error) {
      alert('Error submitting issue');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Post a New Issue</h3>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={issue.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter issue title"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
        <textarea
          name="description"
          value={issue.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Describe the issue"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Posted By</label>
        <input
          type="text"
          name="postedBy"
          value={issue.postedBy}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Your name"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg hover:from-green-500 hover:to-blue-600 transition duration-300 ease-in-out"
      >
        Submit Issue
      </button>
    </form>
  );
};

export default IssueForm;
