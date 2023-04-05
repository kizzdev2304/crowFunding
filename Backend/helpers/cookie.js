const cookieRes = {
  httpOnly: true,
  sameSite: "None",
  secure: true,
  maxAge: 24 * 60 * 60 * 7 * 1000,
};
module.exports = cookieRes;
