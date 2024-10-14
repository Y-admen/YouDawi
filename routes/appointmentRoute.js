const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const allowedTo = require('../middlewares/allowedTo');
const userRoles = require('../utils/userRoles');
const verifyToken = require('../middlewares/verifyToken')

router.route('/')
    .get(appointmentController.getAllAppointments) // verifyToken, allowedTo(userRoles.ADMIN), 
    .post(appointmentController.postAppointment) //verifyToken, allowedTo(userRoles.ADMIN, userRoles.PATIENT, userRoles.Nurse), 

router.route('/:id')
    .get(appointmentController.getAppointmentById) //verifyToken, 

module.exports = router;