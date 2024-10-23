const mongoose = require('mongoose');
const userRoles = require('../utils/userRoles');
const validator = require('validator');


const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: [validator.isEmail, 'This field must be a valid email']
  },
  password: {
    type: String,
    require: true
  },
  phone: {
    type: Number,
    require: true
  },
  gender: {
    type: String,
    require: true
  },
  dateOfBirth: {
    type: Date,  // field format:  YYYY-MM-DD
    require: true
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
    require: true
  },
  healthHistory: [{
    familyStatus: {
      type: String,
      require: true
    },
    diseases: {
      type: String,
      require: true
    },
    examinations: {
      type: String,
      require: true
    },
    diagnosis: {
      type: String,
      require: true
    },
    treatment: {
      type: String,
      require: true
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
        required: true
      },
      medications: [{
        name: {
          type: String,
          required: true
        },
        dosage: {
          type: String,
          required: true
        },
        frequency: {
          type: String,
          required: true
        },
        duration: {
          type: String,
          required: true
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
