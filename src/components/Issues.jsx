import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IssueForm from './IssueForm';
import Sidebar from './Sidebar'; // Make sure to import your Sidebar component
import Navbar from './Navbar'; // If you have a Navbar, import it as well

const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [upvotedIssues, setUpvotedIssues] = useState({}); // To track upvoted issues

  // Fetch issues from the server
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('https://smart-sync-2hco.onrender.com/api/issues/all');
        const sortedIssues = response.data.sort((a, b) => b.votes - a.votes); // Sort by votes
        setIssues(sortedIssues);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };
    fetchIssues();
  }, []);

  // Refresh the issues list after a new issue is submitted
  const handleIssueSubmit = async () => {
    try {
      const response = await axios.get('https://smart-sync-2hco.onrender.com/api/issues/all');
      const sortedIssues = response.data.sort((a, b) => b.votes - a.votes);
      setIssues(sortedIssues);
    } catch (error) {
      console.error('Error refreshing issues:', error);
    }
  };

  // Handle upvote
  const handleUpvote = async (id) => {
    try {
      await axios.put(`https://smart-sync-2hco.onrender.com/api/issues/upvote/${id}`);
      const response = await axios.get('https://smart-sync-2hco.onrender.com/api/issues/all');
      const sortedIssues = response.data.sort((a, b) => b.votes - a.votes);
      setIssues(sortedIssues);

      // Mark issue as upvoted
      setUpvotedIssues((prevUpvotedIssues) => ({
        ...prevUpvotedIssues,
        [id]: true,
      }));
    } catch (error) {
      console.error('Error upvoting issue:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-purple-300 via-blue-200 to-pink-300">
      <Sidebar />
      <div className="flex-1 ml-64"> {/* Adjust ml-64 based on your sidebar width */}
       {/* Include Navbar if you have one */}
        <div className="p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Public Issues</h1>

          {/* Form for submitting new issues */}
          <IssueForm onIssueSubmit={handleIssueSubmit} />

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Reported Issues</h2>
            {issues.length === 0 ? (
              <p className="text-center">No issues reported yet.</p>
            ) : (
              <ul className="space-y-4">
                {issues.map((issue) => (
                  <li
                    key={issue._id}
                    className="relative p-4 border rounded-lg bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 hover:shadow-md hover:scale-105 transition duration-300 ease-in-out"
                  >
                    <h3 className="text-lg font-bold">{issue.title}</h3>
                    <p>{issue.description}</p>
                    <p className="text-sm text-gray-500">Posted by: {issue.postedBy}</p>
                    <p className="text-sm text-gray-500">Status: {issue.status}</p>
                    <p className="text-sm text-gray-500">
                      Date: {new Date(issue.datePosted).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">Votes: {issue.votes}</p>

                    {/* Upvote Button */}
                    <button
                      className="absolute bottom-2 right-2 focus:outline-none"
                      onClick={() => handleUpvote(issue._id)}
                    >
                      {upvotedIssues[issue._id] ? (
                        // Filled arrow if upvoted
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="black"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <path d="M12 2l6 12H6l6-12z" />
                        </svg>
                      ) : (
                        // Empty arrow if not upvoted
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          stroke="black"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <path d="M12 2l6 12H6l6-12z" />
                        </svg>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Issues;
