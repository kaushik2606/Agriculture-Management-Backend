const express = require("express");
const {
  addFertilizer,
  getFertilizer,
  getFertilizerBtId,
  updateFertilizerBtId,
  deleteFertilizerBtId,
} = require("../controllers/fertilizerController");

const router = express.Router();

router.post("/", addFertilizer);
router.get("/", getFertilizer);
router.get("/:id", getFertilizerBtId);
router.put("/:id", updateFertilizerBtId);
router.delete("/:id",deleteFertilizerBtId)

module.exports = router;
