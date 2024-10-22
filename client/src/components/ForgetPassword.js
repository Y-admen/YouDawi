import React from "react";
import Navbar from './Navbar';
import Footer_H from './Footer_H';
import './styles.css'; // Import your CSS file

function ForgetPassword() {
    return (
        <div id="root">
            <Navbar />
            <main>
                <form className="space-y-4 mt-4 flex text-justify">
                    <label className="text-8xl text-gray-700 p-6">Enter Your Email:</label>
                    <input className="w-80 h-1 border-4 border-gray-700 p-6 mt-1 focus:outline-none focus:border-blue-500" />
                    <div className="h-6 flex justify-center items-center">
                        <button type="submit" className="flex justify-center w-36 h-14 bg-red-600 text-white py-2 rounded ml-4 mt-8">Submit</button>
                    </div>
                </form>
            </main>
            <Footer_H />    
        </div>
    );
}

export default ForgetPassword;