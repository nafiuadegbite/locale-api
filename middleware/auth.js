const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const User = require("../models/users/users.mongo");
const redisClient = require("../services/redis");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    // Set token from cookie
    token = req.cookies.token;
  }
  // Make sure token exists
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

const authenticateUser = async (req, res, next) => {
  // Check if the API key is provided in the request headers
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    return res.status(401).json({ error: "API key is required." });
  }

  // Implement your authentication and authorization logic using the provided API key
  try {
    req.user = await User.find({ apiKey });
    // If authentication is successful, proceed to the next middleware
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

const getSignedJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Set up rate limiting
const limiter = rateLimit({
  store: new RedisStore({
    sendCommand(...args) {
      return redisClient.call(...args);
    },
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each API key to 100 requests per windowMs
  keyGenerator: (req) => {
    // Use the provided API key as the unique identifier for rate limiting
    return req.headers["x-api-key"];
  },
});

const sendTokenResponse = (id, statusCode, res, apiKey) => {
  const token = getSignedJwtToken(id);

  // token expires in 1hour
  const options = {
    expires: new Date(Date.now() + 3600 * 1000),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: "true", token, apiKey });
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

const isValidPassword = async (enteredPassword, comparePassword) => {
  return await bcrypt.compare(enteredPassword, comparePassword);
};

module.exports = {
  protect,
  sendTokenResponse,
  getSignedJwtToken,
  hashPassword,
  isValidPassword,
  authenticateUser,
  limiter,
};
