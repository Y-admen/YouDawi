import React from 'react';

function ConfirmNewPassword() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-lg shadow-md w-80"> {/* Decreased width */}
        <h2 className="text-5xl font-bold mb-2 text-center">Change your password</h2> {/* Adjusted font size */}
        <p className="text-gray-600 text-center mb-6">Enter a new password below to change your password</p>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">New password:</label>
          <div className="relative">
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <i className="fas fa-eye absolute right-3 top-3 text-gray-500"></i>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Confirm password:</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <button className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition duration-200">
          Change password
        </button>
      </div>
    </div>
  );
}

export default ConfirmNewPassword;
