const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const Appointment = require('../models/appointmentModel');
const Patient = require('../models/patientModel');

let mongoServer;

beforeAll(async() => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async() => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async() => {
    await Appointment.deleteMany();
    await Patient.deleteMany();
});

describe('Appointment Controller', () => {
    // Test for GET all appointments
    it('should return all appointments', async() => {
        const res = await request(app).get('/appointments?page=1&limit=5');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('success');
    });

    // Test for POST an appointment
    it('should create a new appointment', async() => {
        const patient = new Patient({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe56@example.com',
            password: 'password123',
            phone: 1234567890,
            gender: 'Male',
            dataOfBirth: new Date('1990-01-01'),
            age: 34,
            address: '123 Main St',
        });
        await patient.save();

        const doctorId = '670bdd8f4ece483242ad1845';
        const appointmentData = {
            patientId: patient._id,
            doctorId,
            appointmentDate: new Date('2024-10-20'),
            appointmentTime: '10:00',
        };

        const res = await request(app).post('/appointments').send(appointmentData);
        expect(res.statusCode).toEqual(201);
        expect(res.body.status).toBe('success');
        expect(res.body.data.appointment).toBeDefined();
    });

    // Test for GET appointment by ID
    it('should return an appointment by ID', async() => {
        const appointment = new Appointment({
            patientId: new mongoose.Types.ObjectId(),
            doctorId: new mongoose.Types.ObjectId(),
            appointmentDate: new Date('2024-10-20'),
            appointmentTime: '10:00',
            status: 'Pending',
        });
        await appointment.save();

        const res = await request(app).get(`/appointments/${appointment._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('success');
    });

    // Test for updating an appointment
    it('should update an existing appointment', async() => {
        const appointment = new Appointment({
            patientId: new mongoose.Types.ObjectId(),
            doctorId: new mongoose.Types.ObjectId(),
            appointmentDate: new Date('2024-10-20'),
            appointmentTime: '10:00',
            status: 'Pending',
        });
        await appointment.save();

        const res = await request(app).put(`/appointments/${appointment._id}`).send({ status: 'Confirmed' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.appointment.status).toBe('Confirmed');
    });

    // Test for deleting an appointment
    it('should delete an appointment', async() => {
        const appointment = new Appointment({
            patientId: new mongoose.Types.ObjectId(),
            doctorId: new mongoose.Types.ObjectId(),
            appointmentDate: new Date('2024-10-20'),
            appointmentTime: '10:00',
            status: 'Pending',
        });
        await appointment.save();

        const res = await request(app).delete(`/appointments/${appointment._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('success');
    });

    // Test for getting appointments by doctor ID
    it('should return appointments for a specific doctor', async() => {
        const patient = new Patient({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe56@example.com',
            password: 'password123',
            phone: 1234567890,
            gender: 'Male',
            dataOfBirth: new Date('1990-01-01'),
            age: 34,
            address: '123 Main St',
        });
        await patient.save();

        const doctorId = '670bdd8f4ece483242ad1845'
        const appointment = new Appointment({
            patientId: patient._id,
            doctorId,
            appointmentDate: new Date('2024-10-20'),
            appointmentTime: '10:00',
            status: 'Pending',
        });
        await appointment.save();

        const res = await request(app).get(`/appointments/doctor/${doctorId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('success');
        expect(res.body.data.doctorAppointments).toHaveLength(1);
    });

    // Test for getting appointments by patient ID
    it('should return appointments for a specific patient', async() => {
        const patient = new Patient({
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            password: 'password123',
            phone: 1234567890,
            gender: 'Female',
            dataOfBirth: new Date('1990-01-01'),
            age: 34,
            address: '456 Main St',
        });
        await patient.save();

        const doctorId = '670bdd8f4ece483242ad1845'
        const appointment = new Appointment({
            patientId: patient._id,
            doctorId,
            appointmentDate: new Date('2024-10-20'),
            appointmentTime: '10:00',
            status: 'Pending',
        });
        await appointment.save();

        const res = await request(app).get(`/appointments/patient/${patient._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('success');
        expect(res.body.data.patientAppointments).toHaveLength(1);
    });
});