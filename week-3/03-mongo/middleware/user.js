const { User } = require("../db/index.js");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  try {
    const username = req.headers.username;
    const password = req.headers.password;

    const existingUser = await User.findOne({
      username: username,
      password: password,
    });

    if (!existingUser) {
      throw err;
    }
    next();
  } catch (err) {
    res.status(400).send("Sorry, But user not exist!");
  }
}

module.exports = userMiddleware;
