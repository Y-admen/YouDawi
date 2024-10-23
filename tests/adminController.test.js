const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/adminModel');
const app = require('../app'); // Assuming your Express app is exported from this file
const httpStatusText = require('../utils/httpStatusText');
const jwt = require('jsonwebtoken');
const generateJWT = require('../utils/generateJWT');

describe('Admin Controller', () => {
  let adminData;
  let token;

  beforeAll(async () => {
    
    const mongoURI = process.env.DB_URL_TEST;
    await mongoose.connect(mongoURI);

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('testpassword', salt);
    adminData = new Admin({
      userName: 'admin',
      password: hashedPassword,
      role: 'admin'
    });

    await adminData.save();

   
    token = await generateJWT({
      userName: adminData.userName,
      id: adminData._id,
      role: adminData.role
    });
  });

  afterAll(async () => {
    
    await Admin.deleteMany({});
    await mongoose.connection.close();
  });

  describe('POST /api/admin/login', () => {
    it('should return 400 if username or password is missing', async () => {
      const res = await request(app).post('/api/admin/login').send({
        userName: '',
        password: 'testpassword'
      });

      expect(res.status).toBe(400);
      expect(res.body.status).toBe(httpStatusText.FAIL);
      expect(res.body.message).toBe('UserName and Password are required');
    });

    it('should return 404 if the admin is not found', async () => {
      const res = await request(app).post('/api/admin/login').send({
        userName: 'nonexistentadmin',
        password: 'testpassword'
      });

      expect(res.status).toBe(404);
      expect(res.body.status).toBe(httpStatusText.FAIL);
      expect(res.body.message).toBe('Admin not found');
    });

    it('should return 401 if the password is incorrect', async () => {
      const res = await request(app).post('/api/admin/login').send({
        userName: 'admin',
        password: 'wrongpassword'
      });

      expect(res.status).toBe(401);
      expect(res.body.status).toBe(httpStatusText.FAIL);
      expect(res.body.message).toBe('Invalid credentials');
    });

    it('should return 200 and a JWT token if the login is successful', async () => {
      const res = await request(app).post('/api/admin/login').send({
        userName: 'admin',
        password: 'testpassword'
      });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe(httpStatusText.SUCCESS);
      expect(res.body.data).toBeDefined();

      
      const decodedToken = jwt.verify(res.body.data, process.env.JWT_SECRET);
      expect(decodedToken.userName).toBe('admin');
      expect(decodedToken.role).toBe('admin');
    });
  });
});
