const mongoose = require("mongoose");
const User = require("./user");
const filterToSelect = require("./../utils/filterToSelect");

const hotelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please provide a description"],
    },
    cover_pic: {
      type: String,
      required: [true, "Please provide a cover image"],
    },
    rating: {
      type: Number,
      default: 3,
      min: 1,
      max: 5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    images: [String],
    location: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: {
        type: String,
        required: [true, "Please provide the address"],
        trim: true,
      },
    },
    basePrice: {
      type: Number,
      required: [true, "Please provide a base price"],
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    city: {
      type: String,
      required: [true, "Please provide the city"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtuals -> creating property with help of other properties
// dereived properties -> getting value from another existing property.
// instead of storing we just displayed.

// while we use referencing [objectId]  -> res ("OjectId" -> schema)
// populating -> normal popluating, virtual populating
// [array of documents] parent -> hotel, child -> rooms {schema, rooms, reveiws}
hotelSchema.virtual("rooms", {
  ref: "Room",
  foreignField: "hotel", // foreignKey
  localField: "_id", // primayKey
});

/*
[{hotel: 1},{hotel: 1},{ hotel: 2}] -> rooms
[{_id: 1}, {_id : 2}, {_id: 3}] -> hotels
get(hotel(1)) -> {_id, name, ...schema, rooms: [{hotel: 1},{hotel: 1}], reviews: []}
jooins -> SQL(Relational Database)
*/

// -> link betwen two schema

hotelSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "hotel",
  localField: "_id",
});

// query middleware (it performs before any method )
hotelSchema.pre(/^find/, function (next) {
  // populating user with id
  // Hotel.find()
  this.populate({
    path: "created_by",
    select: filterToSelect(User.schema.paths, "name", "email", "_id"),
  });

  next(); // -> the controller of that find method
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
