const express = require("express");
const { httpRegister, httpLogin } = require("./user.controller");

const userRouter = express.Router();

userRouter.post("/register", httpRegister).post("/login", httpLogin);

module.exports = { userRouter };
