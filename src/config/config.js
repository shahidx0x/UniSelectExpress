require("dotenv").config();

module.exports = {
  DOMAIN: process.env.DOMAIN || 'localhost:3000',
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
};
