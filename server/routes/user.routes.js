const express = require("express");
const authController = require("./../controllers/auth.controller");
const userController = require("./../controllers/user.controller");

// defining base router
const router = express.Router();

// authentication routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// forgot password route
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// protected routes
router.patch("/updateMe", authController.protect, userController.updateMe);
router.patch("/deleteMe", authController.protect, userController.deleteMe);

router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);

router.patch("/verifyOTP", authController.verifyOTP);

// general user routes

// authorized routes
router
  .route("/")
  .get(
    // authController.protect,
    // authController.restrictTo("admin"),
    userController.getAllUsers
  )
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
