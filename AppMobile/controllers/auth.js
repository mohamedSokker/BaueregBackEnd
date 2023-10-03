const jwt = require("jsonwebtoken");

let appMaintauth = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  let flag = false;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Failed From authHeader" });

  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decode) => {
    if (err) return res.status(403).json({ message: err.message });

    if (resourcesTitles.includes(decode.role)) {
      next();
    } else {
      return res.status(401).json({ message: "Failed From Permission" });
    }
  });
};

const resourcesTitles = [
  "Project Manager",
  "Operator",
  "Senior",
  "Junior",
  "Technician",
];

module.exports = { appMaintauth };
