import React from 'react';

function Switch({ label, name, checked, onChange }) {
    return (
        <div className="flex items-center">
            <input
                id={name}
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor={name} className="ml-3 text-sm font-medium text-gray-600">
                {label}
            </label>
        </div>
    );
}

export default Switch;