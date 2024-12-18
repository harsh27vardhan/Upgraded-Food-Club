const { getUser } = require("../services/auth");

function giveAccess(roles = []) {
  return (req, res, next) => {
    // const userRole = req.user.role;
    // console.log(req);
    const userRole = getUser(req.cookies.token).role;
    console.log(userRole);
    if (roles.includes(userRole)) {
      console.log("Going to next");
      next();
    } else {
      console.log("Not going to next");
      res.status(403).send({ message: "Not allowed to access this route." });
    }
  };
}

module.exports = giveAccess;
