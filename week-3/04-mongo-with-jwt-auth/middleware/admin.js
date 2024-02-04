const jwt = require("jsonwebtoken");
const jwtPassword = "secretKey";

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  try {
    const [, token] = req.headers.authorization.split(" ");
    const verified = jwt.verify(token, jwtPassword);
    if (!verified) {
      throw error;
    }
    next();
  } catch (error) {
    res.status(400).json({
      msg: "Admin not exist!",
    });
  }
}

module.exports = adminMiddleware;
