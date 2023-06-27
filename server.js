const http = require("http");
const app = require("./app");
const { mongoConnect } = require("./services/mongo");
const redisClient = require("./services/redis");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

const startServer = async () => {
  await mongoConnect();
  server.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
  });
};

startServer();
