const fs = require("fs");

const createFolder = (req, res) => {
  try {
    if (!fs.existsSync(req.query.fullpath)) {
      fs.mkdirSync(req.query.fullpath);
      return res.status(200).json({ message: "success" });
    } else {
      return res.status(400).json({ message: "Invaild Path" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { createFolder };
