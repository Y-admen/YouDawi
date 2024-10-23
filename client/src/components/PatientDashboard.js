import React from 'react';

// Notification Bar Component
function NotificationBar() {
    return (
        <div className="bg-blue-500 text-white p-4 rounded-lg mb-6">
            <h2 className="font-semibold">Notifications</h2>
            <p>You have 3 upcoming appointments.</p>
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
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>

            {/* Notification Bar */}
            <NotificationBar />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column */}
                <div>
                    {/* Appointments Summary */}
                    <AppointmentsSummary />

                    {/* Health Records */}
                    <HealthRecords />
                </div>

                {/* Right column */}
                <div>
                    {/* Upcoming Appointments */}
                    <UpcomingAppointments />
                </div>
            </div>
        </div>
    );
}

export default PatientDashboard;
