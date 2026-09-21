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
      !farmerId ||
      !farmId ||
      !nitrogen ||
      !phosphorus ||
      !potassium ||
      !ph ||
      !moisture ||
      !soilType ||
      !testDate ||
      !recommendation
    ) {
      return res.status(400).json({
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSoilTestByFarmer = async (req, res) => {
  try {
    const { farmerId } = req.params;

    if (!farmerId) {
      return res.status(400).json({
        success: false,
        message: "Soil farmer id is required",
      });
    }

    const soilTests = await soilTest.find({ farmerId }).populate([
      { path: "farmerId", model: "Farmer", select: "-password" },
      { path: "farmId", model: "Farm", select: "-password" },
    ]);

    if (!soilTests || soilTests.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Soil Tests not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Soil Tests fetched successfully",
      data: soilTests,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSoilTestById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Soil test id is required",
      });
    }

    const soilRecord = await soilTest.findById(id).populate([
      { path: "farmerId", model: "Farmer", select: "-password" },
      { path: "farmId", model: "Farm", select: "-password" },
    ]);

    if (!soilRecord) {
      return res.status(404).json({
        success: false,
        message: "Soil Test not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Soil Test fetched successfully",
      data: soilRecord,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addSoilType,
  getSoilTestByFarmer,
  getSoilTestById,
};
