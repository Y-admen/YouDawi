import React, { useState, useEffect } from "react";
import { getPublicDoctorsBy } from '../services/DoctorService';
import { FcSearch } from "react-icons/fc";
import { jwtDecode } from 'jwt-decode';
import './DoctorNurseDashboard.css';
import Calendar from 'react-calendar';
import Bannarimg from '../pics/patient.png';
import { useNavigate } from 'react-router-dom';

function Banner() {
    return (
        <div id='bannar' className='mb-2 w-3/4 bg-gradient-to-r from-primary-40 to-primary-10'>
            <h2 className="text-3x1 font-semibold text-primary-32 pt-2 pl-2">Appointments Summary</h2>
            <div className='flex justify-start items-end h-28'>
                <div id='inbannar' className="text-center bg-pramiry-60 round-full">
                    <p className="mt-1 text-primary-32">Upcoming Appointments</p>
                    <p className="mt-1 text-4xl font-bold">3</p>
                </div>
                <div className='relative w-50'>
                    <img className='w-36 absolute bottom-2 left-30' src={Bannarimg} alt="Banner" />
                </div>
            </div>
        </div>

    );
}

// Notification Bar Component
function NotificationBar() {
    return (
        <div className="bg-blue-500 text-white p-14 rounded-lg mb-6">
            <h2 className="font-semibold">Notifications</h2>
            <p>You have 3 upcoming appointments.</p>
        </div>
    );
}

const cities = [
    'Alexandria', 'Aswan', 'Abydos', 'Avaris', 'Port Said', 'Faiyum',
    'Elephantine', 'Amarna', 'Asyut', 'Giza', 'Luxor', 'Heliopolis',
    'Sharm El-Sheikh', 'El-Mansoura', 'Akhetaten', 'Crocodiloplis city',
    'Cairo', 'Minya', 'Thebes', 'Memphis', 'Zagazig', 'Edfu',
    'Al Mahallah Al Kubra', 'Hermopolis'
];

const specializations =
    ['Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology', 'General Practice', 'Neurology', 'Oncology', 'Orthopedics', 'Pediatrics', 'Psychiatry', 'Pulmonology'
    ];


function SeacrhDoctor() {
    const [specialty, setSpecialty] = useState('');
    const [doctor, setDoctor] = useState('');
    const [location, setLocation] = useState('');
    const [doctors, setDoctors] = useState([]);

    const handleSearch = async () => {
        try {
            // Call the getPublicDoctorsBy service with the entered values
            const results = await getPublicDoctorsBy(specialty, doctor, location);
            const doctorsList = results.data.doctors;

            if (doctorsList.length === 0) {
                // If no doctors are found, set a user-friendly message
                setDoctors([]);  // Clear the results
                console.log('No doctors found with the provided criteria');
            } else {
                console.log('Search Results:', doctorsList); // Log the results
                setDoctors(doctorsList);  // Update the state with the search results
            }
        } catch (error) {
            // If the API throws an error, display a message to the user
            console.error('Error during search:', error.message || error);
            setDoctors([]);  // Clear any previous results
        }
    };

    return (
        <div className="relative min-h-screen">
            <div className="relative z-10 flex flex-col items-center justify-center h-full ">
                <div className="bg-white bg-opacity-85 p-11 rounded-lg shadow-lg text-center">
                    <h1 className="text-6xl font-bold text-blue-700 mb-4">Find the care you need</h1>
                    <div className="flex space-x-4 mb-4">
                        <select
                            className="p-2 border border-gray-300 rounded"
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                        >
                            <option value=''>
                                Any Specialization
                            </option>
                            {specializations.map((specialization) => {
                                const value = specialization.replace(/\s+/g, '-');
                                return (
                                    <option key={value} value={value}>
                                        {specialization}
                                    </option>
                                );
                            })}
                        </select>

                        <input
                            type="text"
                            className="p-2 border border-gray-300 rounded"
                            placeholder="Doctor's Name"
                            value={doctor}
                            onChange={(e) => setDoctor(e.target.value)}
                        />

                        <select
                            className="p-2 border border-gray-300 rounded"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value=''>
                                Any Where
                            </option>
                            {cities.map((city) => {
                                const value = city.replace(/\s+/g, '-');
                                return (
                                    <option key={value} value={value}>
                                        {city}
                                    </option>
                                );
                            })}
                        </select>

                        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                    <p className="text-blue-600">
                        Search by specialty, doctor's name, or location
                    </p>
                </div>
                {doctors.length > 0 ? (
                    <div className="mt-8 bg-white p-8 rounded shadow-lg">
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
                ) : (
                    <p className="text-center mt-8 text-6xl p-3">No doctors found</p>
                )}
                <FcSearch className="text-9xl col-bl" />

            </div>
        </div>
    );
}
// Appointments Summary Component
function AppointmentsSummary() {
    return (
        <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Appointments Summary</h2>
            <div className="flex justify-between items-center">
                <div className="text-center">
                    <p className="text-4xl font-bold">12</p>
                    <p className="text-gray-500">Past Appointments</p>
                </div>
                <div className="text-center">
                    <p className="text-4xl font-bold">3</p>
                    <p className="text-gray-500">Upcoming Appointments</p>
                </div>
            </div>
        </div>
    );
}

