const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
//const { MongoMemoryServer } = require('mongodb-memory-server');
const Doctor = require('../models/doctorModel');
const userRoles = require('../utils/userRoles');

//let mongoServer;

jest.setTimeout(30000); // 30 seconds for all tests

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test');
}, 30000); // 30 seconds for beforeAll

afterAll(async () => {
    await mongoose.disconnect();
    server.close(); 
});

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

        token = response.body.data.doctor.token;
    });

    it('should register a new doctor', async () => {
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
    });

    it('should log in an existing doctor', async () => {
        const response = await request(app)
            .post('/api/doctors/login')
            .send({
                email: 'john.doe@example.com',
                password: 'password123',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should get all doctors', async () => {
        const response = await request(app)
            .get('/api/doctors/')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get a doctor by ID', async () => {
        const doctor = await Doctor.findOne({ email: 'john.doe@example.com' });
        const response = await request(app)
            .get(`/api/doctors/${doctor._id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('email', 'john.doe@example.com');
    });

    it('should update a doctor\'s information', async () => {
        const doctor = await Doctor.findOne({ email: 'john.doe@example.com' });
        const response = await request(app)
            .put(`/api/doctors/${doctor._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ firstName: 'John', lastName: 'Smith' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('lastName', 'Smith');
    });

    it('should delete a doctor', async () => {
        const doctor = await Doctor.findOne({ email: 'john.doe@example.com' });
        const response = await request(app)
            .delete(`/api/doctors/${doctor._id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });
});
