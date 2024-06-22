const jwt = require("jsonwebtoken");
const config = require("../config/config");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.headers.Authorization;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token.split(" ")[1], config.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    req.user = decoded;
    next();
  });

};

module.exports = verifyToken;
