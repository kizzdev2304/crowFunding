const jwtHelpers = require("../helpers/jwt");
const verifyTokenController = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);
  const accessToken = token.split(" ")[1];
  console.log(jwtHelpers.verifyToken(accessToken));
  next();
};
module.exports = verifyTokenController;
