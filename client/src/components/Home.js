import React from 'react';
import SearchBar from './Searchbar';
import AppointmentCalendar from './AppointmentCalendar';
import TodayDoctorAppointments from './TodayDoctorAppointments';

// Reusable Doctor Card component
function DoctorCard({ doctor }) {
  return (
    <div className="border rounded-lg p-4 shadow-lg">
      <img
        src={doctor.imageUrl}
        alt={doctor.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-bold">{doctor.name}</h3>
      <p className="text-gray-600">{doctor.specialty}</p>
      <p className="text-yellow-500 font-semibold">Rating: {doctor.rating} ★</p>
    </div>
  );
}

function Home() {
  const topRatedDoctors = [
    { id: 1, name: 'Dr. John Doe', specialty: 'Cardiologist', rating: 4.9, imageUrl: '/doctor1.jpg' },
    { id: 2, name: 'Dr. Jane Smith', specialty: 'Dermatologist', rating: 4.8, imageUrl: '/doctor2.jpg' },
    { id: 3, name: 'Dr. Alice Johnson', specialty: 'Pediatrician', rating: 4.7, imageUrl: '/doctor3.jpg' },
  ];

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Fetch or filter your data based on the `query`
    // setSearchResults(filteredData);
  };

  return (
    <main className="container mx-auto">
      {/* Search bar */}
      <header className="w-full mb-4">
        <SearchBar onSearch={handleSearch} placeholder="Search by name, specialty..." />
        <div className="text-xl mt-2">Hey Dr. John Doe,</div>
      </header>

      {/* Appointment section */}
      <section className="grid md:grid-cols-2 gap-4 mb-8">
        <TodayDoctorAppointments />
        <AppointmentCalendar />
      </section>

      {/* Top-rated doctors section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Top-Rated Doctors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topRatedDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg transition hover:bg-blue-600">
            See More Doctors
          </button>
        </div>
      </section>

      {/* Book an appointment section */}
      <section className="flex flex-col md:flex-row items-center bg-gray-100 p-8 rounded-lg shadow-lg">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src="/book-appointment.jpg"
            alt="Book an Appointment"
            className="rounded-lg shadow-lg object-cover w-full h-64"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h2 className="text-2xl font-semibold mb-4">Book an Appointment Today</h2>
          <p className="text-gray-700 mb-6">
            Find the best doctors and book an appointment online. Choose from a wide range of specialties to meet your health needs.
          </p>
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg transition hover:bg-green-600">
            Book an Appointment
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;
