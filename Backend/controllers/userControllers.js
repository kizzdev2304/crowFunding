const User = require("../models/users");
const userController = {
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      if (user) res.status(200).json(user);
      res.status(200).json({ message: "No user." });
    } catch (erro) {
      res.status(500).json(erro);
    }
  },
  deleteUsers: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (user) res.status(200).json({ message: "Delete success." });
      res.status(200).json({ message: "Invail id username." });
    } catch (erro) {
      res.status(500).json(erro);
    }
  },
};
module.exports = userController;
