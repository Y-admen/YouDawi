import React, { useState, useEffect } from 'react';
import myImage2 from '../pics/—Pngtree—3d doctor illustration with thumb_12996254.png';

const TodayDoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [todayPatients, setTodayPatients] = useState([]);
  const [oldCount, setOldCount] = useState(0);
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    // Fetch or use an API call to get appointment data
    const fetchedAppointments = [
      { id: 1, name: 'John Doe', date: '2024-10-10', type: 'old' }, // old
      { id: 2, name: 'Jane Smith', date: '2024-10-12', type: 'new' }, // today, new
      { id: 3, name: 'Emily Davis', date: '2024-10-12', type: 'old' }, // today, old
      { id: 4, name: 'Sam Green', date: '2024-10-13', type: 'new' } // upcoming
    ];
    setAppointments(fetchedAppointments);
    filterAppointments(fetchedAppointments);
  }, []);

  const filterAppointments = (appointments) => {
    const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
    const todayList = [];
    let oldPatients = 0;
    let newPatients = 0;

    appointments.forEach((appointment) => {
      if (appointment.date === today) {
        todayList.push(appointment);
        if (appointment.type === 'old') {
          oldPatients++;
        } else if (appointment.type === 'new') {
          newPatients++;
        }
      }
    });

    setTodayPatients(todayList);
    setOldCount(oldPatients);
    setNewCount(newPatients);
  };

  return (
    <div className="w-full flex items-center justify-between bg-primary-10 p-2 rounded-lg shadow-md text-white max-h-100">
      {/* Left side: today's visitors info */}
      <div className="left-info flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-2">Today's Visitors</h1>
        {todayPatients.length > 0 ? (
          <div className="info text-2xl">
            <p className="text-lg">Total patients today: <strong>{todayPatients.length}</strong></p>
            <p className="mt-2">
              Old Patients: <strong>{oldCount}</strong> | New Patients: <strong>{newCount}</strong>
            </p>
          </div>
        ) : (
          <p>No patients today.</p>
        )}
      </div>

      {/* Right side: image */}
      <div className="right-image relative h-full w-full">
        <img
          src={myImage2}
          alt="Doctor's appointments illustration"
          className="rounded-lg shadow-md image-box h-full"
        />
      </div>
    </div>
  );
};

export default TodayDoctorAppointments;
