const express = require('express');
const router = express.Router();

const doctorsController = require('../controllers/doctorsController');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require('../middlewares/allowedTo');
const userRoles = require('../utils/userRoles');
const upload = require('../utils/upload');

router.route('/register')
    .post(upload.single('avatar'), doctorsController.register);

router.route('/requestResetPassword')
    .post(doctorsController.requestResetPassword);

router.route('/resetPassword/:token')
    .post(doctorsController.resetPassword)

router.route('/login')
    .post(doctorsController.login);

router.route('/')
    .get(verifyToken, doctorsController.getAllDoctors);

router.route('/specialty')
    .get(verifyToken, doctorsController.getDoctorsBySpecialty);

router.route('/name')
    .get(verifyToken, doctorsController.getDoctorsByName);

router.route('/location')
    .get(verifyToken, doctorsController.getDoctorsByLocation);

router.route('/:id')
    .get(verifyToken, doctorsController.getDoctorById)
    .put(verifyToken, allowedTo(userRoles.DOCTOR, userRoles.ADMIN),doctorsController.updateDoctor)
    .delete(verifyToken, allowedTo(userRoles.DOCTOR, userRoles.ADMIN), doctorsController.deleteDoctor);

router.route('/:id/schedule')
    .get(verifyToken, allowedTo(userRoles.DOCTOR, userRoles.NURSE, userRoles.ADMIN), doctorsController.getDoctorSchedule)
    .put(verifyToken, allowedTo(userRoles.DOCTOR, userRoles.NURSE, userRoles.ADMIN), doctorsController.updateDoctorSchedule)

router.route('/:id/status')
    .put(verifyToken, allowedTo(userRoles.ADMIN),doctorsController.updateDoctorStatus);

router.route('/profile')
    .get(verifyToken, allowedTo(userRoles.DOCTOR), doctorsController.getProfile);

router.route('/dashboard')
    .get(verifyToken, allowedTo(userRoles.DOCTOR, userRoles.ADMIN), doctorsController.getDoctorDashboard);

router.route('/registerNurse')
    .post(verifyToken, allowedTo(userRoles.DOCTOR, userRoles.ADMIN), doctorsController.registerNurse);

router.route('/nurses')
.get(verifyToken, allowedTo(userRoles.DOCTOR), doctorsController.getNursesByDoctor);

router.route('/:id/rate')
    .post(verifyToken, allowedTo(userRoles.PATIENT, userRoles.ADMIN), doctorsController.rateDoctor);

router.route('/:id/ratings')
    .get(doctorsController.getDoctorRatings);

module.exports = router;