const fertilizer = require("../models/fertilizer");

const addFertilizer = async (req, res) => {
  try {
    const { name, brand, type, description, price, stock, cropTypes, usage } =
      req.body || {};

    if (
      !name ||
      !brand ||
      !type ||
      price === undefined ||
      stock === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const ferti = await fertilizer.create({
      name,
      brand,
      type,
      description,
      price,
      stock,
      cropTypes,
      usage,
    });

    res.status(200).json({
      success: true,
      message: "Fertilizer Added Successfully!",
      data: {
        _id: ferti._id,
        name: ferti.name,
        brand: ferti.brand,
        type: ferti.type,
        description: ferti.description,
        price: ferti.price,
        stock: ferti.stock,
        cropTypes: ferti.cropTypes,
        usage: ferti.usage,
        createdAt: ferti.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFertilizer = async (req, res) => {
  try {
    const ferti = await fertilizer.find({});

    if (ferti.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Fertilizers not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All Fertilizers fetched Successfully!",
      data: ferti,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFertilizerBtId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Fertilizer ID is required",
      });
    }

    const ferti = await fertilizer.findById(id);

    if (!ferti) {
      return res.status(404).json({
        success: false,
        message: "Fertilizer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fertilizer fetched Successfully!",
      data: ferti,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateFertilizerBtId = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, type, description, price, stock, cropTypes, usage } =
      req.body || {};

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Fertilizer ID is required",
      });
    }

    const ferti = await fertilizer.findByIdAndUpdate(
      id,
      {
        name,
        brand,
        type,
        description,
        price,
        stock,
        cropTypes,
        usage,
      },
      { new: true },
    );

    if (!ferti) {
      return res.status(404).json({
        success: false,
        message: "Fertilizer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fertilizer Updated Successfully!",
      data: ferti,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteFertilizerBtId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Fertilizer ID is required",
      });
    }

    const ferti = await fertilizer.findByIdAndDelete(id);

    if (!ferti) {
      return res.status(404).json({
        success: false,
        message: "Fertilizer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fertilizer Deleted Successfully!",
      data: ferti,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addFertilizer,
  getFertilizer,
  getFertilizerBtId,
  updateFertilizerBtId,
  deleteFertilizerBtId
};
