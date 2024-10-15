import React from 'react';

function Input({ label, type, placeholder, name, value, onChange, required }) {
    return (
        <div className="mb-6">
            <label htmlFor={name} className="block mb-2 text-lg font-medium text-gray-600">
                {label}
            </label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className="block w-64 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required={required}
            />
        </div>
    );
}

export default Input;