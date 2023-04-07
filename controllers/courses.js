//@desc     Get all courses
//@routes   GET /api/v1/courses
//@access    Public
exports.getCourses = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all courses" });
};

//@desc     Get one course
//routes    GET /api/v1/course/:id
//@access   Public
exports.getCourse = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Show one course ${req.params.id}` });
};

//@desc     Create new course
//@routes   POST /api/v1/courses
//@access   Public
exports.createCourse = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Create new course" });
};

//@desc     Update course
//@routes   PUT /api/v1/course/:id
//@access   Public
exports.updateCourse = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update course ${req.params.id}` });
};

//@desc     Delete course
//@routes   DELETE /api/v1/course/:id
//@access   Public
exports.deleteCourse = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete course ${req.params.id}` });
};
