const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController')
const verifyToken = require('../middlewares/verifyToken')
const allowedTo = require('../middlewares/allowedTo')
const userRoles = require('../utils/userRoles')

router.route('/')
    .get(verifyToken, allowedTo(userRoles.DOCTOR), prescriptionController.getAllprescriptions)

module.exports = router;