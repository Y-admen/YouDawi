import React, { useState } from 'react';
import AppointmentForm from './AppointmentForm';
import Navbar from './Navbar';

function BookAppointment() {
    return (
        <div>
         <Navbar />
      <div className="min-h-screen bg-gray-100">
     
      <AppointmentForm />
    </div>
    </div>
  );
}

export default BookAppointment;