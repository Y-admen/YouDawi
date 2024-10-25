const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const allowedTo = require('../middlewares/allowedTo');
const userRoles = require('../utils/userRoles');
const verifyToken = require('../middlewares/verifyToken')

router.route('/')
    .get(verifyToken, allowedTo(userRoles.ADMIN), appointmentController.getAllAppointments)
    .post(verifyToken, allowedTo(userRoles.ADMIN, userRoles.PATIENT, userRoles.Nurse), appointmentController.postAppointment)

router.route('/:id')
    .get(verifyToken, appointmentController.getAppointmentById)
    .put(verifyToken, appointmentController.updateAppointment)
    .delete(verifyToken, appointmentController.deleteAppointment);

router.route('/doctor/:id')
    .get(verifyToken,
        allowedTo(userRoles.DOCTOR, userRoles.ADMIN, userRoles.NURSE),
        appointmentController.getAppointmentsByDoctorId)

router.route('/patient/:id')
    .get(verifyToken,
        allowedTo(userRoles.PATIENT, userRoles.ADMIN),
        appointmentController.getAppointmentsByPatientId)

router.route('/patient/:id/push-subscription')
    .post(verifyToken, allowedTo(userRoles.PATIENT), appointmentController.setPushSubscription)
    .get(verifyToken, allowedTo(userRoles.PATIENT), appointmentController.getPushSubscription)

router.route('/:id/approve')
    .post(verifyToken, allowedTo(userRoles.PATIENT), appointmentController.approveAppointment);

router.route('/:id/cancel')
    .post(verifyToken, allowedTo(userRoles.PATIENT), appointmentController.cancelAppointment);

module.exports = router;
