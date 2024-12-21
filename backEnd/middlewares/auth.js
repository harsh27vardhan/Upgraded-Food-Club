const { getUser } = require("../services/auth");

exports.checkAuth = (req, res, next) => {
  console.log("Consoling req.cookies");
  console.log(req.cookies);
  const cookieToken = req.cookies?.token;
  const headerToken = req.headers?.authorization?.split(" ")[1] ?? "";
  const token = cookieToken || headerToken;
  if (!token) {
    console.log({
      message: "Unauthorized access",
      error: true,
      status: "failed",
    });
    return res.status(401).json({
      message: "Unauthorized access",
      redirectTo: "/login",
    });
  } else {
    const user = getUser(token);
    if (!user || user.length === 0) {
      console.log({
        message: "Unble to verify token",
        status: "failed",
      });
      return res.status(404).redirect("http://localhost:5173/login");
    }
    req.user = user;
    next();
  }
};
