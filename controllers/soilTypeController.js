const soilTest = require("../models/soilTest");

const addSoilType = async (req, res) => {
  try {
    const {
      farmerId,
      farmId,
      nitrogen,
      phosphorus,
      potassium,
      ph,
      moisture,
      soilType,
      testDate,
      recommendation,
    } = req.body || {};

    if (
      (!farmerId,
      !farmId,
      !nitrogen,
      !phosphorus,
      !potassium,
      !ph,
      !moisture,
      !soilType,
      !testDate,
      !recommendation)
    ) {
      return res.status(404).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const soil = await soilTest.create({
      farmerId,
      farmId,
      nitrogen,
      phosphorus,
      potassium,
      ph,
      moisture,
      soilType,
      testDate,
      recommendation,
    });

    res.status(200).json({
      success: true,
      message: "Soil Test Added Succefully!",
      data: {
        _id: soil._id,
        farmerId: soil.farmerId,
        farmId: soil.farmId,
        nitrogen: soil.nitrogen,
        phosphorus: soil.phosphorus,
        potassium: soil.potassium,
        ph: soil.ph,
        moisture: soil.moisture,
        soilType: soil.soilType,
        testDate: soil.testDate,
        recommendation: soil.recommendation,
      },
    });
  } catch (error) {}
};

const getSoilTest = async (req, res) => {
  try {
    const soil = await soilTest.find({}).populate([
      { path: "farmerId", model: "Farmer", select: "-password" },
      { path: "farmId", model: "Farm", select: "-password" },
    ]);

    if (!soil.length) {
      return res.status(404).json({
        success: false,
        message: "Soil Tests not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Soil Tests fetched successfully",
      data: soil,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addSoilType,
  getSoilTest
};
