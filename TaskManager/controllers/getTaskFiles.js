const fs = require("fs");
const path = require("path");

const getTaskFiles = async (req, res) => {
  try {
    const basePath = path.join(__dirname, "..", "..", "/TaskManagerFiles");
    const fullpath = req.body.fullpath;
    if (fullpath.length < basePath.length) {
      return res.status(403).json({ message: "Unauthorized" });
    } else {
      const arrayOfFiles = fs.readdirSync(`${fullpath}`);
      const filesList = [];

      arrayOfFiles.forEach((file) => {
        // fs.stat(`${fullpath}/${file}`, (err, stats) => {
        //   if (err) {
        //     console.error(err);
        //     return;
        //   }

        //   if (stats.isFile()) {
        //     filesList.push({
        //       file: file,
        //       type: "file",
        //       size: stats.size,
        //       dateCreated: stats.atime,
        //     });
        //   } else {
        //     filesList.push({
        //       file: file,
        //       type: "folder",
        //       size: stats.size,
        //       dateCreated: stats.atime,
        //     });
        //   }
        // });
        const stats = fs.lstatSync(`${fullpath}/${file}`);
        if (stats.isFile()) {
          filesList.push({
            file: file,
            type: "file",
            size: stats.size,
            dateCreated: stats.ctime,
          });
        } else {
          filesList.push({
            file: file,
            type: "folder",
            size: stats.size,
            dateCreated: stats.ctime,
          });
        }
      });
      return res.status(200).json({ data: filesList });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getTaskFiles };
