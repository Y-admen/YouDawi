const mongoose = require('mongoose');
const Appointment = require('../models/appointmentModel')
const Doctor = require('../models/doctorModel')


function timeStringToMinutes(timeString) {
  const [time, period] = timeString.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (period === 'PM' && hours !== 12) {
      hours += 12;
  } else if (period === 'AM' && hours === 12) {
      hours = 0;
  }
  return hours * 60 + minutes;
}

async function validateAppointmentTime(time, doctorId, patientId, appointmentDate) {
    const docConflict = await mongoose.models.Appointment.findOne({
        doctorId,
        appointmentDate,
        appointmentTime: time
    });
      
    const patConflict = await mongoose.models.Appointment.findOne({
        patientId,
        appointmentDate,
        appointmentTime: time
    });

    const doctor = await mongoose.models.Doctor.findOne({ _id: doctorId });

    if (!doctor || !doctor.schedule || doctor.schedule.length === 0) {
        return false;
    }

    const appointmentDay = new Date(appointmentDate).toLocaleString('en-US', { weekday: 'long' });
    const daySchedule = doctor.schedule.find(day => day.day === appointmentDay);
      
    if (!daySchedule) {
        return false;
    }

    const isTimeSlotAvailable = daySchedule.timeSlots.some(slot => {
        const [start, end] = slot.split(' - ');
        const startInMinutes = timeStringToMinutes(start);
        const endInMinutes = timeStringToMinutes(end);
        appointmentTimeInMinutes = timeStringToMinutes(time);
        
        return appointmentTimeInMinutes >= startInMinutes && appointmentTimeInMinutes <= endInMinutes;
    });

    return !docConflict && !patConflict && isTimeSlotAvailable;
}


module.exports = {
    validateAppointmentTime
};
