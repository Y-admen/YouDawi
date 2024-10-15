const express = require('express');

const router = express.Router();
const nursesController = require('../controllers/nursesController');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require('../middlewares/allowedTo');
const userRoles = require('../utils/userRoles');
const upload = require('../utils/upload');

router.route('/login')
    .post(nursesController.login)

module.exports = router;