const Redis = require("ioredis");

require("dotenv").config();

const endpoint = process.env.REDIS_ENDPOINT_URL;
const password = process.env.REDIS_PASSWORD;

const [host, port] = endpoint.split(":");

const redisClient = new Redis({
  host: host,
  port: port,
  password: password,
});

redisClient.on("connect", () => {
  console.log("connected to redis successfully!");
});

redisClient.on("error", (error) => {
  console.log("Redis connection error :", error);
});

module.exports = redisClient;
