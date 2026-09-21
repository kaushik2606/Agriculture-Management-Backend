const express = require("express");
const {
  addCrops,
  getCrops,
  getCropId,
  updateCrops,
  deleteCrop,
} = require("../controllers/cropsController");

const { farmerAccess } = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/", farmerAccess, addCrops);
router.get("/", farmerAccess, getCrops);
router.get("/:cropId", farmerAccess, getCropId);
router.put("/:cropId", farmerAccess, updateCrops);
router.delete("/:cropId", farmerAccess, deleteCrop);

module.exports = router;
