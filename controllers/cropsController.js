const Crops = require("../models/crops");

const addCrops = async (req, res) => {
  try {
    const {
      farmerId,
      farmId,
      cropName,
      cropType,
      variety,
      sowingDate,
      expectedHarvestDate,
      actualHarvestDate,
      area,
      status,
      expectedProduction,
      actualProduction,
      notes,
    } = req.body || {};

    if (
      !farmerId ||
      !farmId ||
      !cropName ||
      !cropType ||
      !sowingDate ||
      !expectedHarvestDate ||
      !area ||
      !status
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // const farmer = await Farmer.findOne({ id: farmerId });

    // if (!farmer) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Farmer with this id does not exist",
    //   });
    // }

    // const farm = await Farm.findOne({ id: farmId });

    // if (!farm) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Farm with this id does not exist",
    //   });
    // }

    const crops = await Crops.create({
      farmerId,
      farmId,
      cropName,
      cropType,
      variety,
      sowingDate,
      expectedHarvestDate,
      actualHarvestDate,
      area,
      status,
      expectedProduction,
      actualProduction,
      notes,
    });

    res.status(200).json({
      success: true,
      message: "Crops Added Successfully !",
      data: {
        farmerId,
        farmId,
        cropName,
        cropType,
        variety,
        sowingDate,
        expectedHarvestDate,
        area,
        status,
        expectedProduction,
        notes,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCrops = async (req, res) => {
  try {
    const crops = await Crops.find({}).populate([
      { path: "farmerId", model: "Farmer", select: "-password" },
      { path: "farmId", model: "Farm", select: "-password" },
    ]);

    if (!crops.length) {
      return res.status(404).json({
        success: false,
        message: "Crops not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Crops fetched successfully",
      data: crops,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCropId = async (req, res) => {
  try {
    const { cropId } = req.params;

    const crop = await Crops.findById(cropId).populate([
      {
        path: "farmerId",
        select: "-password",
        model: "Farmer",
      },
      {
        path: "farmId",
        select: "-password",
        model: "Farm",
      },
    ]);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Farm with this id does not exist",
      });
    }

    res.status(200).json({
      success: true,
      message: "Crop fetched successfully",
      data: crop,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCrops = async (req, res) => {
  try {
    const { cropId } = req.params;
    const {
      farmerId,
      farmId,
      cropName,
      cropType,
      variety,
      sowingDate,
      expectedHarvestDate,
      actualHarvestDate,
      area,
      status,
      expectedProduction,
      actualProduction,
      notes,
    } = req.body || {};

    const crop = await Crops.findByIdAndUpdate(
      cropId,
      {
        farmerId,
        farmId,
        cropName,
        cropType,
        variety,
        sowingDate,
        expectedHarvestDate,
        actualHarvestDate,
        area,
        status,
        expectedProduction,
        actualProduction,
        notes,
      },
      { new: true, runValidators: true },
    );

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop with this id does not exist",
      });
    }

    res.status(200).json({
      success: true,
      message: "Crop updated successfully",
      data: crop,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCrop = async (req, res) => {
  try {
    const { cropId } = req.params;

    const crop = await Crops.findByIdAndDelete(cropId);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop with this id does not exist",
      });
    }

    res.status(200).json({
      success: true,
      message: "Crop Deleted successfully",
      data: crop,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addCrops,
  getCrops,
  getCropId,
  updateCrops,
  deleteCrop,
};
