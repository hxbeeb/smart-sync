import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [user, setUser] = useState({id:null,
    email: '',
    password: '',
    aadharId: '',
    departmentName: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Validate fields before sending the request
      if (!user.email || !user.password || !user.aadharId || !user.departmentName) {
        setError('Please fill in all the fields.');
        return;
      }
      const newUser = {
        email: user.email,
        password:user.password,
        aadharId:user.aadharId,
        departmentName:user.departmentName
      };
      console.log(newUser);
      // Example API endpoint for registration
      await axios.post('https://smart-sync-2hco.onrender.com:5000/api/register', newUser);
      
      setSuccess('Registration successful!');
      setUser({ id:null,email: '', password: '', aadharId: '', departmentName: '' });
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-green-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        {error && <div className="bg-red-200 text-red-700 p-2 mb-4 rounded">{error}</div>}
        {success && <div className="bg-green-200 text-green-700 p-2 mb-4 rounded">{success}</div>}

        <form onSubmit={handleRegister}>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="text"
            name="aadharId"
            value={user.aadharId}
            onChange={handleInputChange}
            placeholder="Aadhar ID"
            className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="text"
            name="departmentName"
            value={user.departmentName}
            onChange={handleInputChange}
            placeholder="Department Name"
            className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-lg w-full hover:shadow-lg transition duration-300 ease-in-out font-semibold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
