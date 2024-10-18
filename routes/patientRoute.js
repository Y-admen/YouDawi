const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController')
const verifyToken = require('../middlewares/verifyToken')
const allowedTo = require('../middlewares/allowedTo')
const userRoles = require('../utils/userRoles')

router.route('/register')
  .post(upload.single('avatar'), patientController.registerPatient);

router.route('/login')
  .post(patientController.login);

router.route('/requestResetPassword')
  .post(patientController.requestResetPassword);

router.route('/resetPassword/:token')
  .post(patientController.resetPassword);

router.route('/profile')
  .get(verifyToken, allowedTo(userRoles.ADMIN, userRoles.PATIENT), patientController.getProfile);

router.route('/')
  .get(verifyToken, patientController.getAllPatients);


module.exports = router;
