const express = require("express");
const { stateRouter } = require("./state/state.router");
const { userRouter } = require("./user/user.router");

const api = express.Router();

api.use("/state", stateRouter);
api.use("/user", userRouter);

module.exports = api;
