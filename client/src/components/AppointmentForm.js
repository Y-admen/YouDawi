// components/AppointmentForm.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from './TimePicker';

const AppointmentForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchAvailableSlots(date.toISOString().split('T')[0]);
  };

  const fetchAvailableSlots = async (day) => {
    // Simulating API call to get available slots
    const response = await fetch(`/api/appointments?day=${day}`);
    const data = await response.json();
    setAvailableSlots(data);
  };

  return (
    <form className="w-100 mx-auto mt-8 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-6xl font-bold mb-4">Book Your Appointment</h2>

      <div className="mb-4">
        <label htmlFor="date" value="Choose Date" className="block text-lg font-medium text-gray-700 mb-1">
                  {/* Add more options as needed */}
                  <h2 className="text-2xl">Choose Date:</h2>
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="time" className="block text-2xl font-medium text-gray-700 mb-1">
          Available Hours:
        </label>
        <TimePicker availableSlots={availableSlots} />
      </div>

      <button type="submit" className="bg-sky-500 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded">
        Confirm
      </button>
    </form>
  );
};

export default AppointmentForm;
