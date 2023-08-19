const fs = require("fs");

const getFiles = (req, res) => {
  let basePath = process.env.BASE_PATH;
  if (req.query.fullpath.length < basePath.length) {
    res.send("unouthorized");
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
    res.send({ success: true, data: filesList });
  }
};

module.exports = { getFiles };
