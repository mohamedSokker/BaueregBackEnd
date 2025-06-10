const fs = require("fs");
const path = require("path");

const deleteFile = (req, res) => {
  try {
    const startPath = req.body.path;
    const fullpath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "files",
      "TaskManagerTasks",
      startPath
    );
    if (fs.lstatSync(fullpath).isFile()) {
      fs.unlinkSync(fullpath);
      return res.status(200).json({ message: "Success" });
    } else {
      throw new Error("Can't delete this directory");
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { deleteFile };
