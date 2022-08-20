const City = require("../models/city");
const catchAsync = require("../utils/catchAsync");

exports.getCities = catchAsync(async (req, res, next) => {
  const cities = await City.find().sort("name");
  res.status(200).json({
    status: "success",
    result: cities.length,
    data: cities,
  });
});

exports.createCity = catchAsync(async (req, res, next) => {
  const city = await City.create(req.body);

  res.status(201).json({
    status: "success",
    data: city,
  });
});
