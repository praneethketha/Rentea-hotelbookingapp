const express = require("express");
const hotelController = require("../controllers/hotel.controller");
const authController = require("./../controllers/auth.controller");
const roomController = require("./../controllers/room.controller");

const router = express.Router();

router.route("/priceRange").get(hotelController.getPriceRange);
router.route("/cities").get(hotelController.getByCities);

router
  .route("/")
  .get(hotelController.getAllHotel)
  .post(hotelController.createHotel);

router
  .route("/:id")
  .get(hotelController.getHotel)
  .patch(
    // authController.protect,
    // authController.restrictTo("admin", "hotelmanager"),
    hotelController.updateHotel
  )
  .delete(
    // authController.protect,
    // authController.restrictTo("admin", "hotelmanager"),
    hotelController.deleteHotel
  );

router
  .route("/bookNow/:id")
  .patch(
    authController.protect,
    roomController.updateRoomAvailability,
    hotelController.bookRoom
  );

module.exports = router;
