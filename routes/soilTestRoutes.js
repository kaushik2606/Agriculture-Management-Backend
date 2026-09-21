const express = require("express");
const {
  addSoilType,
  getSoilTestByFarmer,
  getSoilTestById,
} = require("../controllers/soilTypeController");

const router = express.Router();

router.post("/", addSoilType);
router.get("/farmerId/:farmerId", getSoilTestByFarmer);
router.get("/:id", getSoilTestById);

module.exports = router;
