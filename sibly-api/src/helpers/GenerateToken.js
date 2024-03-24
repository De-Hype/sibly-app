const jwt = require("jsonwebtoken");
require("dotenv").config();

const GenerateToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_KEY, { expiresIn: "1d" });
  return token;
};
 
module.exports = GenerateToken;
