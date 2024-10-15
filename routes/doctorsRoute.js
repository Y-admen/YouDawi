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
    .post(doctorsController.resetPassword);

router.route('/login')
    .post(doctorsController.login);

router.route('/registerNurse')
    .post(verifyToken, allowedTo(userRoles.DOCTOR, userRoles.ADMIN), doctorsController.registerNurse);


module.exports = router;