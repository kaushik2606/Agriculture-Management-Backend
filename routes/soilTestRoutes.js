const express = require("express");
const {
  addSoilType,
  getSoilTest,
} = require("../controllers/soilTypeController");

const router = express.Router();

router.post("/", addSoilType);
router.get("/", getSoilTest);

module.exports = router;
