const express = require("express");
const reviewController = require("./../controllers/review.controller");
const authController = require("./../controllers/auth.controller");
const router = express.Router();

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(authController.protect, reviewController.createReview);

router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview);

module.exports = router;
