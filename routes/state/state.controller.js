const {
  createNewState,
  getAllStates,
  getSearch,
} = require("../../models/states/states.model");
const redisClient = require("../../services/redis");

// const httpGetSearch = async (req, res) => {
//   try {
//     let query = req.query;

//     let results;

//     if (Object.keys(query)[0] === "region") {
//       let filter = { state: 1, region: 1 };
//       results = await getSearch(query, filter);
//     } else if (Object.keys(query)[0] === "lgas") {
//       let filter = { state: 1 };
//       results = await getSearch(query, filter);
//     } else {
//       results = await getSearch(query);
//     }

//     return res.status(200).json(results);
//   } catch (error) {
//     res.status(400).json({ message: "Bad Request" });
//   }
// };

const httpGetSearch = async (req, res) => {
  try {
    let query = req.query;
    let results;

    // Generate a unique key for the query
    const queryKey = JSON.stringify(query);

    // Check if the results are already cached
    const cachedResults = await redisClient.get(queryKey);

    if (cachedResults) {
      // Return the cached results
      results = JSON.parse(cachedResults);
    } else {
      // Perform the search and cache the results
      if (Object.keys(query)[0] === "region") {
        let filter = { state: 1, region: 1 };
        results = await getSearch(query, filter);
      } else if (Object.keys(query)[0] === "lgas") {
        let filter = { state: 1 };
        results = await getSearch(query, filter);
      } else {
        results = await getSearch(query);
      }

      // Cache the results for 1 hour
      await redisClient.set(queryKey, JSON.stringify(results), "EX", 3600);
    }

    return res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

const httpGetAllStates = async (req, res) => {
  try {
    // Check if the data is available in the Redis cache

    const data = await redisClient.get("allStates");
    if (data) {
      return res.status(200).json(JSON.parse(data));
    }

    const allStates = await getAllStates();

    redisClient.set("allStates", JSON.stringify(allStates), "EX", 60 * 60);

    return res.status(200).json(allStates);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

const httpCreateState = async (req, res) => {
  try {
    let state = req.body;

    await createNewState(state);

    return res.status(200).json({ message: "State Created", state });
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

module.exports = { httpCreateState, httpGetAllStates, httpGetSearch };
