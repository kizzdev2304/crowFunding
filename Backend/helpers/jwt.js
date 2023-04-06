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
const verifyToken = (secretKey, refreshTokenSecret) => {
  return jwt.verify(secretKey, refreshTokenSecret, (err, user) => {
    if (err) return false;
    return user;
  });
};
module.exports = { generateToken, verifyToken };
