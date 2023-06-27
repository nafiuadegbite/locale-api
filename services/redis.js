const redis = require("ioredis");
const redisClient = redis.createClient({
  password: "3qfRzzQxNUscJZ8yidc9ptVyKhIwwFhn",
  socket: {
    host: "redis-10820.c226.eu-west-1-3.ec2.cloud.redislabs.com",
    port: 10820,
  },
});

redisClient.on("connect", () => {
  console.log("connected to redis successfully!");
});

redisClient.on("error", (error) => {
  console.log("Redis connection error :", error);
});

module.exports = redisClient;
