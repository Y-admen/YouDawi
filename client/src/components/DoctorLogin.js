import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/doctors';

const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await axios.post(`${API_URL}/login`, loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { token } = response.data.data;

      if (token) {
        localStorage.setItem('token', token);  // Fix token storage
        const doctorData = jwtDecode(token);
        console.log(doctorData.role);
        console.log(token);

        setMessage('Login successful!');
        navigate('/dashboard');  // Redirect to the doctor dashboard
      } else {
        setMessage('Login failed: Token not provided.');
      }
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
          <h2 className="text-5xl font-bold text-primary-30 text-center mb-1">Doctor Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label className="block mb-1 text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                className="w-full px-2 py-1 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700" htmlFor="password">
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

            {/* {message && <p className="mt-4 text-center text-red-500">{message}</p>} */}

            <div className="mt-2">
              <Link to="/forgot-password" className="ml-auto text-blue-500">
                Forgot Password?
              </Link>
            </div>
            <div className="flex justify-center mt-4">
              <span>Don't have an account?</span>
            </div>
            <div className="flex justify-center">
              <Link to="/doctor-register" className="text-blue-600 hover:underline">Sign Up</Link>
            </div>
          </form>
        </div>
        <div className="w-1/2 relative">
                    <img
                        src="trafalgar-illustration sec02 1.png"
                        alt="Transparent overlay"
                        className="relative z-10 mx-auto my-8 opacity-75"
                    />
                </div>
      </div>
    </div>
    </>
  );
};

export default DoctorLogin;
