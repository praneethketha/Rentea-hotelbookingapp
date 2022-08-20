const mongoose = require("mongoose");
const Hotel = require("./hotel");

const reviewSchema = mongoose.Schema({
  review: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: [true, "Please provide  hotel"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide  hotel"],
  },
});

reviewSchema.pre(/^find/, function (next) {
  // populating user with id
  this.populate({
    path: "hotel",
    select: "name",
  }).populate({
    path: "user",
    select: "name photo",
  });

  next();
  // -> will move corresponding controller that we are handling
  // -> getAllReviews() ->  find({}) -> this function -> next() -> getAllReviews()
});

// adding methods to the schema it self
// statics is used to create stactic 
reviewSchema.statics.calcAverageRatings = async function (hotelId) {
  // aggregate (pipline) -> series steps the document will grow through
  // this -> current class -> aggregate(class only)
  // groupBy in the sql (rdms) select * from student groupby name where id = 1
  const stats = await this.aggregate([
    // {hotel: 1}{hotel:1}{hotel2}{hotel:3}
    {
      $match: { hotel: hotelId },
    },
    // {hotel: 1},{hotel: 1},{hotel: 1}
    {
      $group: {
        _id: "$hotel",
        nRating: { $sum: 1 }, // number of ratings (review documents)
        avgRating: { $avg: "$rating" }, // average based on rating property
      },
    },
  ]);

  // stats : [{_id: 1, nRating: 3, avgRating: 3}]
  await Hotel.findByIdAndUpdate(hotelId, {
    ratingsQuantity: stats[0].nRating,
    rating: stats[0].avgRating,
  });
};

// middleware -> post middleware(next) -> itself last middleware 
reviewSchema.post("save", function () {
  // this points to current document
  // schema -> class 
  // document -> object -> this.constructor -> (class)schema 

  this.constructor.calcAverageRatings(this.hotel);

  //constructor -> the actual schema -> Class(constructor)
  // static functions -> those functions that are not changed/ created for every object
  // those functions will be created when the class is defined -> it ccan only be accessible with the classname
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
