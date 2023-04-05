const jwt = require("jsonwebtoken");
const generateToken = (user, secretKey, secretTime) => {
  return jwt.sign(
    {
      id: user.id,
      user: user.username,
      email: user.email,
      admin: user.admin,
    },
    secretKey,
    { expiresIn: secretTime }
  );
};
const verifyToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      user: user.username,
      email: user.email,
      admin: user.admin,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
};
module.exports = { generateToken };
