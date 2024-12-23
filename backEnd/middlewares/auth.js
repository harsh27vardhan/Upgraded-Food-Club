const { getUser } = require("../services/auth");

exports.checkAuth = (req, res, next) => {
  console.log("Consoling req.cookies");
  console.log(req.cookies);
  const localToken = req.body?.token; // used for testing purpose, remove this line in production environment.  //console.log("Consoling local token : ", localToken);  //res.json({ token: localToken });  //return;  //req.body.token = localToken;  //next();  //console.log("Consoling res.body token : ", localToken);  //const cookieToken = req.cookies?.token;
  console.log("Consoling res.body token : ", localToken);
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
