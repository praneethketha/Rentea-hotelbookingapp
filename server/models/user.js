const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name!"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    contact_number: {
      type: Number,
      match: /^[0-9]{10}/,
      required: [true, "Please provide your contact number"],
      validate: {
        validator: function (val) {
          const reg = /\+?\d[\d -]{8,12}\d/;
          return reg.test(val);
        },
        message: "please enter valid mobile number",
      },
    },
    photo: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please provide a pasword."],
      minLength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please cofirm your password."],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "please confirm a correct password.",
      },
    },

    // reset Token
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtual populate to bookings (timeline in profile)
userSchema.virtual("bookings", {
  ref: "Bookings",
  foreignField: "user",
  localField: "_id",
});

// accesing, comparing, encrypting password  -> model. We can access it with the methods.
userSchema.methods.comparePassword = async function (
  givenPassword,
  originalPassword
) {
  return await bcrypt.compare(givenPassword, originalPassword);
};

// user -> password = 1234 -> passwordConfirm = 1234

userSchema.pre("save", async function (next) {
  //0)CONDITION ONLY RUN IF PASSWORD WAS ACTUALLY CHANGED
  // password = 1234
  // password = 1234
  if (!this.isModified("password")) return next();

  //1)ENCRYPTING THE PASSWORD
  this.password = await bcrypt.hash(this.password, 12);

  //2)DELETE THE PASSWORD CONFIRM FIELD
  this.passwordConfirm = undefined;
});

// pre save middleware -> before saving the dacument to the database
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  // updated -> passwordChangedAt -> date.now()
  next();
});

// object methods(document) // non-static
userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};

// object methods (document)
userSchema.methods.createPasswordResetToken = function () {
  // creating the token
  const resetToken = crypto.randomBytes(32).toString("hex");
  // session token -> JWT
  // encrypt -> bycryptjs
  // temparory token -> crypto

  // encrypting the token
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
