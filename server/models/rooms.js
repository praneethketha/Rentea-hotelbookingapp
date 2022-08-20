const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the title of the room"],
  },

  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: [true, "Please provide hotel Id"],
  },

  price: {
    type: Number,
    required: [true, "Please provide price of the room per day"],
  },

  maxPeople: {
    type: Number,
    required: [true, "Please provide maximum people"],
  },

  desc: {
    type: String,
  },
  roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
