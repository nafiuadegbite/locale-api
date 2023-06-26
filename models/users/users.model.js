const { hashPassword } = require("../../middleware/auth");
const { generateApiKey } = require("../../utils/generateApiKey");
const userDatabase = require("./users.mongo");

const DEFAULT_ID = 0;

const findUser = async (filter) => {
  return await userDatabase.findOne(filter);
};

const saveUser = async (user) => {
  await userDatabase.findOneAndUpdate({ _id: user._id }, user, {
    upsert: true,
  });
};

const getUserId = async () => {
  const latestUser = await userDatabase.findOne().sort("-_id");

  if (!latestUser) {
    return DEFAULT_ID;
  }

  return latestUser._id;
};

const register = async (user) => {
  // Set new ID for User
  const newId = (await getUserId()) + 1;
  // Hash User's Password with Bcrypt
  const newPassword = await hashPassword(user.password);

  const apiKey = generateApiKey();

  // Assign new ID and Password to User's Object
  const newUser = Object.assign(user, {
    _id: newId,
    password: newPassword,
    apiKey,
  });

  // Save User to Database
  await saveUser(newUser);
};

const updateUser = async (id, update) => {
  return await userDatabase.findByIdAndUpdate(id, update);
};

module.exports = { findUser, register, updateUser };
