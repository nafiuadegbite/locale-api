const { sendTokenResponse, isValidPassword } = require("../../middleware/auth");
const { register, findUser } = require("../../models/users/users.model");
const { generateApiKey } = require("../../utils/generateApiKey");
const validateEmail = require("../../utils/validateEmail");

const httpRegister = async (req, res) => {
  try {
    const user = req.body;

    user.password = user.password.toString();

    if (!user.email || !user.password || !user.first_name || !user.last_name) {
      return res.status(400).json({
        error: "Missing required register property",
      });
    }

    if (!validateEmail(user.email)) {
      return res.status(400).json({ message: "Enter a valid email address" });
    }

    const userExist = await findUser({ email: user.email });

    if (userExist) {
      return res.status(404).json({ message: "User already exists" });
    }

    await register(user);

    sendTokenResponse(user._id, 201, res, user.apiKey);
  } catch (error) {
    res.status(400).json({ message: "Bad Request", error });
  }
};

const httpLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.toString();
    password = password.toString();

    if (!email || !password) {
      return res.status(400).json({
        error: "Missing required login property",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Enter a valid email address" });
    }

    const user = await findUser({ email });

    // Check if user exist
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isValid = await isValidPassword(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    sendTokenResponse(user._id, 200, res);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Bad Request" });
  }
};

module.exports = { httpRegister, httpLogin };
