const jwt = require("jsonwebtoken");
const jwtPassword = "secretKey";

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  try {
    const [, token] = req.headers.authorization.split(" ");
    if (!!!jwt.sign(token, jwtPassword)) {
      throw err;
    }
    next();
  } catch (err) {
    res.status(400).json({ msg: "user not exist" });
  }
}

module.exports = userMiddleware;
