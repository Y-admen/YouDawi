const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController')
const verifyToken = require('../middlewares/verifyToken')
const allowedTo = require('../middlewares/allowedTo')
const userRoles = require('../utils/userRoles')

router.route('/')
    .get(verifyToken, allowedTo(userRoles.DOCTOR), prescriptionController.getAllprescriptions)
    .post(verifyToken, allowedTo(userRoles.DOCTOR), prescriptionController.postprescription)

router.route('/:id')
    .get(verifyToken, allowedTo(userRoles.DOCTOR, userRoles.PATIENT), prescriptionController.getprescriptionById)
    .put(verifyToken, allowedTo(userRoles.DOCTOR), prescriptionController.updatePrescription)
    .delete(verifyToken, allowedTo(userRoles.DOCTOR), prescriptionController.deleteprescription);

module.exports = router;