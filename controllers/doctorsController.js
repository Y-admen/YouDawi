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

const getAllDoctors = asyncHandler(async(req, res, next) => {
    const query = req.query;
    const limit = query.limit || 5;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const { role } = req.currentUser;
    const roleCondition = role === 'admin' ? {} : { status: 'approved' };
    const doctors = await Doctor.find(roleCondition, { '__v': false, 'password': false }).limit(limit).skip(skip);
    res.json({ status: httpStatusText.SUCCESS, data: { doctors } });
});

const getDoctorsBySpecialty = asyncHandler(async (req, res, next) => {
    const { specialty } = req.query;
    // console.log(specialty);
    if (!specialty || !specialty.trim()) {
        return next(
        appError.create('Specialty is required', 400, httpStatusText.FAIL)
    );
    }
    const { role} = req.currentUser;
    const roleCondition = role === 'admin' ? { specialization: specialty } : { specialization: specialty, status: 'approved' };
    const doctors = await Doctor.find(roleCondition);
    
    if (!doctors || doctors.length === 0) {
        return next(
        appError.create('No doctors found for this specialty', 404, 'Not Found')
    );
    }
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { doctors } });
});

const getDoctorsByName = asyncHandler(async (req, res, next) => {
    const { firstName, lastName } = req.query;
    if (!firstName || !firstName.trim()) {
        return next(
            appError.create('First name is required', 400, httpStatusText.FAIL)
        );
    }
    if (!lastName || !lastName.trim()) {
        return next(
            appError.create('Last name is required', 400, httpStatusText.FAIL)
        );
    }

    const doctors = await Doctor.find({
        $or: [
            { firstName: { $regex: firstName, $options: 'i' } },
            { lastName: { $regex: lastName, $options: 'i' } }
        ]
    });

    if (!doctors || doctors.length === 0) {
        return next(
            appError.create('No doctors found with this name', 404, 'Not Found')
        );
    }

    res.status(200).json({ status: httpStatusText.SUCCESS, data: { doctors } });
});

const getDoctorsByLocation = asyncHandler(async (req, res, next) => {
    const { city } = req.query;
    if (!city || !city.trim()) {
        return next(
            appError.create('City is required', 400, httpStatusText.FAIL)
        );
    }
    const doctors = await Doctor.find({ city });
    if (!doctors || doctors.length === 0) {
        return next(
            appError.create('No doctors found in this location', 404, 'Not Found')
        );
    }
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { doctors } });
});

const getDoctorById = asyncHandler(async(req, res, next) => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
        return res.status(404).json({ status: httpStatusText.FAIL, message: 'Doctor not found' });
    }
    console.log(doctor.status)
    if (doctor.status !== 'approved') {
        return res.status(400).json({ status: httpStatusText.FAIL, message: 'Doctor not approved' });
    }
    res.json({ status: httpStatusText.SUCCESS, data: { doctor } });
});

const updateDoctor = asyncHandler(async(req, res, next) => {
    if (req.currentUser.role !== userRoles.ADMIN){
        if (req.currentUser.id !== req.params.id) {
            return res.status(403).json({
                status: httpStatusText.FAIL,
                message: 'You are not authorized to update this doctor\'s data.'
            });
        }
        delete req.body.status;
    }
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doctor) {
        return res.status(404).json({ status: httpStatusText.FAIL, message: 'Doctor not found' });
    }
    res.json({ status: httpStatusText.SUCCESS, data: { doctor } });
});

const updateDoctorStatus = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(id, { status }, { new: true, runValidators: true});
    if (!doctor) {
        return res.status(404).json({ status: httpStatusText.FAIL, message: 'Doctor not found' });
    }
    res.json({ status: httpStatusText.SUCCESS, data: { doctor } });
});

const deleteDoctor = asyncHandler(async(req, res, next) => {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
        return res.status(404).json({ status: httpStatusText.FAIL, message: 'Doctor not found' });
    }
    res.json({ status: httpStatusText.SUCCESS, data: null });
})

const getDoctorSchedule = asyncHandler(async(req, res, next) => {
    console.log(req.params);
    const { id } = req.params;
    const appointments = await Appointment.find({ doctorId: id });
    if (!appointments) {
        return res.status(404).json({ status: httpStatusText.FAIL, message: 'Appointments not found' });
    }
    res.json({ status: httpStatusText.SUCCESS, data: { appointments } });
});

