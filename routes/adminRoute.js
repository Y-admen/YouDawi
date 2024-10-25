const express = require('express');
const adminController = require('../controllers/adminController');
const doctorsController = require('../controllers/doctorsController');
const nursesController = require('../controllers/nursesController');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require('../middlewares/allowedTo');
const userRoles = require('../utils/userRoles');
const upload = require('../utils/upload');
const router = express.Router();

router.route('/login')
    .post(adminController.login);

router.route('/dashboard')
    .get(adminController.getAdminDashboard)

router.route('/doctors')
    .get(verifyToken, allowedTo(userRoles.ADMIN), doctorsController.getAllDoctors)
    .post(upload.single('avatar'), allowedTo(userRoles.ADMIN), doctorsController.register);

router.route('/doctors/:id')
    .get(verifyToken, allowedTo(userRoles.ADMIN), doctorsController.getDoctorById)
    .put(verifyToken, allowedTo(userRoles.ADMIN), upload.single('avatar'), doctorsController.updateDoctor)
    .delete(verifyToken, allowedTo(userRoles.ADMIN), doctorsController.deleteDoctor);

router.route('/nurses')
    .get(verifyToken, allowedTo(userRoles.ADMIN), nursesController.getAllNurses)
    .post(upload.single('avatar'), allowedTo(userRoles.ADMIN), doctorsController.registerNurse);

router.route('/nurses/:id')
    .get(verifyToken, allowedTo(userRoles.ADMIN), nursesController.getNurseById)
    .put(verifyToken, allowedTo(userRoles.ADMIN), upload.single('avatar'), nursesController.updateNurse)
    .delete(verifyToken, allowedTo(userRoles.ADMIN), nursesController.deleteNurse);

module.exports = router;