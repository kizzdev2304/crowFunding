const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
dotenv.config();
app.use(cors());
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, MONGODB_URL } = process.env;
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`sever on port ${PORT}`);
});
(async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("connect mongodb success");
  } catch (erro) {
    console.error("Connect mongodb fail");
  }
})();
//Router
app.use("/", authRouter);
app.use("/user", userRouter);
