//@desc     Get all Users
//@routes   GET /api/v1/Users
//@access   Public
exports.getUsers = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all Users" });
};

//@desc     Get one User
//routes    GET /api/v1/User/:id
//@access   Public
exports.getUser = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Show one User ${req.params.id}` });
};

//@desc     Create new User
//@routes   POST /api/v1/Users
//@access   Public
exports.createUser = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Create new User" });
};

//@desc     Update User
//@routes   PUT /api/v1/User/:id
//@access   Public
exports.updateUser = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update User ${req.params.id}` });
};

//@desc     Delete User
//@routes   DELETE /api/v1/User/:id
//@access   Public
exports.deleteUser = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete User ${req.params.id}` });
};
