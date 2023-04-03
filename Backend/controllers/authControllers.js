const brcypt = require("bcrypt");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const authControllers = {
  registerUser: async (req, res) => {
    try {
      const salt = await brcypt.genSalt(10);
      const hashed = await brcypt.hash(req.body.password, salt);
      const newUser = await new User({
        username: req.body.username,
        password: hashed,
        email: req.body.email,
      });
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (erro) {
      res.status(500).json(erro);
    }
  },
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(404).json("Wrong user!");
      }
      const validPassword = await brcypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(404).json("Wrong password!");
      }
      if (user && validPassword) {
        const token = jwt.sign(
          {
            id: user.id,
            user: user.username,
            email: user.email,
            admin: user.admin,
          },

          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, token });
      }
    } catch (erro) {
      res.status(500).json(erro);
    }
  },
};

module.exports = authControllers;
