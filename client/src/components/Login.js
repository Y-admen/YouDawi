import React from 'react';


function Login() {
    return (
        <div className="mx-auto max-w-4xl max-h-60  bg-white shadow-md p-10">
            <div className="bg-blue-600 text-white text-center py-2 rounded-t-lg">
                <h2 className="text-lg font-semibold">Login</h2>
            </div>
            <form className="space-y-4 mt-4">
                <div>
                    <label className="block text-gray-700">Your Email<span className="text-red-500">*</span></label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                    <label className="block text-gray-700">Password<span className="text-red-500">*</span></label>
                    <input type="password" className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500" />
                </div>
                <button type="submit" className="w-full bg-red-600 text-white py-2 rounded mt-4">LOGIN</button>
                <div className="flex items-center mt-2">
                    <input type="checkbox" className="mr-2" />
                    <label className="text-gray-700">Remember Me</label>
                    <a href="/" className="ml-auto text-blue-500">Forgot Your Password?</a>
                </div>
            </form>
            <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-gray-500">or</span>
                <hr className="flex-grow border-gray-300" />
            </div>
            <div className="text-center mt-4">
                <span className="text-gray-700">New User ?</span>
                <a href="/" className="text-blue-500 ml-1">Sign Up</a>
            </div>
           
        </div>
    );
}

export default Login;