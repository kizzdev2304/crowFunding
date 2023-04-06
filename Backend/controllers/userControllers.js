const User = require("../models/users");
const userController = {
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      if (user) return res.status(200).json(user);
      return res.status(200).json({ message: "No user." });
    } catch (erro) {
      return res.status(500).json(erro);
    }
  },
  deleteUsers: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (user) return res.status(200).json({ message: "Delete success." });
      return res.status(200).json({ message: "Invail id username." });
    } catch (erro) {
      return res.status(500).json(erro);
    }
  },
};
module.exports = userController;
