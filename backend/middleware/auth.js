const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Middleware to protect routes, requiring a valid JWT token
exports.protect = async (req, res, next) => {
  let token;

  // Check if the token is in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extract the token (format: "Bearer <token>")
    token = req.headers.authorization.split(" ")[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Not authorized, no token",
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user based on the userId in the decoded token
    const user = await User.findById(decoded.userId).select("-password"); // Exclude password from the fetched user

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Not authorized, user not found",
      });
    }

    // Attach the authenticated user to the request object
    req.user = user;

    // Call the next middleware function
    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Not authorized, invalid token",
      error: error.message,
    });
  }
};

// Middleware to restrict access to certain roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: `User role ${req.user.role} is not authorized to access this resource`,
      });
    }
    next();
  };
};
