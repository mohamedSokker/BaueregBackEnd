const jwt = require("jsonwebtoken");

let authapp = (tableName) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    // console.log(req.headers);
    if (!authHeader?.startsWith("Bearer ")) {
      console.log("Failed From authHeader");
      return res.sendStatus(401);
    }
    const token = authHeader && authHeader.split(" ")[1];
    jwt.verify(token, "Bauer", (err, decode) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      // console.log(decode.roles);
      if (decode.roles.Admin) {
        next();
      } else if (
        checkRole(tableName, decode.roles.Editor.Tables) ||
        checkRole(tableName, decode.roles.User.Tables)
      ) {
        next();
      } else if (
        (decode.roles.Editor.Kanban || decode.roles.User.Kanban) &&
        tableName === "AdminTasks"
      ) {
        next();
      } else {
        console.log("Failed From Per");
        return res.sendStatus(401);
      }
    });
  };
};

const checkRole = (tableName, roles) => {
  let flag = false;
  roles.map((role) => {
    if (role.name === tableName) {
      flag = true;
      return true;
    }
  });
  if (flag) {
    return true;
  }
  return false;
};

module.exports = { authapp };
