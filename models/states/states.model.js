const stateDatabase = require("./states.mongo");

const DEFAULT_ID = 0;

const getSearch = async (query, filter) => {
  return await stateDatabase.find(query, filter);
};

const getAllStates = async () => {
  return await stateDatabase.find({});
};

const saveState = async (state) => {
  await stateDatabase.findOneAndUpdate(
    {
      _id: state._id,
    },
    state,
    {
      upsert: true,
    }
  );
};

const getStateId = async () => {
  const latestState = await stateDatabase.findOne().sort("-_id");

  if (!latestState) {
    return DEFAULT_ID;
  }

  return latestState._id;
};

const createNewState = async (state) => {
  const newId = (await getStateId()) + 1;

  const newState = Object.assign(state, { _id: newId });

  await saveState(newState);
};

module.exports = { createNewState, getAllStates, getSearch };
