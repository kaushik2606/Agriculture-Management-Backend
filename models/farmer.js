const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
    enum: ["Farmer", "Buyer", "Admin"],
    default: "Farmer",
  },

  profileImage: {
    type: String,
  },

  otp: {
    type: String,
  },

  otpExpires: {
    type: Date,
  },

  address: {
    type: String,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Farmer", farmerSchema);
