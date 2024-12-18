const express = require("express");
const {
  signUpUser,
  logInUser,
  getAllUsers,
  logOutUser,
} = require("../controllers/user");
const router = express.Router();

router.get("/all", getAllUsers);
router.get("/", (req, res) => {
  res.send("Welcome to Foodclub API");
});

router.post("/signup", signUpUser);
router.post("/login", logInUser);
router.post("/logout", (req, res) => {
  res.clearCookie("token", { path: "/" }); //Have to give the path as the cookie is on the path / but we're currently on path /user/logout
  res.clearCookie("userRole", { path: "/" }); //Have to give the path as the cookie is on the path / but we're currently on path /user/logout
  res.send("Logged out successfully");
});

module.exports = router;
