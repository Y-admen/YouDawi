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
const crypto = require('crypto');
const { sendPasswordResetEmail } = require('../utils/mailUtils')


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

const requestResetPassword = asyncHandler(async(req, res, next) => {
    const { email } = req.body;
    try {
        const nurse = await Nurse.findOne({ email });

        if (!nurse) {
            return next(appError.create('Nurse not found, Please register', 404, httpStatusText.FAIL));
        }

        const token = crypto.randomBytes(20).toString('hex');

        nurse.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
        nurse.resetPasswordExpires = Date.now() + 3600000;

        await nurse.save();
        const resetURL = `http://${req.headers.host}/resetPassword/${token}`;
        // console.log(resetURL)

        // console.log('EMAIL_USER:', process.env.EMAIL_USER);
        // console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

        await sendPasswordResetEmail(nurse.email, resetURL);
        res.status(200).json({ status: httpStatusText.SUCCESS, message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error sending email:', error);
            return next(appError.create('Error sending email', 500, httpStatusText.FAIL));
    }
});

const resetPassword = asyncHandler(async (req, res, next) => {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const nurse = await Nurse.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
    });
    if (!nurse) {
        return next(appError.create('Password reset token is invalid or has expired', 400, httpStatusText.FAIL));
    }
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    nurse.password = hashedPassword;
    nurse.resetPasswordToken = undefined;
    nurse.resetPasswordExpires = undefined;
    await nurse.save();
    res.status(200).json({ status: httpStatusText.SUCCESS, message: 'Password has been reset successfully' });
});

const getAllNurses = asyncHandler(async(req, res) => {
    const query = req.query;
    const limit = query.limit || 5;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const nurses = await Nurse.find({}, { '__v': false, 'password': false }).limit(limit).skip(skip);
    res.json({ status: httpStatusText.SUCCESS, data: { nurses } });
});

const getNurseById = asyncHandler(async(req, res) => {
    const nurse = await Nurse.findById(req.params.id);
    if (!nurse) {
        return res.status(404).json({ status: httpStatusText.FAIL, message: 'Nurse not found' });
    }
    res.json({ status: httpStatusText.SUCCESS, data: { nurse } });
});

const updateNurse = asyncHandler(async(req, res) => {
    if (req.currentUser.role !== userRoles.ADMIN && req.currentUser.role !== userRoles.DOCTOR){
        if (req.currentUser.id !== req.params.id) {
            return res.status(403).json({
                status: httpStatusText.FAIL,
                message: 'You are not authorized to update this nurse\'s data.'
            });
        }
        delete req.body.status;
    }
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const nurse = await Nurse.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!nurse) {
        return res.status(404).json({ status: httpStatusText.FAIL, message: 'Nurse not found' });
    }
    res.json({ status: httpStatusText.SUCCESS, data: { nurse } });
});

const deleteNurse = asyncHandler(async(req, res) => {
    const nurse = await Nurse.findByIdAndDelete(req.params.id);
    if (!nurse) {
        return res.status(404).json({ status: httpStatusText.FAIL, message: 'Nurse not found' });
    }
    res.json({ status: httpStatusText.SUCCESS, data: null });
});


const deactivateNurse = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const nurse = await Nurse.findByIdAndUpdate(id, { status }, { new: true, runValidators: true});
    if (!nurse) {
        return res.status(404).json({ status: httpStatusText.FAIL, message: 'Nurse not found' });
    }
    res.json({ status: httpStatusText.SUCCESS, data: { nurse } });
});

const getProfile = asyncHandler(async(req, res, next) => {
    const nurse = await Nurse.findById(req.currentUser.id);
    if (!nurse) {
        return res.status(404).json({ status: httpStatusText.FAIL, message: 'Nurse not found' });
    }
    res.json({ status: httpStatusText.SUCCESS, data: { nurse } });
});

const getNurseDashboard = asyncHandler(async (req, res, next) => {
    const nurseId = req.currentUser.id;
    
    try {
        const nurse = await Nurse.findById(nurseId)
            .populate('doctor', 'firstName lastName')
            .select('-password');
        
        if (!nurse) {
            return res.status(404).json({ message: 'Nurse not found' });
        }

        const dashboardData = {
            nurseProfile: {
                firstName: nurse.firstName,
                lastName: nurse.lastName,
                email: nurse.email,
                phone: nurse.phone,
                avatar: nurse.avatar,
                doctor: nurse.doctor ? `${nurse.doctor.firstName} ${nurse.doctor.lastName}` : null
            },
            appointments: await getUpcomingAppointments(nurse._id),
            patients: await Appointment.find( { nurseId: nurseId })
                .distinct('patientId')
                .populate('patientId', 'firstName lastName email')
        };

        res.status(200).json(dashboardData);
    } catch (error) {
        console.error('Error fetching nurse dashboard:', error);
        next(error); 
    }
});

async function getUpcomingAppointments(nurseId) {
    try {
        return Appointment.find({
            nurseId: nurseId,
            status: 'confirmed'
        })
        .populate('patient', 'firstName lastName phone email')
        .select('_id appointmentDate patient');
    } catch (error) {
        console.error('Error fetching upcoming appointments:', error);
        throw error;
    }
}


module.exports = {
    login,
    requestResetPassword,
    resetPassword,
    getAllNurses,
    getNurseById,
    updateNurse,
    deleteNurse,
    deactivateNurse,
    getProfile,
    getNurseDashboard
}