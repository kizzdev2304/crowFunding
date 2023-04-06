const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      minlength: 6,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("users", userSchema);
