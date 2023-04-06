const brcypt = require("bcrypt");
const db = require("../models/users");
const jwtHelpers = require("../helpers/jwt");
const cookieRes = require("../helpers/cookie");
const authController = {
  getToken: (user) => {
    return jwtHelpers.generateToken(
      user,
      process.env.ACCESS_TOKEN_SECRET,
      "1h"
    );
  },
  getRefreshToken: (user) => {
    return jwtHelpers.generateToken(
      user,
      process.env.REFRESH_TOKEN_SECRET,
      "7d"
    );
  },
  unauthorized: {
    message: "Unauthorized.",
  },
  //login
  loginController: async (req, res) => {
    try {
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
        const accessToken = authController.getToken(user);
        const refreshToken = authController.getRefreshToken(user);
        const { password, ...others } = user._doc;
        res.cookie("jwt", refreshToken, cookieRes);
        return res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  //register
  registerController: async (req, res) => {
    try {
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
      const accessToken = authController.getToken(user);
      const refreshToken = authController.getRefreshToken(user);
      const { password, ...others } = userSave._doc;
      res.cookie("jwt", refreshToken, cookieRes);
      return res.status(200).json({ ...others, accessToken });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  //verifyToken
  verifyTokenController: (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      if (!token) return res.status(401).json(authController.unauthorized);
      const accessToken = token.split(" ")[1];
      const user = jwtHelpers.verifyToken(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      if (!user) return res.status(401).json(authController.unauthorized);
      req.user = user;
      next();
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  //refreshToken
  refreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies?.jwt;
      if (!refreshToken)
        return res.status(401).json(authController.unauthorized);
      const user = jwtHelpers.verifyToken(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      if (!user)
        return res.status(403).json({
          message: "Refresh token is not valid.",
        });
      const accessToken = authController.getToken(user);
      const newRefreshToken = authController.getRefreshToken(user);
      res.cookie("jwt", newRefreshToken, cookieRes);
      return res.status(200).json({ accessToken });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  // logout
  logoutController: async (req, res) => {
    try {
      res.clearCookie("jwt");
      return res.status(200).json({
        message: "Success.",
      });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
};

module.exports = authController;
