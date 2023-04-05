const jwt = require("jsonwebtoken");
const middlewareControllers = {
  verifyToken: (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.sendStatus(401);
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (erro, user) => {
      if (erro) return res.sendStatus(403);
      req.user = user;
      next();
    });
  },
};
module.exports = middlewareControllers;
