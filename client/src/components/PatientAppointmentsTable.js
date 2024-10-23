import React, { useEffect, useState } from 'react';

const dummyAppointments = [
  {
    _id: '1',
    doctorName: 'Dr. John Doe',
    appointmentDate: '2024-10-01',
    appointmentTime: '10:00',
    status: 'Confirmed',
    notes: 'Follow-up visit for blood test results.',
  },
  {
    _id: '2',
    doctorName: 'Dr. Jane Smith',
    appointmentDate: '2024-09-28',
    appointmentTime: '14:30',
    status: 'Cancelled',
    notes: 'Patient cancelled due to scheduling conflict.',
  },
  {
    _id: '3',
    doctorName: 'Dr. Emily Johnson',
    appointmentDate: '2024-09-20',
    appointmentTime: '09:15',
    status: 'Completed',
    notes: 'Routine check-up and consultation.',
  },
];

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching appointments with fake loading
  useEffect(() => {
    const fetchAppointments = () => {
      setLoading(true);
      setTimeout(() => {
        setAppointments(dummyAppointments);
        setLoading(false);
      }, 1500); // Simulate a 1.5 second delay for loading
    };
    fetchAppointments();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading appointments...</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Appointment History</h2>
      <table className="min-w-full bg-white border border-gray-200 shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left">Doctor</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Time</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Notes</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{appointment.doctorName}</td>
              <td className="py-2 px-4">{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
              <td className="py-2 px-4">{appointment.appointmentTime}</td>
              <td className={`py-2 px-4 ${getStatusColor(appointment.status)}`}>
                {appointment.status}
              </td>
              <td className="py-2 px-4">{appointment.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Helper function to color the status text
const getStatusColor = (status) => {
  switch (status) {
    case 'Confirmed':
      return 'text-green-500';
    case 'Cancelled':
      return 'text-red-500';
    case 'Completed':
      return 'text-blue-500';
    default:
      return '';
  }
};

export default PatientAppointments;