const updateDoctorSchedule = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const newData = req.params.body;
    const updatedAppointment = await Doctor.findByIdAndUpdate(id, { schedule: newData }, { new: true, runValidators: true });
    res.json({ status: httpStatusText.SUCCESS, data: { updatedAppointment } });
});

const getProfile = asyncHandler(async(req, res, next) => {
    const { id } = req.currentUser;
    const doctor = await Doctor.findById(id);
    if (!doctor) {
        return res.status(404).json({ status: httpStatusText.FAIL, message: 'Doctor not found' });
    }
    res.json({ status: httpStatusText.SUCCESS, data: { doctor } });
});

const getDoctorDashboard = asyncHandler(async(req, res, next) => {
    const doctorId = req.currentUser.id;
    const upcomingAppointments = await Appointment.find({
        doctorId: doctorId,
        appointmentDate: { $gte: new Date() },
        status: 'confirmed'  // Better to change to scheduled in the model
    })
    .populate('patientId', 'firstName lastName phone email')
    .populate('nurseId', 'firstName lastName')

    const patients = await Appointment.find( { doctorId: doctorId })
        .distinct('patientId')
        .populate('patientId', 'firstName lastName email');
    
    const nurses = await Appointment.find({ doctorId: doctorId })
        .distinct(nurseId)
        .populate('nurseId', 'firstName lastName');

    const doctor = await Doctor.findById(doctorId)
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { upcomingAppointments, patients, nurses, schedule: doctor.schedule }})
});

const registerNurse = asyncHandler(async(req, res, next) => {
    //console.log('Request body:', req.body);

    const { firstName, lastName, email, password, phone } = req.body;
    //console.log(req.body);
    const nurse = await Nurse.findOne({email: email});
    console.log('finding nurs')
    if (nurse) {
        const error = appError.create('Nurse already exists', 400, httpStatusText.FAIL)
        return next(error);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(hashedPassword)
    const newNurse = new Nurse({
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        role: userRoles.NURSE,
        doctor: req.currentUser.id
    })
    try {
        const token = await generateJWT({ email: newNurse.email, id: newNurse._id, role: newNurse.role });
        newNurse.token = token;
        await newNurse.save();
        await sendNurseRegistrationEmail(newNurse.email, `http://${req.headers.host}/api/nurses/login`, password);
        res.status(201).json({ status: httpStatusText.SUCCESS, data: { nurse: newNurse } });
    } catch (err) {
        const error = appError.create('Failed to register the nurse', 500, httpStatusText.ERROR);
        return next(error);
    }
});

const getNursesByDoctor = asyncHandler(async(req, res) => {
    const doctorId = req.currentUser.id || req.currentUser._id; // Handle both cases
    console.log("Doctor ID from Token:", doctorId); // Debugging

    const query = req.query;
    const limit = query.limit || 5;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const nurses = await Nurse.find({ doctor: doctorId }, { '__v': false, 'password': false })
                                .limit(limit)
                                .skip(skip);
    if (!nurses.length) {
        return res.status(404).json({ status: httpStatusText.FAIL, message: 'No nurses found' });
    }
    res.json({ status: httpStatusText.SUCCESS, data: { nurses } });
});

const rateDoctor = asyncHandler(async (req, res, next) => {
    const { rating } = req.body;
    const doctorId = req.params.id;
    if (!rating || rating < 1 || rating > 5) {
        return next(appError.create('Please provide a rating between 1 and 5', 400));
    }
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        return next(appError.create('Doctor not found', 404));
    }
    const newTotalRatings = doctor.totalRating + 1;
    doctor.averageRating = ((doctor.averageRating * doctor.totalRating) + rating) / newTotalRatings;
    doctor.totalRating = newTotalRatings;
    await doctor.save();
    res.status(200).json({
        status: 'success',
        data: {
            averageRating: doctor.averageRating,
            totalRating: doctor.totalRating
        }
    });
});

const getDoctorRatings = asyncHandler(async (req, res, next) => {
    const doctorId = req.params.id;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        return next(appError.create('Doctor not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            averageRating: doctor.averageRating,
            totalRating: doctor.totalRating
        }
    });
});


module.exports = {
    register,
    requestResetPassword,
    resetPassword,
    login,
    getAllDoctors,
    getDoctorsBySpecialty,
    getDoctorsByName,
    getDoctorsByLocation,
    getDoctorById,
    updateDoctor,
    updateDoctorStatus,
    deleteDoctor,
    getDoctorSchedule,
    updateDoctorSchedule,
    getProfile,
    getDoctorDashboard,
    registerNurse,
    getNursesByDoctor,
    rateDoctor,
    getDoctorRatings
}