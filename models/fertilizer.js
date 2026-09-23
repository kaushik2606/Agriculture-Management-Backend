const { default: mongoose } = require("mongoose");

const fertilizerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  brand: {
    type: String,
    required: true,
    trim: true,
  },

  type: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  stock: {
    type: Number,
    required: true,
    min: 0,
  },

  cropTypes: {
    type: [String],
    default: [],
  },

  usage: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Fertilizer", fertilizerSchema);
