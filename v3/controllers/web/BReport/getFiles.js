const fs = require("fs");
const path = require("path");
require("dotenv").config();
// console.log(
//   path.join(__dirname, "..", "..", "..", "/files", "/TaskManagerTasks")
// );

const getFiles = async (req, res) => {
  try {
    const basePath = req.body.fullpath.replace(
      process.env.CURRENT_DIRECTORY,
      ""
    );
    const fullpath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "/files",
      "BReport",
      basePath
    );
    // console.log(fullpath);

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
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getFiles };
