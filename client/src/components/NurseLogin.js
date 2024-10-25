import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import nurseService from '../services/NurseService';
import Navbar from '../components/Navbar';

const NurseLogin = () => {
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
      const response = await nurseService.loginNurse(loginData);  // Pass loginData as an object
      setMessage('Login successful!');

      // Save the token or any other information if needed
      localStorage.setItem('token', response.data.token); // Access token correctly
      console.log(response);

      // Redirect to the dashboard or home page after successful login
      navigate('/dashboard');
    } catch (error) {
      setMessage('Error registering doctor: ' + (error.response && error.response.data ? error.response.data.message : error.message));
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center rounded-2xl bg-primary-35">
      <div className="flex w-4/5 h-4/5 max-h-70 bg-white opacity-90 rounded-2xl shadow-lg overflow-hidden">
      <div className="w-1/2 p-8">
        <h2 className="text-5xl font-bold text-primary-30 text-center mt-2 mb-2">Nurse Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="">
            <label className="block mb-2 text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-2 py-1 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-2 py-1 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-30 text-white py-1 rounded-lg font-semibold shadow-lg hover:bg-[#00263d] transition"
          >
            Login
          </button>

          {/* {message && <p className="mt-4 text-center text-red-500">{message}</p>}  Display login error or success message */}

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center mt-3">
                <input type="checkbox" className="mr-2" />
                <label className="text-gray-700">Remember Me</label>
                    <a href="/forget-password" className="ml-auto text-blue-500">
                          Forgot Your Password?
                    </a>
            </div>
        </form>
      </div>
      <div className="w-1/2 relative">
                    <img
                        src="Illustration.png"
                        alt="Transparent overlay"
                        className="relative rounded-2xl z-10 mx-auto my-8 opacity-90"
                    />
                </div>
      </div>
    </div>
    </>
  );
};

export default NurseLogin;
