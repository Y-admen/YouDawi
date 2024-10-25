import React, { useState, useEffect } from 'react';

function Patients() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch patients from the API
        const fetchPatients = async () => {
            const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
            if (!token) {
                setError('No token found');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/doctors/dashboard`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Error fetching patients');
                }

                const data = await response.json();
                setPatients(data.data.patients); // Assuming the response structure contains patients in data
            } catch (err) {
                setError('Error fetching patients');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    return (
        <div>
            <h1>Patients</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 text-sm font-medium text-gray-700">Patient ID</th>
                            <th className="py-2 px-4 text-sm font-medium text-gray-700">Name</th>
                            <th className="py-2 px-4 text-sm font-medium text-gray-700">Age</th>
                            <th className="py-2 px-4 text-sm font-medium text-gray-700">Condition</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{patient.id}</td>
                                <td className="py-2 px-4 border-b">{patient.name}</td>
                                <td className="py-2 px-4 border-b">{patient.age}</td>
                                <td className="py-2 px-4 border-b">{patient.condition}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Patients;
