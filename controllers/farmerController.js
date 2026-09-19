const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Farmer = require("../models/farmer");
const crypto = require("crypto");
const { sendMail } = require("../mail/emailSend");

const registerFarmer = async (req, res) => {
  try {
    const { id, name, email, password, role, profileImage, address, isActive } =
      req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const existingFarmer = await Farmer.findOne({ email });

    if (existingFarmer) {
      return res.status(400).json({
        success: false,
        message: "Farmer with this email already exists",
      });
    }

    const farmer = await Farmer.create({
      id,
      name,
      email,
      password: hashpassword,
      role,
      profileImage,
      address,
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "Farmer registered successfully",
      data: {
        id: farmer.id,
        name: farmer.name,
        email: farmer.email,
        role: farmer.role,
        profileImage: farmer.profileImage,
        address: farmer.address,
        isActive: farmer.isActive,
        createdAt: farmer.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body || {};

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const farmer = await Farmer.findOne({ email: email.toLowerCase().trim() });

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer not found",
      });
    }

    const otp = crypto.randomInt(100000, 1000000).toString();
    farmer.otp = otp;
    farmer.otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await farmer.save();

    await sendMail({
      email: farmer.email,
      subject: "Agriculture Management - OTP Verification",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; text-align: center;">
      <h2 style="color: #2e7d32;">🌱 Agriculture Management</h2>

      <p style="font-size: 16px; color: #555;">
        Your OTP for verification is:
      </p>

      <div style="
        font-size: 42px;
        font-weight: bold;
        letter-spacing: 10px;
        color: #2e7d32;
        background: #e8f5e9;
        padding: 20px;
        margin: 25px 0;
        border-radius: 10px;
      ">
        ${otp}
      </div>

      <p style="font-size: 14px; color: #777;">
        This OTP expires in <strong>10 minutes</strong>.
      </p>

      <p style="font-size: 13px; color: #999;">
        Agriculture Management
      </p>
    </div>
  `,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body || {};

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const farmer = await Farmer.findOne({ email: email.toLowerCase().trim() });

    if (
      !farmer ||
      farmer.otp !== otp ||
      !farmer.otpExpires ||
      farmer.otpExpires < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    farmer.otp = undefined;
    farmer.otpExpires = undefined;
    await farmer.save();

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginFarmer = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const farmer = await Farmer.findOne({ email });

    if (!farmer) {
      return res
        .status(404)
        .json({ success: false, message: "Farmer not found" });
    }

    const match = await bcrypt.compare(password, farmer.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const payload = { id: farmer.id, email: farmer.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "Farmer login successful",
      data: {
        id: farmer.id,
        name: farmer.name,
        email: farmer.email,
        role: farmer.role,
        profileImage: farmer.profileImage,
        address: farmer.address,
        isActive: farmer.isActive,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFarmer = async (req, res) => {
  try {
    const farmer = await Farmer.find();

    if (!farmer.length) {
      return res.status(404).json({
        success: false,
        message: "Farmers not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Farmers Fatch Successfully.",
      data: farmer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerFarmer,
  sendOtp,
  verifyOtp,
  loginFarmer,
  getFarmer,
};
