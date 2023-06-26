const express = require("express");
const {
  httpCreateState,
  httpGetAllStates,
  httpGetSearch,
} = require("./state.controller");
const { authenticateUser } = require("../../middleware/auth");

const stateRouter = express.Router();

stateRouter
  .get("/", authenticateUser, httpGetAllStates)
  .get("/search", authenticateUser, httpGetSearch)
  .post("/", httpCreateState);

module.exports = { stateRouter };
