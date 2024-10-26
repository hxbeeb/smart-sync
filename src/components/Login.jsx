import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"; // Make sure to import axios
import { useAuth } from "./AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth(); // Add isLoggedIn from AuthContext
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    aadhar: "",
    biometric: "",
    captcha: ""
  });

  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Check if the user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard'); // Redirect to the dashboard if already logged in
    }
  }, [isLoggedIn, navigate]);

  function generateCaptcha() {
    const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }

  const handleCaptchaRefresh = () => {
    setCaptchaCode(generateCaptcha());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (!formData.email || !formData.password || !formData.aadhar ) {
        setError('Please fill in all the fields.');
        return;
      }

      const loginData = {
        email: formData.email,
        password: formData.password
      };

      console.log(loginData);

      const response = await axios.post('https://smart-sync-2hco.onrender.com/api/auth/login', loginData);

      if (response.status === 200) {
        const token = response.data;
        const userEmail = response.data.user.email;
        const userDept=response.date.user.departmentName;
        console.log(userEmail);
        setSuccess('Login successful!');
        login(token, userEmail,userDept); // Store token and user data
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-indigo-300 via-purple-300 to-blue-400">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <img
            alt="Gov of India Logo"
            src="https://img.freepik.com/premium-photo/picture-logo-indian-logo_987366-66746.jpg"
            className="mx-auto h-16 w-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Interdepartmental Portal Login
          </h2>
          <p className="mt-2 text-center text-sm text-orange-200">
            Please enter your details to access your account
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
          <form onSubmit={handleLogin} className="space-y-5 bg-gradient-to-r from-white via-indigo-50 to-purple-50 p-6 shadow-lg rounded-lg border-2 border-indigo-400">
            
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="aadhar" className="block text-sm font-medium text-gray-900">
                Aadhar ID
              </label>
              <div className="mt-1">
                <input
                  id="aadhar"
                  name="aadhar"
                  type="text"
                  value={formData.aadhar}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="biometric" className="block text-sm font-medium text-gray-900">
                Biometric Verification
              </label>
              <div className="mt-1">
                <button
                  type="button"
                  className="w-full h-50 flex justify-center rounded-md bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 px-4 py-4 text-white font-semibold shadow-sm hover:bg-gradient-to-r hover:from-indigo-400 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  SCAN
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="captcha" className="block text-sm font-medium text-gray-900">
                Captcha Verification
              </label>
              <div className="mt-1 flex items-center">
                <input
                  id="captcha"
                  name="captcha"
                  type="text"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                />
                <span className="ml-4 h-12 text-lg bg-gray-100 p-2">{captchaCode}</span>
                <button
                  type="button"
                  onClick={handleCaptchaRefresh}
                  className="ml-4 h-12 text-sm text-indigo-600 underline hover:text-indigo-800"
                >
                  Refresh Captcha
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center rounded-md bg-gradient-to-r from-green-400 to-green-600 px-4 py-2 text-white font-semibold shadow-sm hover:from-green-300 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
              >
                Sign in
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                New user?{' '}
                <span
                  className="text-indigo-600 cursor-pointer underline hover:text-indigo-800"
                  onClick={() => navigate("/register")}
                >
                  Register here
                </span>
              </p>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-white">
          For support, contact the Government Helpdesk.
        </p>
      </div>
    </>
  );
}
