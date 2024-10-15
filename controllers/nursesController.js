const Nurse = require("../models/nurseModel");
const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel')
const asyncHandler = require("../middlewares/asyncHandler");
const httpStatusText = require('../utils/httpStatusText');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateJWT = require("../utils/generateJWT");
const appError = require("../utils/appError");
const userRoles = require("../utils/userRoles");




const login= asyncHandler(async(req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) {
        const error = appError.create('Email and Password are required', 400, httpStatusText.FAIL);
        return next(error);
    }
    const nurse = await Nurse.findOne({email: email});
    if (!nurse) {
        const error = appError.create('Nurse not found', 404, httpStatusText.FAIL);
        return next(error);
    }
    const matchedPassword = await bcrypt.compare(password, nurse.password);
    if (!matchedPassword) {
        const error = appError.create('Invalid credentials', 401, httpStatusText.FAIL);
        return next(error);
    }
    if (nurse.status !== 'Active') {
        const error = appError.create('Nurse status is inactive', 403, httpStatusText.FAIL);
        return next(error);
    }
    const token = await generateJWT({ email: nurse.email, id: nurse._id, role: nurse.role });
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { token } });
});

module.exports = {
    login
}