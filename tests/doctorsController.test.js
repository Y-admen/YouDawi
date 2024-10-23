const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Doctor = require('../models/doctorModel');
const userRoles = require('../utils/userRoles');
const jwt = require('jsonwebtoken');

beforeAll(async () => {
    await mongoose.connect(process.env.DB_URL_TEST);
});

afterAll(async () => {
    await mongoose.disconnect();
});

const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
};

describe('Doctor API', () => {
    let token;

    beforeEach(async () => {
        const response = await request(app)
            .post('/api/doctors/register')
            .send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                adresse: '123 Main St',
                city: 'Cairo',
                phone: '0123456789',
                specialization: ['Cardiology'],
            });

        token = response.body && response.body.data && response.body.data.doctor ? response.body.data.doctor.token : null;
    });

    afterEach(async () => {

        await Doctor.deleteOne({ email: 'jane.doe@example.com' });
    });

    it('should register a new doctor', async () => {
        try {
            const response = await request(app)
                .post('/api/doctors/register')
                .send({
                    firstName: 'Jane',
                    lastName: 'Doe',
                    email: 'jane.doe@example.com',
                    password: 'password123',
                    adresse: '456 Elm St',
                    city: 'Cairo',
                    phone: '0987654321',
                    specialization: ['Pediatrics'],
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('doctor');
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

    it('should log in an existing doctor', async () => {
        try {
            const response = await request(app)
                .post('/api/doctors/login')
                .send({
                    email: 'john.doe@example.com',
                    password: 'password123',
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

    it('should get all doctors', async () => {
        try {
            const response = await request(app)
                .get('/api/doctors/')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

    it('should get a doctor by ID', async () => {
        try {
            const doctor = await Doctor.findOne({ email: 'john.doe@example.com' });
            const response = await request(app)
                .get(`/api/doctors/${doctor._id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('email', 'john.doe@example.com');
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

    it('should update a doctor\'s information', async () => {
        try {
            const doctor = await Doctor.findOne({ email: 'john.doe@example.com' });
            const response = await request(app)
                .put(`/api/doctors/${doctor._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ firstName: 'John', lastName: 'Smith' });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('lastName', 'Smith');
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

    it('should delete a doctor', async () => {
        try {
            const doctor = await Doctor.findOne({ email: 'john.doe@example.com' });
            const response = await request(app)
                .delete(`/api/doctors/${doctor._id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });
});
