const User = require("../models/user");
const { setUser } = require("../services/auth");

exports.getAllUsers = (req, res) => {
  User.find({}).then((user) => {
    res.send(user);
  });
};

exports.signUpUser = (req, res) => {
  console.log(req.body);
  const { fullname, username, password, email, role } = req.body;
  User.create({ fullname, username, password, email, role })
    .then((user) => {
      res.status(201).send({
        user,
        status: "success",
        message: "Users created successfully",
      });
    })
    .catch((err) => {
      res.status(400).send({ message: "User created failed", error: err });
    });
};

exports.logInUser = async (req, res) => {
  console.log("Trying to find user...");
  const { username, password } = req.body;
  try {
    await User.findOne({ username, password }).then((user) => {
      console.log("console of user controller");
      console.log(user);
      if (!user || user.length === 0) {
        return res
          .status(401)
          .send({ message: "User not found", error: "User not found" });
      }
      const token = setUser(user);
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      res.cookie("token", token, {
        httpOnly: false,
        secure: false,
        sameSite: "None",
        priority: "High",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        expires,
      });
      res.cookie("userRole", user.role, {
        httpOnly: false, // can access this cookie from the front end
        secure: true,
        sameSite: "None",
        priority: "High",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        expires,
      });
      res.status(200).send({
        token,
        user, // res.user = user;
        status: "success",
        message: "User logged in successfully",
      });
      // console.log("Consoling the user....");
      // console.log(res);
    });
  } catch (err) {
    return res
      .status(401)
      .send({ message: "Invalid username or password", ...err });
  }
};
exports.logOutUser = (req, res) => {
  res.clearCookie("token").send({ message: "User logged out successfully" });
};
