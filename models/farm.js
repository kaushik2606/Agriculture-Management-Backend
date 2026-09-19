const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farmer",
    required: true,
  },

  farmName: {
    type: String,
    required: true,
    trim: true,
  },

  location: {
    type: String,
    required: true,
  },

  area: {
    type: Number,
    required: true,
  },

  areaUnit: {
    type: String,
    required: true,
  },

  soilType: {
    type: String,
  },

  irrigationType: {
    type: String,
  },

  latitude: {
    type: Number,
  },

  longitude: {
    type: Number,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Farm", farmSchema);
