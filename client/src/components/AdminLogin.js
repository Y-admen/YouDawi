import React, { useState } from 'react';
import Navbar from '../components/Navbar';


const AdminLogin = () => {

    return (
      <>
      <Navbar/>
        <div className="min-h-screen flex items-center justify-center bg-primary-35">

            <div className="flex w-4/5 h-4/5 max-h-70 bg-white opacity-90 rounded-2xl shadow-lg overflow-hidden">
                <div className="w-1/2 p-8">
                    <h3 className="text-5xl font-bold text-primary-30 text-center mb-1">Admin Login</h3>


                    <form className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block mb-1 text-gray-700">
                                Your Email<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
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
</>
    );
};

export default AdminLogin;
