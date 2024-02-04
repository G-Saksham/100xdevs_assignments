const { Router } = require("express");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
const jwtPassword = "secretKey";

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  try {
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
      username: username,
      password: password,
    });

    res.status(200).json({
      message: "Admin created successfully",
    });
  } catch (e) {
    res.status(400).send("Unable to create a new Admin.");
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  try {
    const username = req.body.username;
    const password = req.body.password;
    const token = jwt.sign({ username: username }, jwtPassword);
    res.setHeader("authorization", `Bearer ${token}`);
    res.status(200).json({ token });
  } catch {
    res.status(400).send("Somethings wrong");
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  try {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const course = await Course.create({
      title: title,
      description: description,
      price: price,
      imageLink: imageLink,
      published: true,
    });
    res.status(200).json({
      message: "Course created successfully",
      courseId: `${course._id}`,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Course not created",
    });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  try {
    const courses = await Course.find({});
    res.status(200).json({ courses });
  } catch (err) {
    res.status(400).json({
      msg: "Somethings Wrong!",
    });
  }
});

module.exports = router;
