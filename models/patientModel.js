const mongoose = require('mongoose');
const userRoles = require('../utils/userRoles');
const validator = require('validator');


const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        require: true
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
    phone: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,  // field format:  YYYY-MM-DD
    //    required: true
    },
    age: {
        type: Number,
    },
    avatar: {
        type: String,
        default: 'pics/default.png'
    },
    address: {
        type: String,
        required: true
    },
    healthHistory: [{
        familyStatus: {
            type: String,
         //   required: true
        },
        diseases: {
            type: String,
          //  required: true
        },
        examinations: {
            type: String,
        //    required: true
        },
        diagnosis: {
            type: String,
         //   require: true
        },
        treatment: {
            type: String,
         //   require: true
        },
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient"
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor"
        },
        prescriptions: [{
            prescriptionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Prescription',
             //   required: true
            },
            doctorName: {
                type: String,
              //  required: true  // doctor's name
            },
            dateIssued: {
                type: Date,
              //  required: true
            },
            instructions: {
                type: String,  
               // required: true
            },
            medications: [{
                name: {
                    type: String,
                  //  required: true
                },
                dosage: {
                    type: String,
                   // required: true
                },
                frequency: {
                    type: String,
                  //  required: true
                },
                duration: {
                    type: String,
                  //  required: true
                }
                }]
        }]
    }],
    appointmentsNotifications: [{
        status: {
            type: String,
            enum: ['Approved', 'Appointment Remember'],
            default: 'Appointment Remember'
        },
        message: {
            type: String,
            default: 'You are subscribed for appointment notifications.'
        },
        read: {
            type: Boolean,
            default: false
        },
        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment"
        },
        createdAt: {
            type: Date,
            default: Date.now,
            required: true
        }

    }],
  // which holds the information needed to send push 
  // notifications to that patient.
  //  keys and endpoint information is needed to send push notifications.
    pushSubscription: {
    endpoint: String,
    keys: {
        p256dh: String,
        auth: String
    }
    },
    role: {
    type: String,
    enum: [userRoles.PATIENT],
    default: userRoles.PATIENT
    },
    token: {
        type: String
    },
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
