const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const registerRouter = require("./routes/register");
const userRouter = require("./routes/user");
const app = express();
app.use(morgan("common"));
app.use(cookieParser());
app.use(express.json());
dotenv.config();
app.use(cors());
//sever
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`sever on port ${PORT}`);
});
//connect mongodb
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connect mongodb success");
  } catch (erro) {
    console.error("Connect mongodb fail");
  }
})();
//Router
app.use("/login", authRouter);
app.use("/register", registerRouter);
app.use("/user", userRouter);
