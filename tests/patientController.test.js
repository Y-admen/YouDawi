const request = require('supertest');
const app = require('../app');
const Patient = require('../models/patientModel');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

beforeAll(async () => {
    await mongoose.connect(process.env.DB_URL_TEST);
});

afterAll(async () => {
  // Close the connection to the database
  await mongoose.connection.close();
});

// Sample patient data for testing
const patientData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  password: 'password123',
  phone: '1234567890',
  gender: 'male',
  dateOfBirth: '1990-01-01',
  address: '123 Main St',
  healthHistory: 'No significant history',
};

describe('Patient Controller Tests', () => {
  it('should register a new patient', async () => {
    const res = await request(app)
      .post('/api/patients/register')
      .send(patientData);

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data.patient).toHaveProperty('_id');
    expect(res.body.data.patient.email).toBe(patientData.email);
  });

  it('should return 400 if user already exists', async () => {
    await request(app)
      .post('/api/patients/register')
      .send(patientData);

    const res = await request(app)
      .post('/api/patients/register')
      .send(patientData);

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('fail');
  });

  it('should login an existing patient', async () => {
    const res = await request(app)
      .post('/api/patients/login')
      .send({ email: patientData.email, password: patientData.password });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data).toHaveProperty('token');
  });

  it('should return 401 for invalid credentials', async () => {
    const res = await request(app)
      .post('/api/patients/login')
      .send({ email: patientData.email, password: 'wrongpassword' });

    expect(res.status).toBe(401);
    expect(res.body.status).toBe('fail');
  });

  it('should request password reset', async () => {
    const res = await request(app)
      .post('/api/patients/requestResetPassword')
      .send({ email: patientData.email });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.message).toBe('Password reset email sent');
  });

  it('should reset the password', async () => {
    const patient = await Patient.findOne({ email: patientData.email });
    const token = patient.resetPasswordToken;

    const res = await request(app)
      .patch(`/api/patients/resetPassword/${token}`)
      .send({ password: 'newpassword123' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.message).toBe('Password has been reset successfully');
  });

  it('should get the patient profile', async () => {
    const patient = await Patient.findOne({ email: patientData.email });
    const token = await request(app)
      .post('/api/patients/login')
      .send({ email: patientData.email, password: 'newpassword123' });

    const res = await request(app)
      .get('/api/patients/profile')
      .set('Authorization', `Bearer ${token.body.data.token}`);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.patient.email).toBe(patientData.email);
  });

  it('should return all patients', async () => {
    const res = await request(app)
      .get('/api/patients/')
      .query({ limit: 5, page: 1 });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.patients).toBeInstanceOf(Array);
  });

  it('should update the patient', async () => {
    const patient = await Patient.findOne({ email: patientData.email });
    const token = await request(app)
      .post('/api/patients/login')
      .send({ email: patientData.email, password: 'newpassword123' });

    const res = await request(app)
      .patch(`/api/patients/${patient._id}`)
      .set('Authorization', `Bearer ${token.body.data.token}`)
      .send({ phone: '0987654321' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.patient.phone).toBe('0987654321');
  });

  it('should delete the patient', async () => {
    const patient = await Patient.findOne({ email: patientData.email });
    const token = await request(app)
      .post('/api/patients/login')
      .send({ email: patientData.email, password: 'newpassword123' });

    const res = await request(app)
      .delete(`/api/patients/${patient._id}`)
      .set('Authorization', `Bearer ${token.body.data.token}`);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
  });
});
