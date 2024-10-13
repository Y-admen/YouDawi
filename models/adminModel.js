const mongoose = require('mongoose');

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
  },
  token: {
    type: String
  }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
