const express = require('express');

const router = express.Router();
const nursesController = require('../controllers/nursesController');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require('../middlewares/allowedTo');
const userRoles = require('../utils/userRoles');
const upload = require('../utils/upload');

router.route('/login')
    .post(nursesController.login)

router.route('/requestResetPassword')
    .post(nursesController.requestResetPassword);

router.route('/resetPassword/:token')
    .post(nursesController.resetPassword)

router.route('/')
    .get(verifyToken, allowedTo(userRoles.ADMIN), nursesController.getAllNurses)

router.route('/profile')
    .get(verifyToken, allowedTo(userRoles.NURSE, userRoles.DOCTOR, userRoles.ADMIN), nursesController.getProfile);

router.route('/dashboard')
    .get(verifyToken, allowedTo(userRoles.NURSE, userRoles.DOCTOR, userRoles.ADMIN), nursesController.getNurseDashboard);

router.route('/:id')
    .get(verifyToken, allowedTo(userRoles.NURSE, userRoles.DOCTOR, userRoles.ADMIN), nursesController.getNurseById)
    .put(verifyToken, allowedTo(userRoles.NURSE, userRoles.DOCTOR, userRoles.ADMIN), nursesController.updateNurse)
    .delete(verifyToken, allowedTo(userRoles.ADMIN), nursesController.deleteNurse)

router.route('/:id/deactivate')
    .patch(verifyToken, allowedTo(userRoles.DOCTOR, userRoles.ADMIN), nursesController.deactivateNurse)
module.exports = router;