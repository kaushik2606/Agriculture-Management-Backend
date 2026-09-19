const express = require("express");
const {
  addCrops,
  getCrops,
  getCropId,
  updateCrops,
  deleteCrop,
} = require("../controllers/cropsController");

const router = express.Router();

router.post("/", addCrops);
router.get("/", getCrops);
router.get("/:cropId", getCropId);
router.put("/:cropId", updateCrops);
router.delete("/:cropId", deleteCrop);

module.exports = router;
