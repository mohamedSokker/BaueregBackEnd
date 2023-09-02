const fs = require("fs");

const getFiles = async (req, res) => {
  try {
    let basePath = process.env.BASE_PATH;
    if (req.query.fullpath.length < basePath.length) {
      return res.status(403).json({ message: "Unauthorized" });
    } else {
      let arrayOfFiles = fs.readdirSync(`${req.query.fullpath}`);
      let filesList = [];

      arrayOfFiles.forEach((file) => {
        if (fs.lstatSync(`${req.query.fullpath}/${file}`).isFile()) {
          filesList.push({ file: file, type: "file" });
        } else {
          filesList.push({ file: file, type: "folder" });
        }
      });
      return res.status(200).json({ success: true, data: filesList });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getFiles };
