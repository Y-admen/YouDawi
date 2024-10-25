// components/TimePicker.js
import React from 'react';

const TimePicker = ({ availableSlots }) => {
  return (
    <select 
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Choose Time</option>
      {availableSlots.map((slot) => (
        <option key={slot.time} value={slot.time}>
          {slot.time}
        </option>
      ))}
    </select>
  );
};

export default TimePicker;
