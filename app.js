const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const api = require("./routes/api");
const { limiter } = require("./middleware/auth");
const redisClient = require("./services/redis");

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(limiter);
app.use("/api/v1", api);

module.exports = app;
