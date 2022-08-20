const Hotel = require("../models/hotel");
const Booking = require("./../models/booking");

const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllHotel = catchAsync(async (req, res, next) => {
  // copying the query params to a variable
  const searchTerm = req.query.key || "";
  const queryObj = { ...req.query };

  // excluding the features to handle filtering
  const exclude_fields = ["page", "limit", "key"];
  exclude_fields.forEach((el) => delete queryObj[el]);

  // creating a query string
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  // filtering
  let query = Hotel.find(JSON.parse(queryStr));

  // pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  // searching
  query = query.find({
    $or: [
      {
        name: { $regex: searchTerm, $options: "$i" },
      },
      {
        city: { $regex: searchTerm, $options: "$i" },
      },
    ],
  });

  const hotels = await query
    .sort("basePrice")
    .populate("reviews")
    .populate("rooms");

  res.status(200).json({
    status: "success",
    results: hotels.length,
    data: hotels,
  });
});

exports.createHotel = catchAsync(async (req, res, next) => {
  const newHotel = new Hotel({ ...req.body });

  const hotel = await newHotel.save();

  res.status(201).json({
    status: "success",
    data: hotel,
  });
});

exports.getHotel = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id)
    .populate("reviews")
    .populate("rooms");

  if (!hotel) {
    return next(new AppError("no hotel found with that ID.", 404));
  }

  res.status(200).json({
    status: "success",
    data: hotel,
  });
});

exports.updateHotel = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!hotel) {
    return next(new AppError("no hotel found with that ID.", 404));
    // appError("jbjbg",4040)
    // next call refers to the next error handle middleware (global error handling middleware)
    // An error object (status, isOperational, statusCode, message)
  }

  res.status(200).json({
    status: "success",
    data: hotel,
  });
});

exports.deleteHotel = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.findByIdAndDelete(req.params.id);

  if (!hotel) {
    return next(new AppError("no hotel found with that ID.", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getPriceRange = catchAsync(async (req, res, next) => {
  const hotels = await Hotel.find().sort("basePrice");

  res.status(200).json({
    status: "success",
    data: {
      low: hotels[0].basePrice,
      high: hotels[hotels.length - 1].basePrice,
    },
  });
});

exports.getByCities = catchAsync(async (req, res, next) => {
  const stats = await Hotel.aggregate([
    {
      $match: {},
    },
    {
      $group: {
        _id: { $toLower: "$city" },
        numHotels: { $sum: 1 },
        avgPrice: { $avg: "$basePrice" },
        lowPrice: { $min: "$basePrice" },
        highPrice: { $max: "$basePrice" },
      },
    },
  ]).sort("_id");

  res.status(200).json({
    status: "success",
    data: stats,
  });
});

exports.bookRoom = catchAsync(async (req, res, next) => {
  // ASSIGNING BODY.USERID WITH THE USER_ID SPECIFIED IN REQUEST OBJECT
  req.body.user = req.user._id;
  req.body.from = req.body.dates[0];
  req.body.to = req.body.dates[req.body.dates.length - 1];

  // CREATING BOOKING DOCUMENT
  const booking = await Booking.create(req.body);

  // SENDING THE RESPONSE
  res.status(200).json({
    success: "success",
    data: {
      booking,
    },
  });
});
