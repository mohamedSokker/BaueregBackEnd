const fs = require("fs");

const deleteFolder = (req, res) => {
  try {
    if (fs.lstatSync(req.query.oldpath).isFile()) {
      fs.unlinkSync(req.query.oldpath);
      return res.status(200).json({ message: "Success" });
    } else {
      fs.rmSync(req.query.oldpath, { recursive: true, force: true });
      return res.status(200).json({ message: "Success" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { deleteFolder };
