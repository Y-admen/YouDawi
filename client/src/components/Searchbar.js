import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";


const SearchBar = ({ onSearch, placeholder = "Search" }) => {
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
    <div className="flex items-center w-2/4 pt-2  relative absolute inset-0 ">
      <input
        id="searchInput"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 rounded-full border-2 bg-gray-300 border-gray-300 bg-gray shadow-sm focus:outline-none outline-none"
        aria-label="Search input"
      />
      <button
        onClick={() => onSearch(searchTerm)}
        className="ml-2 px-4 py-2 bg-transparent text-gray rounded-full transition absolute top-2 bottom-0 right-0"
        aria-label="Search button"
      >
        <CiSearch />
      </button>
    </div>
  );
};

export default SearchBar;
