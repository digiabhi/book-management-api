const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { ServerConfig, Logger } = require("../../config");

// Function to check the password
function checkPassword(plainPassword, encryptedPassword) {
  try {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
  } catch (error) {
    Logger.error(error);
    throw error;
  }
}

// Function to create a token
function createToken(input) {
  try {
    return jwt.sign(input, ServerConfig.JWT_SECRET, {
      expiresIn: ServerConfig.JWT_EXPIRY,
    });
  } catch (error) {
    Logger.error(error);
    throw error;
  }
}

// Function to verify the token
function verifyToken(token) {
  try {
    return jwt.verify(token, ServerConfig.JWT_SECRET);
  } catch (error) {
    Logger.error(error);
    throw error;
  }
}

module.exports = {
  checkPassword,
  createToken,
  verifyToken,
};
