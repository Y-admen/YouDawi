const Prescription = require('../models/prescriptionModel')
const Patient = require('../models/patientModel');
const asyncHandler = require('../middlewares/asyncHandler')
const httpStatusText = require('../utils/httpStatusText')

const getAllprescriptions = asyncHandler(async(req, res) => {
    const query = req.query
    const limit = query.limit
    const page = query.page
    const skip = (page - 1) * limit
    const prescriptions = await Prescription.find({}, { '__v': false }).limit(limit).skip(skip);
    res.json({ status: httpStatusText.SUCCESS, data: { prescriptions } });
});

const postprescription = asyncHandler(async(req, res) => {
    const { patientId, doctorId, medications, dateIssued, instructions } = req.body;
    const prescription = new Prescription({
        patientId,
        doctorId,
        medications,
        dateIssued,
        instructions
    });
    const newPrescription = await prescription.save();
    const response = newPrescription.toObject({ versionKey: false });
    const patient = await Patient.findById(patientId);
    if (!patient) {
        return res.status(404).json({ status: httpStatusText.FAIL, message: 'Patient not found' });
    }

    patient.healthHistory.push({
        prescriptions: {
            prescriptionId: newPrescription._id,
            medications: medications,
            dateIssued: dateIssued,
            instructions: instructions,
            doctor: doctorId
        }
    });

    await patient.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { prescription: response } });
});

const getprescriptionById = asyncHandler(async(req, res) => {
    const prescription = await Prescription.findById(req.params.id).select('-__v');
    if (!prescription) {
        return res.status(404).json({ status: httpStatusText.FAIL, message: 'Prescription not found' });
    }
    res.json({ status: httpStatusText.SUCCESS, data: { prescription } });
});

const updatePrescription = asyncHandler(async(req, res) => {
    const prescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('-__v');
    // new: return updated document / runValidators: updated data meets schema requirements.
    if (!prescription) {
        return res.status(404).json({ status: httpStatusText.FAIL, message: 'prescription not found' });
    }
    res.json({ status: httpStatusText.SUCCESS, data: { prescription } });
});

module.exports = {
    getAllprescriptions,
    postprescription,
    getprescriptionById,
    updatePrescription
}
