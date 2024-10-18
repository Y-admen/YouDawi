const Patient = require('../models/patientModel')
const asyncHandler = require('../middlewares/asyncHandler')
const httpStatusText = require('../utils/httpStatusText')
const appError = require('../utils/appError')
const bcrypt = require("bcryptjs");
const generateJWT = require("../utils/generateJWT");

const registerPatient = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, phone, gender, dataOfBirth, age, address, healthHistory } = req.body;
  const patient = await Patient.findOne({ email: email });
  if (patient) {
    const error = appError.create('User already exists', 400, httpStatusText.FAIL);
    return next(error);
  }
  let avatar = 'pics/default.png';
  if (req.file) {
    avatar = req.file.filename;
    console.log('Avatar uploaded successfully:', avatar);
  }


  // salt, which is a random string added to the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newPatient = new Patient({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phone,
    gender,
    dataOfBirth,
    age,
    address,
    avatar,
    healthHistory
  });
  // secure way to encode and transmit user information 
  // between (usually between the client and server)
  try {
    const token = await generateJWT({ email: newPatient.email, id: newPatient._id, role: 'patient' });
    newPatient.token = token;

    await newPatient.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { patient: newPatient } });
  } catch (err) {
    return next(appError.create('Failed to register the patient', 500, httpStatusText.ERROR));
  }
});

const requestResetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  try {
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return next(appError.create('Patient not found, Please register', 404, httpStatusText.FAIL));
    }

    const token = crypto.randomBytes(20).toString('hex');

    patient.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    patient.resetPasswordExpires = Date.now() + 3600000;

    await patient.save();
    const resetURL = `http://${req.headers.host}/resetPassword/${token}`;
    await sendPasswordResetEmail(patient.email, resetURL);
    res.status(200).json({ status: httpStatusText.SUCCESS, message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    return next(appError.create('Error sending email', 500, httpStatusText.FAIL));
  }
});


const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = appError.create('Email and Password are required', 400, httpStatusText.FAIL);
    return next(error);
  }
  const patient = await Patient.findOne({ email: email });
  if (!patient) {
    const error = appError.create('Patient not found', 404, httpStatusText.FAIL);
    return next(error);
  }
  const matchedPassword = await bcrypt.compare(password, patient.password);
  if (matchedPassword) {
    const token = await generateJWT({ email: patient.email, id: patient._id, role: patient.role });
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { token } });
  } else {
    const error = appError.create('Invalid credentials', 401, httpStatusText.FAIL);
    return next(error);
  }

});

const getProfile = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findById(req.currentUser.id);
  if (!patient) {
    return res.status(404).json({ status: httpStatusText.FAIL, message: "Patient Not Found" })
  }
  res.json({ status: httpStatusText.SUCCESS, data: { patient } });
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const patient = await Patient.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!patient) {
    return next(appError.create('Password reset token is invalid or has expired', 400, httpStatusText.FAIL));
  }
  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  patient.password = hashedPassword;
  patient.resetPasswordToken = undefined;
  patient.resetPasswordExpires = undefined;
  await patient.save();
  res.status(200).json({ status: httpStatusText.SUCCESS, message: 'Password has been reset successfully' });
});


const getAllPatients = asyncHandler(async (req, res, next) => {
  const query = req.query;
  const limit = query.limit || 5;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const patients = await Patient.find({}, { '__v': false, 'password': false }).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { patients } });
});

const getPatientById = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);
  if (!patient) {
    return res.status(404).json({ status: httpStatusText.FAIL, message: 'Patient not found' });
  }
  res.json({ status: httpStatusText.SUCCESS, data: { patient } });
});

const updatePatient = asyncHandler(async (req, res) => {
  if (req.currentUser.role !== userRoles.ADMIN) {
    if (req.currentUser.id !== req.params.id) {
      return res.status(403).json({
        status: httpStatusText.FAIL,
        message: 'You are not authorized to update this patient\'s data.'
      });
    }
    delete req.body.status;
  }
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!patient) {
    return res.status(404).json({ status: httpStatusText.FAIL, message: 'Patient not found' });
  }
  res.json({ status: httpStatusText.SUCCESS, data: { patient } });
});

const deletePatient = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findByIdAndDelete(req.params.id);
  if (!patient) {
    return res.status(404).json({ status: httpStatusText.FAIL, message: 'Patient not found' });
  }
  res.json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  registerPatient,
  login,
  requestResetPassword,
  resetPassword,
  getProfile,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
}
