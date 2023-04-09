const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getCourse,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

router.route("/").get(getCourses).post(createCourse);

router.route("/:bootcampId");

router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
