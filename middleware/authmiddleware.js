const jwt = require("jsonwebtoken");

const farmerAccess = (req, res, next) => {
  // 1. Get the token from the header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // 2. If no token, block access immediately
    return res.status(401).json({
      message: "Access denied. Please log in.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 3. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request
    next(); // Pass control to the next function
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

module.exports = { farmerAccess };
