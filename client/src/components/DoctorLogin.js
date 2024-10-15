import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginDoctor } from '../services/DoctorService';  // Import the login service

const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // To redirect after login

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,  // Email from state
      password // Password from state
    };

    try {
      const response = await loginDoctor(loginData);  // Pass loginData as an object
      setMessage('Login successful!');
      
      // Save the token or any other information if needed
      localStorage.setItem('doctorToken', response.data.token); // Access token correctly
      console.log(response);

      // Redirect to the dashboard or home page after successful login
      navigate('/home');  
    } catch (error) {
      setMessage('Error logging in: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-50 w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Doctor Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

          {message && <p className="mt-4 text-center text-red-500">{message}</p>}  {/* Display login error or success message */}

          <div className="text-center mt-4">
            <a href="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          <div className="flex justify-center mt-4">
            Or
          </div>
          <div className="flex justify-center">
            <Link to="/doctor-register">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;
