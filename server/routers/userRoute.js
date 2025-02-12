const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/signUp", userController.signUp);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/refresh", userController.refresh);

module.exports = userRouter;
