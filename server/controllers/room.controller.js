const Hotel = require("../models/hotel");
const Room = require("../models/rooms");
const catchAsync = require("./../utils/catchAsync");

exports.createRoom = catchAsync(async (req, res, next) => {
  const savedRoom = await Room.create(req.body);

  res.status(201).json({
    status: "success",
    data: savedRoom,
  });
});

exports.updateRoom = catchAsync(async (req, res, next) => {
  const updatedRoom = await Room.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedRoom) {
    return next(new AppError("No Room with that ID", 404));
  }

  res.status(200).json({ status: "success", data: updatedRoom });
});

exports.updateRoomAvailability = catchAsync(async (req, res, next) => {
  await Room.updateOne(
    { "roomNumbers._id": req.params.id },
    {
      $push: {
        "roomNumbers.$.unavailableDates": req.body.dates,
      },
    }
  );

  next();
});

exports.deleteRoom = catchAsync(async (req, res) => {
  const room = await Room.findByIdAndDelete(req.params.id);

  if (!room) {
    return next(new AppError("No Room with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getRoom = catchAsync(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return next(new AppError("No Room with that ID", 404));
  }

  res.status(200).json({
    staus: "success",
    data: room,
  });
});

exports.getAllRooms = catchAsync(async (req, res) => {
  const rooms = await Room.find();

  res.status(200).json({
    status: "success",
    data: rooms,
  });
});
