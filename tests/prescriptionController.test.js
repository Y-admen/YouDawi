const request = require('supertest');
const mongoose = require('mongoose');
const Prescription = require('../models/prescriptionModel');
const Patient = require('../models/patientModel');
const app = require('../app');
const httpStatusText = require('../utils/httpStatusText');

describe('Prescription Controller', () => {
  let patientId;
  let prescriptionId;

  beforeAll(async () => {
    
    const mongoURI = process.env.DB_URL_TEST;
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    
    const patient = new Patient({
      name: 'Test Patient',
      healthHistory: []
    });

    const savedPatient = await patient.save();
    patientId = savedPatient._id.toString();
  });

  afterAll(async () => {
    
    await Prescription.deleteMany({});
    await Patient.deleteMany({});
    await mongoose.connection.close();
  });

  describe('GET /api/prescriptions', () => {
    it('should return all prescriptions with pagination', async () => {
      const res = await request(app).get('/api/prescriptions?limit=10&page=1');

      expect(res.status).toBe(200);
      expect(res.body.status).toBe(httpStatusText.SUCCESS);
      expect(res.body.data.prescriptions).toBeDefined();
    });
  });

  describe('POST /api/prescriptions', () => {
    it('should create a new prescription', async () => {
      const res = await request(app).post('/api/prescriptions').send({
        patientId,
        doctorId: 'dummyDoctorId',
        medications: [{ name: 'Medication A', dosage: '100mg' }],
        dateIssued: new Date(),
        instructions: 'Take once daily'
      });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe(httpStatusText.SUCCESS);
      expect(res.body.data.prescription).toBeDefined();
      prescriptionId = res.body.data.prescription._id;
    });

    it('should return 404 if the patient does not exist', async () => {
      const res = await request(app).post('/api/prescriptions').send({
        patientId: 'nonexistentPatientId',
        doctorId: 'dummyDoctorId',
        medications: [{ name: 'Medication A', dosage: '100mg' }],
        dateIssued: new Date(),
        instructions: 'Take once daily'
      });

      expect(res.status).toBe(404);
      expect(res.body.status).toBe(httpStatusText.FAIL);
      expect(res.body.message).toBe('Patient not found');
    });
  });

  describe('GET /api/prescriptions/:id', () => {
    it('should return a prescription by ID', async () => {
      const res = await request(app).get(`/api/prescriptions/${prescriptionId}`);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe(httpStatusText.SUCCESS);
      expect(res.body.data.prescription).toBeDefined();
    });

    it('should return 404 if the prescription is not found', async () => {
      const res = await request(app).get('/api/prescriptions/nonexistentPrescriptionId');

      expect(res.status).toBe(404);
      expect(res.body.status).toBe(httpStatusText.FAIL);
      expect(res.body.message).toBe('Prescription not found');
    });
  });

  describe('PUT /api/prescriptions/:id', () => {
    it('should update a prescription', async () => {
      const res = await request(app).put(`/api/prescriptions/${prescriptionId}`).send({
        medications: [{ name: 'Medication B', dosage: '200mg' }],
        instructions: 'Take twice daily'
      });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe(httpStatusText.SUCCESS);
      expect(res.body.data.prescription).toBeDefined();
      expect(res.body.data.prescription.medications[0].name).toBe('Medication B');
    });

    it('should return 404 if the prescription is not found for update', async () => {
      const res = await request(app).put('/api/prescriptions/nonexistentPrescriptionId').send({
        medications: [{ name: 'Medication C', dosage: '300mg' }]
      });

      expect(res.status).toBe(404);
      expect(res.body.status).toBe(httpStatusText.FAIL);
      expect(res.body.message).toBe('prescription not found');
    });
  });

  describe('DELETE /api/prescriptions/:id', () => {
    it('should delete a prescription', async () => {
      const res = await request(app).delete(`/api/prescriptions/${prescriptionId}`);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe(httpStatusText.SUCCESS);
      expect(res.body.data).toBeNull();
    });

    it('should return 404 if the prescription is not found for deletion', async () => {
      const res = await request(app).delete('/api/prescriptions/nonexistentPrescriptionId');

      expect(res.status).toBe(404);
      expect(res.body.status).toBe(httpStatusText.FAIL);
      expect(res.body.message).toBe('Prescription not found');
    });
  });
});
