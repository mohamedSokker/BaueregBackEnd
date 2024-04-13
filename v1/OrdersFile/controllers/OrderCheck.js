const fs = require("fs");

const orderCheck = async (req, res) => {
  try {
    if (fs.existsSync(req.query.path)) {
      if (fs.lstatSync(req.query.path).isFile()) {
        return res.status(200).json({ type: "file" });
      } else {
        return res.status(200).json({ type: "folder" });
      }
    } else {
      throw new Error(`No Such Directory`);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { orderCheck };
