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

module.exports = router;
