const jwt = require("jsonwebtoken");
const secret = "rarerabbit";

exports.setUser = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    secret,
    {
      expiresIn: "7d",
    }
  );
};

exports.getUser = (token) => {
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
};
