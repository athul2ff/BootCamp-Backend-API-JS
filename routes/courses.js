const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getCourse,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

const Course = require("../models/course");
const advancedResults = require("../middleware/advancedResults");

router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(createCourse);

router.route("/:bootcampId");

router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
