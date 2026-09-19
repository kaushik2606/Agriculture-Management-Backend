const express = require("express");
const {
  getFarmer,
  sendOtp,
  verifyOtp,
  registerFarmer,
  loginFarmer,
} = require("../controllers/farmerController");

const router = express.Router();

router.post("/register", registerFarmer);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginFarmer);
router.get("/", getFarmer);

module.exports = router;
