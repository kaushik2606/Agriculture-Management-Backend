const mongoose = require("mongoose");

const cropsSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farmer",
    required: true,
  },

  farmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farm",
    required: true,
  },

  cropName: {
    type: String,
    required: true,
    trim: true,
  },

  cropType: {
    type: String,
    enum: ["Cereal", "Legume", "Vegetable", "Fruit", "Cash Crop"],
    default: "Fruit",
    required: true,
  },

  variety: {
    type: String,
    trim: true,
  },

  sowingDate: {
    type: Date,
    required: true,
  },

  expectedHarvestDate: {
    type: Date,
    required: true,
  },

  actualHarvestDate: {
    type: Date,
  },

  area: {
    type: Number,
    required: true,
    min: [0, "Area cannot be negative"],
  },

  status: {
    type: String,
    enum: ["Planned", "Sown", "Growing", "Harvested", "Failed"],
    default: "Planned",
    required: true,
  },

  expectedProduction: {
    type: Number,
    min: [0, "Expected production cannot be negative"],
  },

  actualProduction: {
    type: Number,
    min: [0, "Actual production cannot be negative"],
  },

  notes: {
    type: String,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Crops", cropsSchema);
