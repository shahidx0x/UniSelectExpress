const mongoose = require("mongoose");

const universityRegisterSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  university_name:String,
  contact_number: String,
  status: {
    type: String,
    default:'pending'
  },
  address: String,
  permission_latter: String,
});

const universityRegister = mongoose.model(
  "universityRegister",
  universityRegisterSchema
);
module.exports = universityRegister;
