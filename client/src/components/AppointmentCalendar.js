import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarStyles.css'; // Create this CSS file for custom styling

const appointments = [
  { id: 1, date: new Date(2024, 9, 6), title: 'Appointment with Dr. John Doe' },  // Year, Month (0-indexed), Day
  { id: 2, date: new Date(2024, 9, 6), title: 'Consultation with Dr. James Bond' },
  { id: 3, date: new Date(2024, 9, 10), title: 'Appointment with Dr. Jane Smith' },
  { id: 4, date: new Date(2024, 9, 15), title: 'Appointment with Dr. Johnson' },
  { id: 5, date: new Date(2024, 9, 26), title: 'Appointment with Dr. Alice Johnson' },
  { id: 6, date: new Date(2024, 9, 15), title: 'Appointment with Dr. David Johnson' },
  { id: 7, date: new Date(2024, 9, 15), title: 'Appointment with Dr. John Doe' },
];

function AppointmentCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Check if the current date has an appointment
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const appointmentDates = appointments.map((app) => app.date.toDateString());
      if (appointmentDates.includes(date.toDateString())) {
        return 'highlight';
      }
    }
    return null;
  };

  // Function to display appointment details when a date is clicked
  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  // Filter appointments for the selected date
  const appointmentsOnSelectedDate = appointments.filter(
    (appointment) => appointment.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">Your Appointments</h2>
      <Calendar
        onChange={onDateChange}
        value={selectedDate}
        tileClassName={tileClassName} // Highlight the appointment dates
      />

      {appointmentsOnSelectedDate.length > 0 ? (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-lg">
          <h3 className="text-lg font-bold">Appointments on {selectedDate.toDateString()}</h3>
          <ul>
            {appointmentsOnSelectedDate.map((appointment) => (
              <li key={appointment.id} className="mt-2">
                {appointment.title}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-400 rounded-lg">
          <p>No appointments on this day.</p>
        </div>
      )}
    </div>
  );
}

export default AppointmentCalendar;
