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

module.exports = {
    getAllprescriptions
}