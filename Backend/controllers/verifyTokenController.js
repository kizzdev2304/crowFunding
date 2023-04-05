const jwtHelpers = require("../helpers/jwt");
const message = {
  message: "Unauthorized.",
};
const verifyTokenController = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json(message);
  const accessToken = token.split(" ")[1];
  const user = jwtHelpers.verifyToken(accessToken);
  if (!user) return res.status(401).json(message);
  req.user = user;
  next();
};
module.exports = verifyTokenController;
