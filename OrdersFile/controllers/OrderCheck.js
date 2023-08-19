const fs = require("fs");

const orderCheck = (req, res) => {
  if (fs.lstatSync(req.query.path).isFile()) {
    res.send({ type: "file" });
  } else {
    res.send({ type: "folder" });
  }
};

module.exports = { orderCheck };
