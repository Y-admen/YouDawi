import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import appointmentService from '../services/AppointmentService';
import appointmentpic from '../pics/Appointments.png'

const PatientAppointments = ({ patientId }) => {
    const { register, handleSubmit } = useForm();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [doctorFilter, setDoctorFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(10); // Adjust the limit for pagination



    useEffect(() => {
        fetchAppointments();
    }, [page]);

    const fetchAppointments = async (filters = {}) => {
        setLoading(true);
        setError(null);

        const params = { limit, page, ...filters };

        try {
            const data = await appointmentService.getAppointmentsByPatientId(patientId, params);
            setAppointments(data);
            console.log('Appointments fetched:', data);
        } catch (err) {
            setError('Error fetching appointments. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = (data) => {
        const filters = {};
        if (data.doctor) filters.doctor = data.doctor;
        if (data.date) filters.date = data.date;

        fetchAppointments(filters);
    };

    const renderAppointment = (appointment) => {
        return (
            <div key={appointment.id} className="p-4 border rounded shadow-md mb-4">
                <h3 className="text-lg font-semibold">Doctor: {appointment.doctor.name}</h3>
                <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                <p>Status: {appointment.status}</p>
                <p>Notes: {appointment.notes}</p>
            </div>
        );
    };

    return (
        <div>
            <div className="mx-auto max-w-1/2 bg-white shadow-md p-10">
                <div className="bg-primary-35 text-white text-center py-5 rounded-t-lg">
                    <h2 className="text-3x1 text-white font-semibold">My Appointments</h2>
                </div>

                {loading && <div className="text-blue-600 mt-3 font-semibold">Loading appointments...</div>}
                {error && <div className="text-red-600">{error}</div>}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4 grid  grid-cols-2 gap-4">
                    <div className=''>
                        <label className="block text-gray-700">Filter by Doctor</label>
                        <input
                            type="text"
                            {...register('doctor')}
                            value={doctorFilter}
                            onChange={(e) => setDoctorFilter(e.target.value)}
                            placeholder="Enter doctor's name"
                            className="w-30 border border-gray-300 rounded-3x1 px-3 py-2 mt-1 mb-4"
                        />

                        <label className="block text-gray-700">Filter by Date</label>
                        <input
                            type="date"
                            {...register('date')}
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="w-30 border border-gray-300 rounded-3x1 px-3 py-2 mt-1"
                        />
                    </div>

                    <div className=''>
                        <img className='w-60 ' src={appointmentpic} alt='pic' />
                    </div>

                </form>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-3x1">
                    Apply Filters
                </button>
                <div className="mt-6">
                    <h3 className="text-3x1 font-semibold">Appointments</h3>
                    {appointments.length === 0 ? (
                        <div className="text-gray-600">No appointments found</div>
                    ) : (
                        appointments.map(renderAppointment)
                    )}
                </div>

                <div className="mt-6 flex justify-between">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PatientAppointments;
