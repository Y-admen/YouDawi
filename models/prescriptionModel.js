const mongoose = require('mongoose')
const Schema = mongoose.Schema

const prescriptionSchema = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    medications: [{
        name: { type: String, required: true },
        dosage: { type: String, required: true },
        frequency: { type: String, required: true },
        duration: { type: String, required: true }
    }],
    dateIssued: {
        type: Date,
        required: true
    },

    instructions: String,
})

const prescription = mongoose.model('Prescription', prescriptionSchema)
module.exports = prescription;