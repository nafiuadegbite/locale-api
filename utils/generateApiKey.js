const { v4: uuidv4 } = require("uuid");

const generateApiKey = () => {
  const apiKey = uuidv4();

  return apiKey;
};

module.exports = { generateApiKey };
