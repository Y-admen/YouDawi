import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorsTable from './DoctorsTable';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('All');
  const [location, setLocation] = useState('All');

  // Fetch the list of doctors from a mock API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://api.practo.com/doctors/?page=1');
        setDoctors(response.data);
        setFilteredDoctors(response.data); // Initially set the filtered doctors to all doctors
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle specialty filter
  const handleSpecialtyChange = (event) => {
    setSpecialty(event.target.value);
  };

  // Handle location filter
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  // Get unique specialties for the dropdown
  const getSpecialties = () => {
    const specialties = ['All', ...new Set(doctors.map((doctor) => doctor.specialty))];
    return specialties;
  };

  // Get unique locations for the dropdown
  const getLocations = () => {
    const locations = ['All', ...new Set(doctors.map((doctor) => doctor.location))];
    return locations;
  };

  // Filter doctors based on search term, specialty, and location
  useEffect(() => {
    let filtered = doctors;

    if (specialty !== 'All') {
      filtered = filtered.filter((doctor) => doctor.specialty === specialty);
    }

    if (location !== 'All') {
      filtered = filtered.filter((doctor) => doctor.location === location);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  }, [searchTerm, specialty, location, doctors]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Doctors</h1>

      {/* Filters - aligned horizontally using flex */}
      <div className="flex space-x-4 mb-6">
        {/* Search by name or specialty */}
        <div className="w-full">
          <label htmlFor="search" className="block mb-2 text-lg font-medium text-gray-600">
            Search by Name or Specialty
          </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name or specialty"
            className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Specialty Filter Dropdown */}
        <div className="w-full">
          <label htmlFor="specialty" className="block mb-2 text-lg font-medium text-gray-600">
            Filter by Specialty
          </label>
          <select
            id="specialty"
            value={specialty}
            onChange={handleSpecialtyChange}
            className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {getSpecialties().map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter Dropdown */}
        <div className="w-full">
          <label htmlFor="location" className="block mb-2 text-lg font-medium text-gray-600">
            Filter by Location
          </label>
          <select
            id="location"
            value={location}
            onChange={handleLocationChange}
            className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {getLocations().map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Doctors List */}
      <ul className="space-y-6">
        {filteredDoctors.length === 0 ? (
          <p className="text-gray-500">No doctors available based on the selected filters.</p>
        ) : (
          filteredDoctors.map((doctor) => (
            <li key={doctor.id} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
              <p className="text-gray-600">Specialty: {doctor.specialty}</p>
              <p className="text-gray-600">Location: {doctor.location}</p>
              <p className="text-gray-600">Experience: {doctor.experience} years</p>
            </li>
          ))
        )}
      </ul>

      <DoctorsTable />
    </div>
  );
};

export default DoctorList;
