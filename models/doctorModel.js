const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utils/userRoles')

const DoctorSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
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
    adresse: {
        type: String,
        required: true
    },
    city: {
        type: String,
        enum: ['Alexandria', 'Aswan', 'Abydos', 'Avaris', 'Port Said', 'Faiyum', 'Elephantine', 'Amarna', 'Asyut', 'Giza', 'Luxor', 'Heliopolis', 'Sharm El-Sheikh', 'El-Mansoura', 'Akhetaten', 'Crocodiloplis city', 'Cairo', 'Minya', 'Thebes', 'Memphis', 'Zagazig', 'Edfu', 'Al Mahallah Al Kubra', 'Hermopolis'],
        required: true
    },
    logo: {
        type: String,
        default: 'pics/logo.png'
    },
    phone: {
        type: Number,
        required: true
    },
    specialization: {
        type: [String],
        enum: ['Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology', 'General Practice', 'Neurology', 'Oncology', 'Orthopedics', 'Pediatrics', 'Psychiatry', 'Pulmonology'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'cancelled'],
        default: 'pending'
    },
    schedule: [
        {
            day: {
                type: String,
                required: true
            },
            timeSlots: {
                type: [String],
                required: true
            }
        }
    ],
    price: {
        type: Number
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    totalRating: {
        type: Number,
        default: 0,
        
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment"
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
        enum: [userRoles.DOCTOR],
        default: userRoles.DOCTOR
    }

});

module.exports = mongoose.model('Doctor', DoctorSchema);