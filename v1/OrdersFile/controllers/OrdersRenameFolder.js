const fs = require("fs");

const renameFolder = (req, res) => {
  try {
    if (fs.existsSync(req.query.oldpath)) {
      fs.rename(req.query.oldpath, req.query.newpath, (err) => {
        if (err) throw new Error(err.message);
      });
      return res.status(200).json({ message: "Success" });
    } else {
      throw new Error(`No Such Directory`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { renameFolder };
