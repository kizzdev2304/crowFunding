const brcypt = require("bcrypt");
const db = require("../models/users");
const jwtHelpers = require("../helpers/jwt");
const cookieRes = require("../helpers/cookie");
const authController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const user = await db.findOne({ username: req.body.username });
  if (!user)
    return res.status(404).json({
      message: "Invalid username.",
    });
  const validPassword = await brcypt.compare(password, user.password);
  if (!validPassword)
    return res.status(404).json({
      message: "Invalid password.",
    });
  if (username && password) {
    const accessToken = jwtHelpers.generateToken(
      user,
      process.env.ACCESS_TOKEN_SECRET,
      "1h"
    );
    const refreshToken = jwtHelpers.generateToken(
      user,
      process.env.REFRESH_TOKEN_SECRET,
      "7d"
    );
    const { password, ...others } = user._doc;
    res.cookie("jwt", refreshToken, cookieRes);
    res.status(200).json({ ...others, accessToken });
  }
};
module.exports = authController;
