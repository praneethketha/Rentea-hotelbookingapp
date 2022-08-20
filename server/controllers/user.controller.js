const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //1) Create error if user enters password
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword"
      )
    );
  }
  //2) Filter out unWanted Fields
  const filteredBody = filterObj(
    req.body,
    "email",
    "name",
    "address",
    "contact_number",
    "photo",
    "verified",
    "active"
  );

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  }).populate("bookings");

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getAllUsers = catchAsync(async (req, res) => {
  // pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;

  const users = await User.find().skip(skip).limit(limit).populate("bookings");

  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const user = await User.create({ ...req.body, verified: true });

  console.log(user);
  res.status(201).json({
    status: "success",
    data: user,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("bookings");
  if (!user) {
    return next(new AppError("no user found with that ID.", 404));
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  // 1) Filter out unWanted Fields
  const filteredBody = filterObj(
    req.body,
    "email",
    "name",
    "address",
    "contact_number",
    "photo",
    "verified",
    "active"
  );

  // 2) Update user document
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  ).populate("bookings");

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError("no campaign found with that ID.", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
