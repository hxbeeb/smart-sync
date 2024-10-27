import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const [user, setUser] = useState({
    id: null,
    name: '',
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
      if (!user.name || !user.email || !user.password || !user.aadharId || !user.departmentName) {
        setError('Please fill in all the fields.');
        return;
      }

      const newUser = {
        name: user.name,
        email: user.email,
        password: user.password,
        aadharId: user.aadharId,
        departmentName: user.departmentName
      };

      const response = await axios.post('https://smart-sync-2hco.onrender.com/api/register', newUser);

      const token = response.data;
      const userEmail = response.data.user.email;
      const userDept = response.data.user.department;
      const userName = response.data.user.name;
      console.log(userEmail);
      console.log(userName);
      setSuccess('Login successful!');
      login(token, userEmail, userDept, userName);
      navigate('/dashboard');

      setUser({ id: null, name: '', email: '', password: '', aadharId: '', departmentName: '' });
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
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

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

          <select
            name="departmentName"
            value={user.departmentName}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select Department</option>
            <option>Roads & Buildings Department</option>
            <option>Electricity Department</option>
            <option>Irrigation and CAD Department</option>
            <option>Revenue Department</option>
            <option>Municipal Administration & Urban Development Department</option>
            <option>Health, Medical & Family Welfare Department</option>
            <option>Education Department</option>
            <option>Panchayat Raj and Rural Development Department</option>
            <option>Transport Department</option>
            <option>Agriculture and Cooperation Department</option>
            <option>Industries & Commerce Department</option>
            <option>Police Department</option>
            <option>Finance Department</option>
            <option>Women Development, Child Welfare & Disabled Welfare Department</option>
            <option>Housing Department</option>
            <option>Forest Department</option>
            <option>Labour, Employment, Training, and Factories Department</option>
            <option>Energy Department</option>
            <option>Tourism Department</option>
            <option>Information Technology, Electronics & Communications Department (ITE&C)</option>
            <option>Minorities Welfare Department</option>
            <option>Backward Classes Welfare Department</option>
            <option>Tribal Welfare Department</option>
            <option>Civil Supplies Department</option>
            <option>Animal Husbandry, Dairy Development, and Fisheries Department</option>
          </select>

          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-lg w-full hover:shadow-lg transition duration-300 ease-in-out font-semibold"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Already registered?{' '}
            <span
              className="text-indigo-600 cursor-pointer underline hover:text-indigo-800"
              onClick={() => navigate('/')}
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
