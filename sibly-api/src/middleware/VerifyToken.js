const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");

function VerifyToken(req, res, next) {
  const token = req.headers.Authorization && req.headers.Authorization.split(" ")[1];
  console.log(token)
  if (!token) {
    return next(new AppError("Invalid token, Unauthorized", 401));
  }
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return next(new AppError("Incorrect or expired token, please log in", 401));
    };
    // console.log(decoded)
    req.user = decoded;
    console.log(req.user)
    next()
  }); 
}

module.exports = VerifyToken;