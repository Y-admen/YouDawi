require('dotenv').config({ path: '../.env' });
const Admin = require('../models/adminModel');
const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');
const Nurse = require('../models/nurseModel');
const Appointment = require('../models/appointmentModel');
const asyncHandler = require('../middlewares/asyncHandler');
const doctorsController = require('../controllers/doctorsController');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const generateJWT = require("../utils/generateJWT");
const userRoles = require('../utils/userRoles');


async function addAdmin() {
    try {
        const adminCount = await Admin.countDocuments({ userName: 'admin' });

        if (adminCount < 1) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(process.env.PASSWORD_ADMIN, salt);
            const newAdmin = new Admin({
                userName: process.env.UESRNAME_ADMIN,
                password: hashedPassword,
                role: userRoles.ADMIN,
            });

            await newAdmin.save();
            console.log('Admin added successfully');
        } else {
            console.log('Admin already exists. No need to add another one.');
        }
    } catch (error) {
        console.error('Error adding admin:', error.message);
    }
}
addAdmin();

const login = asyncHandler(async(req, res, next) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return next(appError.create('UserName and Password are required', 400, httpStatusText.FAIL));
    }

    try {
        const admin = await Admin.findOne({ userName });
        if (!admin) {
            return next(appError.create('Admin not found', 404, httpStatusText.FAIL));
        }

        const matchedPassword = await bcrypt.compare(password, admin.password);

        if (matchedPassword) {
            const token = await generateJWT({
                userName: admin.userName,
                id: admin._id,
                role: admin.role
            });
            admin.token = token
            await admin.save();

            return res.status(200).json({ status: httpStatusText.SUCCESS, data: token });
        } else {
            return next(appError.create('Invalid credentials', 401, httpStatusText.FAIL));
        }
    } catch (error) {
        console.error('Error handling login:', error.message);
        return next(appError.create('Internal server error', 500, httpStatusText.FAIL));
    }
});

const getAdminDashboard = async(req, res, next) => {
    try {
        const totalPatients = await Patient.countDocuments();

        const totalDoctors = await Doctor.countDocuments();
        const pendingDoctors = await Doctor.countDocuments({ status: 'pending' });
        const approvedDoctors = await Doctor.countDocuments({ status: 'approved' });
        const cancelledDoctors = await Doctor.countDocuments({ status: 'cancelled' });

        const totalNurses = await Nurse.countDocuments();
        const activeNurses = await Nurse.countDocuments({ status: 'active' });
        const inactiveNurses = await Nurse.countDocuments({ status: 'inactive' });

        const totalAppointments = await Appointment.countDocuments();

        // Fetch the list of pending doctors
        const pendingDoctorList = await Doctor.find({ status: 'pending' }).select('firstName lastName email'); // Select fields you want to return

        const dashboardData = {
            totalPatients,
            totalDoctors,
            pendingDoctors,
            approvedDoctors,
            cancelledDoctors,
            totalNurses,
            activeNurses,
            inactiveNurses,
            totalAppointments,
            pendingDoctorList,
        };

        res.status(200).json({
            status: 'success',
            data: dashboardData,
        });
    } catch (error) {
        return next(appError.create('Failed to get dashboard data', 500, 'ERROR'));
    }
};




module.exports = {
    login,
    getAdminDashboard
}