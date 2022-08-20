const mongoose = require("mongoose");

const verifySchema = mongoose.Schema({
  otp: String,
  expiresAt: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Verify = mongoose.model("Verify", verifySchema);

module.exports = Verify;
