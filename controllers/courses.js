const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Course = require("../models/course");
const Bootcamp = require("../models/bootcamp");

//@desc     Get courses
//@routes   GET /api/v1/courses
//@routes   GET /api/v1/bootcamps/:bootcampId/courses
//@access    Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
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
exports.addCourse = async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role === "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user._id} is not authorized to create course to this bootcamp ${bootcamp._id}`,
        401
      )
    );
  }

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
  const data = await Course.findByIdAndRemove(req.params.id);
  res
    .status(200)
    .json({ success: true, data: data, msg: `Delete course ${req.params.id}` });
};
