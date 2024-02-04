const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index.js");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  try {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({
      username: username,
      password: password,
    });
    if (existingUser) {
      const err = new Error("User already exist.");
      throw err;
    }
    let user = new User({
      username: username,
      password: password,
    });
    user.save();
    res.status(200).json({
      message: "User created successfully",
    });
  } catch (err) {
    res.status(400).send("Unable to signup the new user!");
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  try {
    const courses = await Course.find();
    res.status(200).json({ courses });
  } catch (err) {
    res.status(404).send("Somethings wrong!");
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  try {
    let user = await User.findOne({
      username: req.headers.username,
      password: req.headers.password,
    }).exec();
    const courseId = parseInt(req.params.courseId);
    if (!!!(await Course.findOne({ id: courseId }))) {
      throw err;
    }
    if (user.purchasedCoursesId == undefined || null) {
      user.purchasedCoursesId = [];
    }
    user.purchasedCoursesId.forEach((id) => {
      if (id == courseId) {
        throw new Error("Already bought the course");
      }
    });
    user.purchasedCoursesId.push(courseId);
    await user.save();
    res.status(200).json({ message: "Course purchased successfully" });
  } catch (error) {
    res.status(400).send(`Somethings wrong. Error: ${error.message}`);
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  try {
    let user = await User.findOne({
      username: req.headers.username,
      password: req.headers.password,
    }).exec();
    let purchasedCourses = [];

    // Tip: foreach can't await/ use map instead
    const promises = user.purchasedCoursesId.map(async (courseId) => {
      const course = await Course.findOne({ id: courseId }).exec();
      purchasedCourses.push(course);
    });
    // should await to complete all promises
    await Promise.all(promises);
    res.status(200).json({ purchasedCourses });
  } catch (e) {
    res.status(404).send("Somethings Wrong");
  }
});

module.exports = router;
