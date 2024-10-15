const mongoose = require('mongoose');
const userRoles = require('../utils/userRoles');

const adminSchema = new mongoose.Schema({
  userName: {
    //  default: 'admin',
    type: String,
    require: true
  },
  password: {
    //  default: '12345',
    type: String,
    require: true
  },
  role: {
    type: String,
    enum: [userRoles.ADMIN],
    default: userRoles.ADMIN
  },
  token: {
    type: String
  }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
