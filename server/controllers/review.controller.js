const Review = require("../models/review");
const catchAsync = require("../utils/catchAsync");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({});

  res.status(200).json({
    status: "success",
    data: reviews,
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: review,
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id || req.body.user;
  const review = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: review,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    status: "success",
    data: review,
  });
});
