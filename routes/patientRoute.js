const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController')
const verifyToken = require('../middlewares/verifyToken')
const allowedTo = require('../middlewares/allowedTo')
const userRoles = require('../utils/userRoles')

router.route('/register')
  .post(patientController.registerPatient);

router.route('/login')
  .post(patientController.login);

router.route('/profile')
  .get(verifyToken, allowedTo(userRoles.ADMIN, userRoles.PATIENT), patientController.getProfile);

router.route('/')
  .get(verifyToken, patientController.getAllPatients);


module.exports = router;
