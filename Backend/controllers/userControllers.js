const User = require("../models/users");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (erro) {
      res.status(500).json(erro);
    }
  },
  deleteUsers: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("delete success");
    } catch (erro) {
      res.status(500).json(erro);
    }
  },
};
module.exports = userController;
