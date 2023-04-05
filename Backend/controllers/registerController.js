const brcypt = require("bcrypt");
const db = require("../models/users");
const jwtHelpers = require("../helpers/jwt");
const cookieRes = require("../helpers/cookie");
const registerController = async (req, res) => {
  const salt = await brcypt.genSalt(10);
  const hashed = await brcypt.hash(req.body.password, salt);
  const user = await db.findOne({ username: req.body.username });
  const email = await db.findOne({ email: req.body.email });
  if (user || email)
    return res
      .status(400)
      .json({ message: "Username or email already existsl." });
  const newUser = await new db({
    username: req.body.username,
    password: hashed,
    email: req.body.email,
  });
  const userSave = await newUser.save();
  const accessToken = jwtHelpers.generateToken(
    userSave,
    process.env.ACCESS_TOKEN_SECRET,
    "1h"
  );
  const refreshToken = jwtHelpers.generateToken(
    userSave,
    process.env.REFRESH_TOKEN_SECRET,
    "7d"
  );
  const { password, ...others } = userSave._doc;
  res.cookie("jwt", refreshToken, cookieRes);
  res.status(200).json({ ...others, accessToken });
};
module.exports = registerController;
