const express = require("express");
const cityController = require("./../controllers/city.controller");
const router = express.Router();

router.route("/").get(cityController.getCities).post(cityController.createCity);

module.exports = router;
