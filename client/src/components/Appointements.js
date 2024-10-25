import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import AppointmentsTable from './AppointmentsTable';

function Appointements() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch appointments by doctor ID using the token from localStorage
        const fetchAppointments = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                const doctorId = decodedToken.id; 
                
                try {
                    const response = await fetch(`http://localhost:5000/api/appointments/doctor/${doctorId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Error fetching appointments');
                    }

                    const data = await response.json();
                    console.log('Appointments Data:', data.data); 
                    setAppointments(data.data); 
                } catch (err) {
                    setError('Error fetching appointments');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            } else {
                setError('No token found');
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div>
            <h1>Appointments</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <AppointmentsTable appointmentsData={appointments} />
            )}
        </div>
    );
}

export default Appointements;
