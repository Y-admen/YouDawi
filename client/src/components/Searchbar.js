import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";



const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  // Debounce the input (delay search execution by 300ms after user stops typing)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    // Cleanup the timeout when input changes before delay ends
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Trigger the search callback when debouncedTerm changes
  useEffect(() => {
    if (debouncedTerm) {
      onSearch(debouncedTerm);
    }
  }, [debouncedTerm, onSearch]);

  return (
    <div className="flex items-center w-full relative absolute inset-0 ">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none outline-none"
        aria-label="Search input"
      />
      <button
        onClick={() => onSearch(searchTerm)}
        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition absolute top-0 bottom-0 right-0"
        aria-label="Search button"
      >
        <CiSearch />
      </button>
    </div>
  );
};

export default SearchBar;
