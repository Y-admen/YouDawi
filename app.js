require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const appointmentRouter = require('./routes/appointmentRoute');
const doctorsRouter = require('./routes/doctorsRoute');
const adminRouter = require('./routes/adminRoute');
const patientRouter = require('./routes/patientRoute');
const nursesRouter = require('./routes/nursesRoute');
const httpStatusText = require('./utils/httpStatusText');

const HOSTNAME = '127.0.0.1';
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;
const app = express();

app.use('/pics', express.static(path.join(__dirname, 'pics')));
app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/doctors', doctorsRouter);
app.use('/api/nurses', nursesRouter);

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({ status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null });
});

mongoose.connect(DB_URL).then(() => {
    console.log(`Mongodb Server Started`);
});

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server Started on http://${HOSTNAME}:${PORT}`);
});
