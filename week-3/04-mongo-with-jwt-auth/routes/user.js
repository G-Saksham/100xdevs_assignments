const jwt = require("jsonwebtoken");
const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwtPassword = "secretKey";

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  try {
    const username = req.body.username;
    const password = req.body.password;
    await User.create({
      username: username,
      password: password,
    });
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({
      msg: "User not signedup",
    });
  }
});

router.post("/signin", (req, res) => {
  // Implement admin signup logic
  try {
    const username = req.body.username;
    // const password = req.body.password;
    const token = jwt.sign({ username: username }, jwtPassword);
    res.setHeader("authorization", `Bearer ${token}`);
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({
      msg: "User not signedIn",
    });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});
  res.status(200).json({ courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  try {
    const [, token] = req.headers.authorization.split(" ");
    let decodedUser = jwt.decode(token);
    let user = await User.findOne({ username: decodedUser.username }).exec();
    const courseId = req.params.courseId;
    // if (!!!(await Course.findOne({ _id: ObjectId(courseId) }))) {
    //   throw err;
    // }
    if (user.purchasedCourseIds == undefined || null) {
      user.purchasedCourseIds = [];
    }
    user.purchasedCourseIds.push(courseId);
    await user.save();
    res.status(200).json({
      message: "Course purchased successfully",
    });
  } catch (err) {
    res.status(400).json({
      msg: `Somethings Wrong! or Error: ${err}`,
    });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  try {
    const [, token] = req.headers.authorization.split(" ");
    let decodedUser = jwt.decode(token);
    let user = await User.findOne({ username: decodedUser.username }).exec();
    let purchasedCourses = [];
    const promises = user.purchasedCourseIds.map(async (courseId) => {
      const course = await Course.findOne({ _id: courseId }).exec();
      purchasedCourses.push(course);
    });
    await Promise.all(promises);
    res.status(200).json({ purchasedCourses });
  } catch (err) {
    res.status(400).json({
      msg: "Somethings Wrong, Causing error",
    });
  }
});

module.exports = router;
