const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utils/userRoles')

const NurseSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'This field must be a valid email']
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    avatar: {
        type: String,
        default: 'pics/default.png'
    },
    phone: {
        type: Number,
        required: true
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment"
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    },
    token: {
        type: String
    },
    role: {
        type: String,
        enum: [userRoles.NURSE],
        default: userRoles.NURSE
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    }

});

module.exports = mongoose.model('Nurse', NurseSchema);