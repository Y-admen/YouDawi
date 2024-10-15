const Doctor = require("../models/doctorModel");
const asyncHandler = require("../middlewares/asyncHandler");
const httpStatusText = require('../utils/httpStatusText');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateJWT = require("../utils/generateJWT");
const appError = require("../utils/appError");
const userRoles = require("../utils/userRoles");



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
    login
}