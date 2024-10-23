const request = require('supertest');
const app = require('../app'); 
const Nurse = require('../models/nurseModel');
const userRoles = require('../utils/userRoles');
const mongoose = require('mongoose');


jest.mock('../models/nurseModel');

describe('Nurse Controller', () => {
    
    afterAll(async () => {
        
        await mongoose.connection.close();
    });

    describe('Login Nurse', () => {
        it('should return a token when login is successful', async () => {
            const mockNurse = {
                _id: 'nurseId123',
                email: 'testnurse@gmail.com',
                password: await bcrypt.hash('password123', 10),
                status: 'Active',
                role: 'Nurse'
            };

            
            Nurse.findOne.mockResolvedValue(mockNurse);

            const response = await request(app)
                .post('/api/nurses/login')
                .send({ email: 'testnurse@gmail.com', password: 'password123' });

            expect(response.status).toBe(200);
            expect(response.body.data.token).toBeDefined();
        });

        it('should return an error if nurse is not found', async () => {
            Nurse.findOne.mockResolvedValue(null);

            const response = await request(app)
                .post('/api/nurses/login')
                .send({ email: 'nonexistentnurse@gmail.com', password: 'password123' });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Nurse not found');
        });
    });

    describe('Request Password Reset', () => {
        it('should send a password reset email if nurse exists', async () => {
            const mockNurse = {
                _id: 'nurseId123',
                email: 'testnurse@gmail.com'
            };

            Nurse.findOne.mockResolvedValue(mockNurse);

            const response = await request(app)
                .post('/api/nurses/requestResetPassword')
                .send({ email: 'testnurse@gmail.com' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Password reset email sent');
        });

        it('should return an error if nurse is not found', async () => {
            Nurse.findOne.mockResolvedValue(null);

            const response = await request(app)
                .post('/api/nurses/requestResetPassword')
                .send({ email: 'nonexistentnurse@gmail.com' });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Nurse not found, Please register');
        });
    });
});
