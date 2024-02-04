const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, User, Course } = require("../db/index.js");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  try {
    const username = req.body.username;
    const password = req.body.password;
    const existingAdmin = await Admin.findOne({
      username: username,
      password: password,
    });
    if (existingAdmin) {
      throw new Error("Admin is alredy exist.");
    }
    await Admin.create({
      username: username,
      password: password,
    });
    res.status(200).json({
      message: "Admin created successfully",
    });
  } catch (err) {
    res.status(400).send("unable to signup admin");
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  try {
    const title = req.body.title;
    const description = req.body.description;
    const price = parseInt(req.body.price);
    const imageLink = req.body.imageLink;
    const courseId = Math.floor(Math.random() * 10000);
    await Course.create({
      id: courseId,
      title: title,
      description: description,
      price: price,
      imageLink: imageLink,
      published: true,
    });
    res.status(200).json({
      message: "Course created successfully",
      courseId: courseId,
    });
  } catch (err) {
    res.status(404).send("unable to create a new course.");
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  try {
    const courses = await Course.find({});
    res.json({ courses });
  } catch (err) {
    res.status(404).send("NO Course Available");
  }
});

module.exports = router;
