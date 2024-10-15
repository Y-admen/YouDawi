const Doctor = require("../models/doctorModel");
const Nurse = require("../models/nurseModel");
const Appointment = require("../models/appointmentModel");
const asyncHandler = require("../middlewares/asyncHandler");
const httpStatusText = require('../utils/httpStatusText');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateJWT = require("../utils/generateJWT");
const appError = require("../utils/appError");
const userRoles = require("../utils/userRoles");
const crypto = require('crypto');
const { sendPasswordResetEmail, sendNurseRegistrationEmail } = require('../utils/mailUtils')



const register = asyncHandler(async(req, res, next) => {
    const { firstName, lastName, email, password, adresse, city, phone, specialization, role, schedule } = req.body;
    console.log('Request body:', req.body);
    console.log('File:', req.file);
    const doctor = await Doctor.findOne({email: email});
    if (doctor) {
        const error = appError.create('User already exists', 400, httpStatusText.FAIL)
        return next(error);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // console.log(schedule);
    // console.log(typeof(schedule));
    let parsedSchedule = [];
    if (typeof schedule === 'string') {
        try {
            parsedSchedule = JSON.parse(schedule);
        } catch (error) {
            return res.status(400).json({ message: 'Invalid schedule format' });
        }
    } else {
        parsedSchedule = schedule;
    }
    // console.log(parsedSchedule);
    // console.log(typeof(parsedSchedule));
    let avatar = 'pics/default.png';
    if (req.file) {
        avatar = req.file.filename;
        console.log('Avatar uploaded successfully:', avatar);
    }
    const newDoctor = new Doctor({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        adresse,
        city,
        phone,
        specialization,
        schedule: parsedSchedule,
        avatar,
        role
    })
    console.log('Doctor created successfully:', newDoctor);
    try {
        const token = await generateJWT({ email: newDoctor.email, id: newDoctor._id, role: newDoctor.role });
        newDoctor.token = token;
        await newDoctor.save();
        res.status(201).json({ status: httpStatusText.SUCCESS, data: { doctor: newDoctor } });
    } catch (err) {
        console.error('Error during registration:', err);
        const error = appError.create('Failed to register the doctor', 500, httpStatusText.ERROR);
        return next(error);
    }
});

const requestResetPassword = asyncHandler(async(req, res, next) => {
    const { email } = req.body;
    try {
        const doctor = await Doctor.findOne({ email });

        if (!doctor) {
            return next(appError.create('Doctor not found, Please register', 404, httpStatusText.FAIL));
        }

        const token = crypto.randomBytes(20).toString('hex');

        doctor.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
        doctor.resetPasswordExpires = Date.now() + 3600000;

        await doctor.save();
        const resetURL = `http://${req.headers.host}/resetPassword/${token}`;
        // console.log(resetURL)

        // console.log('EMAIL_USER:', process.env.EMAIL_USER);
        // console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

        await sendPasswordResetEmail(doctor.email, resetURL);
        res.status(200).json({ status: httpStatusText.SUCCESS, message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error sending email:', error);
            return next(appError.create('Error sending email', 500, httpStatusText.FAIL));
    }
});

const resetPassword = asyncHandler(async (req, res, next) => {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const doctor = await Doctor.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
    });
    if (!doctor) {
        return next(appError.create('Password reset token is invalid or has expired', 400, httpStatusText.FAIL));
    }
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    doctor.password = hashedPassword;
    doctor.resetPasswordToken = undefined;
    doctor.resetPasswordExpires = undefined;
    await doctor.save();
    res.status(200).json({ status: httpStatusText.SUCCESS, message: 'Password has been reset successfully' });
});

const login = asyncHandler(async(req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) {
        const error = appError.create('Email and Password are required', 400, httpStatusText.FAIL);
        return next(error);
    }
    const doctor = await Doctor.findOne({email: email}).select('+password');
    if (!doctor) {
        const error = appError.create('Doctor not found', 404, httpStatusText.FAIL);
        return next(error);
    }
    const matchedPassword = await bcrypt.compare(password, doctor.password);
    if (!matchedPassword) {
        const error = appError.create('Invalid credentials', 401, httpStatusText.FAIL);
        return next(error);
    }
    
    if (doctor.status === 'pending') {
        const error = appError.create('Doctor is not approved yet', 403, httpStatusText.FAIL);
        return next(error);
    } else if (doctor.status === 'cancelled') {
        const error = appError.create('Doctor account has been cancelled', 403, httpStatusText.FAIL);
        return next(error);
    }
    
    const token = await generateJWT({ email: doctor.email, id: doctor._id, role: doctor.role });
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { token } });
});


module.exports = {
    register,
    requestResetPassword,
    resetPassword,
    login
}