const fs = require("fs");

const deleteFile = (req, res) => {
  try {
    const path = req.body.path;
    if (fs.lstatSync(path).isFile()) {
      fs.unlinkSync(path);
      return res.status(200).json({ message: "Success" });
    } else {
      throw new Error("Can't delete this directory");
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { deleteFile };
