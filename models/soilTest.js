const { default: mongoose } = require("mongoose");

const soilTestSchema = new mongoose.Schema({
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
  nitrogen: {
    type: Number,
    required: true,
    min: 0,
  },
  phosphorus: {
    type: Number,
    required: true,
    min: 0,
  },
  potassium: {
    type: Number,
    required: true,
    min: 0,
  },
  ph: {
    type: Number,
    required: true,
    min: 0,
    max: 14,
  },
  moisture: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  soilType: {
    type: String,
    required: true,
    trim: true,
    enum: ["Sandy", "Clay", "Silty", "Peaty", "Chalky", "Loamy"],
  },
  testDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  recommendation: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("SoilTest", soilTestSchema);
