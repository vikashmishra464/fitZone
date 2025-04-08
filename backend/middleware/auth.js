const jwt = require("jsonwebtoken");
require("dotenv").config();
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(401).send("No token found");

  const token = authHeader.split(' ')[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  } catch (err) {
    res.status(403).send("Invalid token");
  }
}

module.exports = verifyToken;
