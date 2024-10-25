import React, { useState } from "react";
import myImage2 from '../pics/banner1.jpg';
import { getPublicDoctorsBy } from '../services/DoctorService';

const cities = [
  'Alexandria', 'Aswan', 'Abydos', 'Avaris', 'Port Said', 'Faiyum',
  'Elephantine', 'Amarna', 'Asyut', 'Giza', 'Luxor', 'Heliopolis',
  'Sharm El-Sheikh', 'El-Mansoura', 'Akhetaten', 'Crocodiloplis city',
  'Cairo', 'Minya', 'Thebes', 'Memphis', 'Zagazig', 'Edfu',
  'Al Mahallah Al Kubra', 'Hermopolis'
];

const specializations = [
  'Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology', 'General Practice', 
  'Neurology', 'Oncology', 'Orthopedics', 'Pediatrics', 'Psychiatry', 'Pulmonology'
];

function Banner() {
  const [specialty, setSpecialty] = useState('');
  const [doctor, setDoctor] = useState('');
  const [location, setLocation] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    try {
      const results = await getPublicDoctorsBy(specialty, doctor, location);
      const doctorsList = results.data.doctors;

      if (doctorsList.length === 0) {
        setDoctors([]);
        setShowResults(false); // Hide results box if no doctors are found
        console.log('No doctors found with the provided criteria');
      } else {
        setDoctors(doctorsList);
        setShowResults(true); // Show results box if doctors are found
        console.log('Search Results:', doctorsList);
      }
    } catch (error) {
      console.error('Error during search:', error.message || error);
      setDoctors([]);
      setShowResults(false); // Hide results box on error
    }
  };

  return (
    <div className="relative min-h-screen w-auto px-5 mt-0">
      <img src={myImage2} alt="A doctor holding an elderly person's hand" className="absolute inset-0 w-full  h-full object-cover" />
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 flex flex-col items-center justify-center w-auto h-full">
        <div className="bg-white bg-opacity-35 p-2 rounded-lg shadow-lg text-center w-100 min-h-40 mx-auto my-2">
          <h1 className="text-6xl font-bold text-black mb-6">Find the care you need</h1>
          <div className="flex flex-col md:flex-row gap-2 mb-4">
            <select
              className="bg-white bg-opacity-85 p-2 rounded-lg shadow-lg"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            >
              <option value=''>Any Specialization</option>
              {specializations.map((specialization) => (
                <option key={specialization} value={specialization.replace(/\s+/g, '-')}>
                  {specialization}
                </option>
              ))}
            </select>

            <input
              type="text"
              className="bg-white bg-opacity-85 p-2 rounded-lg shadow-lg"
              placeholder="Doctor's Name"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            />

            <select
              className="bg-white bg-opacity-85 p-2 rounded-lg shadow-lg"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value=''>Any Where</option>
              {cities.map((city) => (
                <option key={city} value={city.replace(/\s+/g, '-')}>
                  {city}
                </option>
              ))}
            </select>

            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSearch}>
              Search
            </button>
          </div>
          <p className="text-blue-600 mb-4">Search by specialty, doctor's name, or location</p>

          

          {showResults && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Search Results:</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Name</th>
                      <th className="py-2 px-4 border-b">Specialty</th>
                      <th className="py-2 px-4 border-b">Location</th>
                      <th className="py-2 px-4 border-b">Address</th>
                      <th className="py-2 px-4 border-b">Email</th>
                      <th className="py-2 px-4 border-b">Phone</th>
                      <th className="py-2 px-4 border-b">Average Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor, index) => (
                      <tr key={doctor.id || index} className="border-b">
                        <td className="py-2 px-4">{doctor.firstName} {doctor.lastName}</td>
                        <td className="py-2 px-4">{doctor.specialization.join(', ')}</td>
                        <td className="py-2 px-4">{doctor.city}</td>
                        <td className="py-2 px-4">{doctor.adresse}</td>
                        <td className="py-2 px-4">{doctor.email}</td>
                        <td className="py-2 px-4">{doctor.phone}</td>
                        <td className="py-2 px-4">{doctor.averageRating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 w-full text-center p-4 bg-white bg-opacity-70">
        <h2 className="text-6xl font-bold">YouDawi</h2>
        <p>We ensure the best Doctors. Find The Best Doctor Near You</p>
      </div>
    </div>
  );
}

export default Banner;