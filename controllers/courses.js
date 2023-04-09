const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Course = require("../models/course");
const Bootcamp = require("../models/bootcamp");

//@desc     Get courses
//@routes   GET /api/v1/courses
//@routes   GET /api/v1/bootcamps/:bootcampId/courses
//@access    Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId }).populate(
      "bootcamp"
    );
  } else {
    query = Course.find().populate("bootcamp");
  }
  const courses = await query;
  res
    .status(200)
    .json({ success: true, length: courses.length, data: courses });
});

//@desc     Get one course
//routes    GET /api/v1/course/:id
//@access   Public
exports.getCourse = async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  res.status(200).json({
    success: true,
    data: course,
    msg: `Show one course ${req.params.id}`,
  });
};

//@desc     Create new course
//@routes   POST /api/v1/courses
//@access   Public
exports.createCourse = async (req, res, next) => {
  console.log("hello world");
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with the id of ${req.params.id}`, 404)
    );
  }
  console.log(typeof req.body, req.body);
  const data = await Course.create(req.body);
  res.status(200).json({ success: true, msg: "Create new course", data: data });
};

//@desc     Update course
//@routes   PUT /api/v1/course/:id
//@access   Public
exports.updateCourse = async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    next(new ErrorResponse(`No course with the id of ${req.params.id}`));
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res
    .status(200)
    .json({ success: true, msg: `Update course ${req.params.id}` });
};

//@desc     Delete course
//@routes   DELETE /api/v1/course/:id
//@access   Public
exports.deleteCourse = async (req, res, next) => {
  console.log("hello", req.params.id);
  const data = await Course.findByIdAndRemove(req.params.id);
  res
    .status(200)
    .json({ success: true, data: data, msg: `Delete course ${req.params.id}` });
};
