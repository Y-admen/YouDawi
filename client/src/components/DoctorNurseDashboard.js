import SearchBar from './Searchbar';
import Bannarimg from '../pics/bannarDashboard.png';
import './DoctorNurseDashboard.css';
import Calendar from 'react-calendar';
import React, { useState, useEffect } from 'react';
import { getProfile } from '../services/DoctorService'; // Assuming getProfile is the service function to fetch the doctor's profile
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function DoctorNurseDashboard({ role }) {
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
                    const response = await fetch(`http://localhost:5000/api/doctors/dashboard`, {
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

    const { upcomingAppointments, todaysAppointments, patients, nurses, doctor } = dashboardData || {};

    return (
        <div className="container mx-auto pl-2">
            <SearchBar />
            <h1 className="text-4xl font-bold mb-5 pt-5">
                Hello {doctor ? `Dr. ${doctor.firstName} ${doctor.lastName}` : 'Doctor'}
            </h1>
            <div className="flex justify-between items-center mb-6">
                <Banner averageRating={doctor.averageRating} todaysAppointments={todaysAppointments} /> {/* Pass averageRating and todaysAppointments as props */}
                <div id="calendar">
                    <Calendar />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <ListofNurses todaysAppointments={todaysAppointments} />
                </div>
                <div>
                    <TodayAppointment nurses={nurses} />
                </div>
            </div>
        </div>
    );
}

// Notification Bar Component
function NotificationBar() {
    return (
        <div className="bg-primary-10 text-white p-4 rounded-lg mb-6">
            <h2 className="font-semibold text-">Notifications</h2>
            <div>
                <p>You have 3 upcoming appointments.</p>
            </div>
        </div>
    );
}

// Appointments Summary Component
// function AppointmentsSummary() {
//     return (
//         <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
//             <h2 className="text-xl font-semibold mb-4">Appointments Summary</h2>
//             <div className="flex justify-between items-center">
//                 <div className="text-center">
//                     <p className="text-4xl font-bold">12</p>
//                     <p className="text-gray-500">Past Appointments</p>
//                 </div>
//                 <div className="text-center">
//                     <p className="text-4xl font-bold">3</p>
//                     <p className="text-gray-500">Upcoming Appointments</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// Upcoming Appointments Component
function UpcomingAppointments() {
    const upcomingAppointments = [
        { id: 1, doctor: 'Dr. Sarah Smith', date: '2024-10-20', time: '10:00 AM' },
        { id: 2, doctor: 'Dr. John Doe', date: '2024-10-22', time: '11:30 AM' },
        { id: 3, doctor: 'Dr. Emily Johnson', date: '2024-10-25', time: '2:00 PM' },
    ];

    return (
        <div className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
            <ul>
                {upcomingAppointments.map(appointment => (
                    <li key={appointment.id} className="flex justify-between p-4 border-b last:border-b-0">
                        <div>
                            <p className="font-semibold">{appointment.doctor}</p>
                            <p className="text-gray-500">{appointment.date} at {appointment.time}</p>
                        </div>
                        <button className="text-blue-500 hover:text-blue-700">View</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Health Records Component with role-based link to Patient History
function HealthRecords({ role }) {
    const navigate = useNavigate();
    return (
        <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Health Records</h2>
            <p>Your health records are secure and accessible anytime.</p>

            {/* Show patient history link if role is doctor or nurse */}
            {(role === 'doctor' || role === 'nurse') && (
               <button 
            className="mt-4 text-blue-500 hover:text-blue-700" 
            onClick={() => navigate('/patient-data')}
          >
            View Patient History
          </button>
            )}
        </div>
    );
}

//  BANAR IN THE DOCTOR NURSE DASHBOARD
function Banner({ averageRating, todaysAppointments }) {
    return (
        <div id='bannar' className='mb-2 w-3/4 bg-gradient-to-r from-primary-40 to-primary-10'>
            <h2 className="text-3x1 font-semibold text-primary-32 pt-2 pl-2">Appointments Summary</h2>
            <div className='flex justify-start items-end h-28'>
                <div id='inbannar' className="text-center bg-pramiry-60 round-fullr">
                    <p className="mt-1 text-primary-32">Rating</p>
                    <p className="mt-1 text-4xl font-bold">{averageRating || 'New'}</p> {/* Display averageRating dynamically */}
                </div>
                <div id='inbannar' className="text-center bg-pramiry-60 round-full">
                    <p className="mt-1 text-primary-32">Today's Appointments</p>
                    <p className="mt-1 text-4xl font-bold">{todaysAppointments.length || 0}</p> {/* Display today's appointments dynamically */}
                </div>
                <div className='relative w-50'>
                    <img className='w-36 absolute bottom-2 right-6' src={Bannarimg} alt="Banner" />
                </div>
            </div>
        </div>
    );
}

function TodayAppointment({nurses}) {
    // const upcomingAppointments = [
    //     { id: 1, patient: 'Sarah Smith', date: '2024-10-20', time: '10:00 AM' },
    //     { id: 2, patient: 'John Doe', date: '2024-10-22', time: '11:30 AM' },
    //     { id: 3, patient: 'Emily Johnson', date: '2024-10-25', time: '2:00 PM' },
    // ];

    return (
        <div id='TodayApp' className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-3x1 text-pramiry-10 font-semibold mb-4">List of Nurses</h2>
            <ul>
                {nurses.map(nurse => (
                    <li id='TodayApp' key={nurse.id} className="flex justify-between p-4 border-b last:border-b-0">
                        <div>
                            <p className="font-semibold">{nurse.firstName} {nurse.lastName}</p>
                            <p className="text-gray-500">{nurse.email}</p>
                        </div>
                        <button className="text-primary-60 rounded-full p-2 hover:text-white bg-primary-10">Update status</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ListofNurses({todaysAppointments}) {
    // const upcomingAppointments = [
    //     { id: 1, nurse: 'Sara Ali', status: 'Actived' },
    //     { id: 2, nurse: 'Ahmed Osama', status: 'Deactive' },
    //     { id: 3, nurse: 'Mona Ahmed', status: 'Actived' },

    // ];
    const navigate = useNavigate(); 
    return (
        <div id='TodayApp' className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-3x1 text-pramiry-10 font-semibold mb-4">Today's Appointments</h2>
            <ul>
                {todaysAppointments.map(appointment => (
                    <li id='TodayApp' key={appointment.id} className="flex justify-between p-4 border-b last:border-b-0">
                        <div>
                            <p className="font-semibold">{appointment.patientId.firstName} {appointment.patientId.lastName}</p>
                            <p className="text-gray-500">{new Date(appointment.appointmentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at{' '}
                                {new Date(`1970-01-01T${appointment.appointmentTime}:00Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}

                            </p>
                        </div>
                        <button className="text-primary-60 rounded-full p-2 hover:text-white bg-primary-10" onClick = {() => navigate('/patient-data')}
                        >View records</button>

                        
                    </li>
                ))}
            </ul>
        </div>
    );
}

// // Main Doctor and Nurse Dashboard Component
// function DoctorNurseDashboard({ role }) {
//     return (
//         <div className="container mx-auto pl-2">
//             <SearchBar />
//             <h1 className="text-4x2 font-bold mb-5 pt-5">Hello Dr.Kim</h1>
//             <div className="flex justify-between items-center mb-6">
//                 <Banner />
//                 {/* <NotificationBar /> */}
//                 <div id='calendar'>
//                     <Calendar />
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Left column */}
//                 <div>

//                     {/* Health Records with role-based link */}
//                     {/* <HealthRecords role={role} /> */}
//                     <ListofNurses />

//                 </div>

//                 {/* Right column */}
//                 <div>

//                     {/* Upcoming Appointments */}
//                     <TodayAppointment />
//                 </div>
//             </div>
//         </div>
//     );
// }



export default DoctorNurseDashboard;
