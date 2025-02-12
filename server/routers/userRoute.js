const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();
const { body } = require("express-validator");

userRouter.post(
  "/signUp",
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  userController.signUp,
);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/refresh", userController.refresh);

module.exports = userRouter;
