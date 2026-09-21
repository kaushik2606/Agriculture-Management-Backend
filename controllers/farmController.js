const express = require("express");
const Farmer = require("../models/farmer");
const Farm = require("../models/farm");

// Add New Farm
const addFarm = async (req, res) => {
  try {
    const {
      farmerId,
      farmName,
      location,
      area,
      areaUnit,
      soilType,
      irrigationType,
      latitude,
      longitude,
    } = req.body || {};

    if (
      !farmerId ||
      !farmName ||
      !location ||
      area === undefined ||
      !areaUnit
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const farmer = await Farmer.findOne({ id: farmerId });

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer with this id does not exist",
      });
    }

    const farm = await Farm.create({
      farmerId: farmer._id,
      farmName,
      location,
      area,
      areaUnit,
      soilType,
      irrigationType,
      latitude,
      longitude,
    });

    res.status(201).json({
      success: true,
      message: "Farm added successfully",
      data: {
        _id,
        farmerId: farm.farmerId,
        farmName: farm.farmName,
        location: farm.location,
        area: farm.area,
        areaUnit: farm.areaUnit,
        soilType: farm.soilType,
        irrigationType: farm.irrigationType,
        latitude: farm.latitude,
        longitude: farm.longitude,
        createdAt: farm.createdAt,
        updatedAt: farm.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Farms
const getFarm = async (req, res) => {
  try {
    const farm = await Farm.find({}).populate({
      path: "farmerId",
      select: "-password",
      model: "Farmer",
    });

    if (!farm.length) {
      return res.status(404).json({
        success: false,
        message: "Farms not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Farms fetched successfully",
      data: farm,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Farm By Id
const getFarmById = async (req, res) => {
  try {
    const { farmId } = req.params;

    const farm = await Farm.findById(farmId).populate({
      path: "farmerId",
      select: "-password",
      model: "Farmer",
    });

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm with this id does not exist",
      });
    }

    res.status(200).json({
      success: true,
      message: "Farm fetched successfully",
      data: farm,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Farm By Id
const updateFarm = async (req, res) => {
  try {
    const { farmId } = req.params;

    const {
      farmName,
      location,
      area,
      areaUnit,
      soilType,
      irrigationType,
      latitude,
      longitude,
    } = req.body;

    const farm = await Farm.findByIdAndUpdate(
      farmId,
      {
        farmName,
        location,
        area,
        areaUnit,
        soilType,
        irrigationType,
        latitude,
        longitude,
      },
      { new: true },
    );

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm with this id does not exist",
      });
    }

    res.status(200).json({
      success: true,
      message: "Farm updated successfully",
      data: farm,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Farm By Id
const deleteFarm = async (req, res) => {
  try {
    const { farmId } = req.params;

    const farm = await Farm.findByIdAndDelete(farmId);

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm with this id does not exist",
      });
    }

    res.status(200).json({
      success: true,
      message: "Farm deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addFarm,
  getFarm,
  getFarmById,
  updateFarm,
  deleteFarm,
};
