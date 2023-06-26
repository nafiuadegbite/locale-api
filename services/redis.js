const redis = require("ioredis");
const redisClient = redis.createClient();

redisClient.on("connect", () => {
  console.log("connected to redis successfully!");
});

redisClient.on("error", (error) => {
  console.log("Redis connection error :", error);
});

module.exports = redisClient;