// Upcoming Appointments Component
function TopDoctor({ topRatedDoctors = [] }) {
    // const TopDoctor = [
    //     { id: 1, doctor: 'Dr.Sara Ali', rate: 5 },
    //     { id: 2, doctor: 'Dr.Ahmed Osama', rate: 4 },
    //     { id: 3, doctor: 'Dr.Mona Ahmed', rate: 3 },

    // ];
    console.log("Top Rated Doctors:", topRatedDoctors);
const navigate = useNavigate(); 
    return (
        <div id='TodayApp' className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-3x1 text-pramiry-10 font-semibold mb-4">Top Doctors</h2>
            <ul>
                {topRatedDoctors.map(doctor => (
                    <li id='TodayApp' key={doctor.id} className="flex justify-between p-4 border-b last:border-b-0">
                        <div>
                            <p className="font-semibold">{doctor.firstName} {doctor.lastName}</p>
                            <p className="text-gray-500">Rate {doctor.specialization.join(", ")}</p>
                            <p className="text-gray-500">Rate {doctor.averageRating}/5</p>

                        </div>
                        <button className="text-primary-60 rounded-3x1 p-2 hover:text-white bg-primary-10 " onClick={() => navigate('/bookappointment')}>Book Now</button>

                    </li>
                ))}
            </ul>
        </div>
    );

}

function NextAppointment({ upcomingAppointments = [] }) {
    // const NextAppointment = [
    //     { id: 1, patint: 'Dr.Sara Ali', date: '2024-10-22', time: '11:30 AM' },
    //     { id: 2, patint: 'Dr.Ahmed Osama', date: '2024-10-22', time: '11:30 AM' },
    //     { id: 3, patint: 'Dr.Mona Ahmed', date: '2024-10-22', time: '11:30 AM' },

    // ];

    return (
        <div id='TodayApp' className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-3x1 text-pramiry-10 font-semibold mb-4">Next Appointments</h2>
            <ul>
                {upcomingAppointments.map(appointment => (
                    <li id='TodayApp' key={appointment.id} className="flex justify-between p-4 border-b last:border-b-0">
                        <div>
                            <p className="font-semibold">{appointment.doctorId.firstName} {appointment.doctorId.lastName}</p>
                            <p className="text-gray-500">{new Date(appointment.appointmentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at{' '}
                                {new Date(`1970-01-01T${appointment.appointmentTime}:00Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}

                            </p>
                            <p>Status: {appointment.status}</p>
                        </div>
                        <p className="text-primary-60 rounded-3x1 p-2  bg-primary-10"> View</p>
                    </li>
                ))}
            </ul>
        </div>
    );

}


// Health Records Component
function HealthRecords() {
    return (
        <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Health Records</h2>
            <p>Your health records are secure and accessible anytime.</p>
            <button className="mt-4 text-blue-500 hover:text-blue-700">View Records</button>
        </div>
    );
}

// Main Patient Dashboard Component
function PatientDashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch doctor dashboard data using the token from localStorage
        const fetchDashboardData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                try {
                    const response = await fetch(`http://localhost:5000/api/patients/dashboard`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Error fetching dashboard data');
                    }

                    const data = await response.json();
                    console.log('Dashboard Data:', data.data);
                    setDashboardData(data.data); // Assuming the response structure has data
                } catch (err) {
                    setError('Error fetching dashboard data');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            } else {
                setError('No token found');
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const { topRatedDoctors, numUpcomingAppointments, patientName, upcomingAppointments } = dashboardData || {};


    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-5 pt-5">
                Hello {patientName}
            </h1>
            <div className="flex justify-between items-center mb-6">
                <Banner />
                <div id='calendar'>
                    <Calendar />
                </div>
            </div>
            {/* Notification Bar */}
            <SeacrhDoctor />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column */}
                <div>
                    {/* Appointments Summary */}
                    <NextAppointment upcomingAppointments={upcomingAppointments} />
                </div>

                {/* Right column */}
                <div>
                    {/* Upcoming Appointments */}
                    <TopDoctor topRatedDoctors={topRatedDoctors} />
                </div>
            </div>
        </div>
    );
}

export default PatientDashboard;
