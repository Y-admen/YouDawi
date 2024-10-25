import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import patientService from '../services/PatientService';
import Navbar from '../components/Navbar';
import { jwtDecode } from 'jwt-decode';


const Login = () => {
    const { register, handleSubmit } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const token = await patientService.loginPatient(data),
                patientData = jwtDecode(token);

            localStorage.setItem('token', token);
            console.log('patientData', patientData);

            console.log('token', token);
            // Redirect after successful login
            navigate('/patient-dashboard'); // adjust the route based on your app
        } catch (error) {
            // Handle login error, display the error message
            setErrorMessage(error.message || 'Failed to login. Please check your credentials.');
        }
    };

    return (
        <div className="bg-primary-30">
            <Navbar />
            <div className="min-h-screen flex items-center rounded-2xl justify-center bg-primary-35">

                <div className="flex w-4/5 h-4/5 max-h-70 bg-white opacity-90 rounded-2xl shadow-lg overflow-hidden">
                    <div className="w-1/2 p-8">
                        <h3 className="text-5xl font-bold text-primary-30 text-center mb-1">Login</h3>


                        {errorMessage && (
                            <div className="bg-red-100 text-red-600 border border-red-400 px-4 py-2 rounded mb-2">
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label className="block mb-1 text-gray-700">
                                    Your Email<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    {...register('email', { required: true })}
                                    className="w-full px-2 py-1 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block mb-1 text-gray-700">
                                    Password<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    {...register('password', { required: true })}
                                    className="w-full px-2 py-1 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="w-full bg-primary-30 text-white py-1 rounded-lg font-semibold shadow-lg hover:bg-[#00263d] transition">
                                LOGIN
                            </button>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center mt-2">
                                <input type="checkbox" className="mr-2" />
                                <label className="text-gray-700">Remember Me</label>
                                <a href="/forget-password" className="ml-auto text-blue-500">
                                    Forgot Your Password?
                                </a>
                            </div>
                        </form>



                        {/* Redirect to Register */}
                        <div className="flex items-center my-2">
                            <hr className="flex-grow border-gray-300" />
                            <span className="mx-2 text-gray-500">or</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>
                        <div className="text-center mt-2">
                            <span className="text-gray-700">New User?</span>
                            <a href="/register" className="text-blue-500 ml-1">
                                Sign Up
                            </a>
                        </div>
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
        </div>
    );
};

export default Login;
