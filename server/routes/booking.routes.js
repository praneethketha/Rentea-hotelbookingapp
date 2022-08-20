const express = require("express");
const bookingController = require("./../controllers/booking.controller");
const authController = require("./../controllers/auth.controller");
const router = express.Router();

router.route("/").get(bookingController.getAllBookings);

router.route("/:id").patch(bookingController.updateBooking);

router.route("/payment").post(bookingController.getStripeKey);

router
  .route("/payment/mail")
  .post(authController.protect, bookingController.sendPaymentMail);

router.route("/getBookingStats").get(bookingController.getBookingsByDay);

module.exports = router;
