const mongoose = require("mongoose");
const User = require("./user");
const Hotel = require("./hotel");
const filterToSelect = require("./../utils/filterToSelect");

const bookingSchema = mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  from: {
    type: Date,
    required: [true, "Please enter the from date"],
  },
  to: {
    type: Date,
    required: [true, "Please enter the to date"],
  },
  amount: {
    type: Number,
    required: [true, "Please provide total bill"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// middlewares
// two -> query middleware, document middleware

// document middleware -> only runs on particular method perfomed on schema.
// find({})
// findAndUpdate()
// findOneAndDel

// bookings -> find({}) -> populate hotel and user -> find({}) -> results along with the population

bookingSchema.pre(/^find/, function (next) {
  // this -> document that we are accessing
  this.populate({
    path: "hotel",
    select: filterToSelect(Hotel.schema.paths, "name", "_id", "rooms"),
  }).populate({
    path: "user",
    select: filterToSelect(User.schema.paths, "name", "email", "_id"),
  });
  next();
});

const Booking = mongoose.model("Bookings", bookingSchema);

module.exports = Booking;
