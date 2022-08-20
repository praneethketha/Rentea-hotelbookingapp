const express = require("express");
const roomController = require("../controllers/room.controller");

const router = express.Router();

//Create
router.post("/", roomController.createRoom);

//Update
router.patch("/:id", roomController.updateRoom);

//Delete

router.delete("/:id", roomController.deleteRoom);

// Get By Id
router.get("/:id", roomController.getRoom);

//Get All
router.get("/", roomController.getAllRooms);


module.exports = router;
