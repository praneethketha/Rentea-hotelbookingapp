const mongoose = require("mongoose");

const citySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the name of the city"],
  },
  photo: {
    type: String,
    required: [true, "please provide the photo"],
  },
});

const City = mongoose.model("City", citySchema);

module.exports = City;
