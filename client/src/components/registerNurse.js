import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerNurse } from '../services/DoctorService';
import Navbar from '../components/Navbar';

const registerNurseForm = () => {

        return (<>
          <Navbar/>
          <div className="min-h-screen flex items-center rounded-2xl justify-center bg-primary-35">
          <div className="flex w-4/5 h-4/5 max-h-70 bg-white opacity-90 rounded-2xl shadow-lg overflow-hidden">
            <div className="w-1/2 p-8">
                    <h2 className="text-5xl font-bold text-primary-30 text-center mb-1">Register Nurse</h2>


                <form className="space-y-4">
                    {/* First Name */}
                    <div>
                        <label className="block mb-1 text-gray-700">First Name<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            className="w-full px-2 py-1 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block mb-1 text-gray-700">Last Name<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            className="w-full px-2 py-1 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-gray-700">Email<span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            className="w-full px-2 py-1 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div>
                    <label className="block mb-1 text-gray-700">Password<span className="text-red-500">*</span></label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className={`w-full px-2 py-1 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 `}
                        required
                    />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block mb-1 text-gray-700">Phone<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            className="w-full px-2 py-1 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Avatar */}
                    <div>
                        <label className="block mb-1 text-gray-700">Upload Avatar</label>
                        <input
                            type="file"
                            className="w-full px-2 py-1 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary-30 text-white py-1 rounded-lg font-semibold shadow-lg hover:bg-[#00263d] transition"
                    >
                        REGISTER
                    </button>
                </form>
                <div className="flex items-center my-2">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-2 text-gray-500">or</span>
                        <hr className="flex-grow border-gray-300" />
                </div>
                {/* Redirect to Login */}
                <div className="text-center mt-4">
                    <span className="text-gray-700">Already have an account?</span>
                    <Link to="/login" className="text-blue-500 ml-1">Sign In</Link>
                </div>
            </div>
            <div className="w-1/2 relative">
                    <img
                        src="Illustration.png"
                        alt="Transparent overlay"
                        className="relative z-10 mx-auto my-8 opacity-85"
                    />
                </div>
            </div>
        </div>
        </>
                    );
                };

export default registerNurseForm;
