const cron = require('node-cron');
const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');
const sendEmail = require('./mailUtils');


cron.schedule('* * * * *', async() => {
    console.log("Cron job triggered");
    try {
        const oneDayAhead = new Date();
        oneDayAhead.setDate(oneDayAhead.getDate() + 1);

        const appointments = await Appointment.find({
            appointmentDate: { $gte: oneDayAhead, $lt: new Date(oneDayAhead.getTime() + 24 * 60 * 60 * 1000) },
            status: 'Pending',
        });
        console.log(`Found ${appointments.length} appointments`);

        appointments.forEach(async(appointment) => {
            try {
                const doctor = await Doctor.findById(appointment.doctorId);
                const patient = await Patient.findById(appointment.patientId);
                const approveURL = `${process.env.CLIENT_URL}/api/appointments/${appointment._id}/approve`;
                const cancelURL = `${process.env.CLIENT_URL}/api/appointments/${appointment._id}/cancel`;

                await sendEmail.sendAppointmentEmail(
                    patient.email,
                    approveURL,
                    cancelURL,
                    patient.firstName,
                    doctor.firstName,
                    appointment.appointmentTime
                );
            } catch (err) {
                console.error("Error processing appointment", appointment._id, err);
            }
        });
    } catch (err) {
        console.error("Error in cron job:", err);
    }
    console.log("appointments checked from schedule");
});