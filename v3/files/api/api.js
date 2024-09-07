const path = require("path");
require("dotenv").config();
const fs = require("fs");
const FileSystem = require("../fileSystem");

function replaceAllChar(string, char1, char2) {
  while (string.includes(char1)) {
    string = string.replace(char1, char2);
  }
  return string;
}

const decodeURL = (secPath) => {
  secPath = replaceAllChar(secPath, "%20", " ");
  secPath = replaceAllChar(secPath, "%23", "#");
  secPath = replaceAllChar(secPath, "%26", "&");
  secPath = replaceAllChar(secPath, "%25", "%");
  secPath = replaceAllChar(secPath, "%22", '"');
  secPath = replaceAllChar(secPath, "%28", "(");
  secPath = replaceAllChar(secPath, "%29", ")");
  return secPath;
};

const filesEndPoints = (app) => {
  app.get("/users/img/:username/:imgName", (req, res) => {
    const filePath = path.join(
      __dirname,
      "..",
      "/users",
      `/${decodeURL(req.params.username)}`,
      `/${decodeURL(req.params.imgName)}`
    );
    res.sendFile(filePath);
  });

  app.get("/MaintApp/*", (req, res) => {
    const filePath = path.join(
      __dirname,
      "..",
      `/${decodeURL(req.url.toString())}`
    );
    console.log(`MaintApp => ${filePath}`);
    res.sendFile(filePath);
  });

  app.get("/Bauereg/TaskManagerTasks/*", (req, res) => {
    console.log(req.url);
    const inputPath = req.url
      .toString()
      .replace(process.env.CURRENT_DIRECTORY, "")
      .replace("Bauereg/TaskManagerTasks/", "");
    const filePath = path.join(
      __dirname,
      "..",
      "TaskManagerTasks",
      `/${decodeURL(inputPath)}`
    );
    console.log(filePath);
    res.sendFile(filePath);
  });

  app.get("/Bauereg/BReport/*", (req, res) => {
    console.log(req.url);
    const inputPath = req.url
      .toString()
      .replace(process.env.CURRENT_DIRECTORY, "")
      .replace("Bauereg/BReport/", "");
    const filePath = path.join(
      __dirname,
      "..",
      "BReport",
      `/${decodeURL(inputPath)}`
    );
    console.log(filePath);
    res.sendFile(filePath);
  });

  // app.get("/Bauereg/Orders/*", (req, res) => {
  //   const inputPath = req.url
  //     .toString()
  //     .replace("bauereg", "")
  //     .replace("Bauereg", "");
  //   const filePath = path.join(__dirname, "..", `/${decodeURL(inputPath)}`);
  //   res.sendFile(filePath);
  // });
  app.get("/Bauereg/Orders/*", FileSystem);

  app.get("/Bauereg/Catalogues/*", FileSystem);

  app.get("/Bauereg/OilSamples/*", FileSystem);

  app.get("/Bauereg/OilSamplesAnalyzed/*", FileSystem);

  app.get("/Bauereg/Tools/*", FileSystem);

  app.get("/Bauereg/ToolsUpload/*", FileSystem);

  app.get("/Bauereg/DataEntryFiles/*", FileSystem);

  app.get("/Bauereg/Models/*", FileSystem);

  // app.get("/Bauereg/OilSamples/*", (req, res) => {
  //   const inputPath = req.url
  //     .toString()
  //     .replace("bauereg", "")
  //     .replace("Bauereg", "");
  //   const filePath = path.join(__dirname, "..", `/${decodeURL(inputPath)}`);
  //   res.sendFile(filePath);
  // });

  // app.get("/Bauereg/OilSamplesAnalyzed/*", (req, res) => {
  //   const inputPath = req.url
  //     .toString()
  //     .replace("bauereg", "")
  //     .replace("Bauereg", "");
  //   const filePath = path.join(__dirname, "..", `/${decodeURL(inputPath)}`);
  //   res.sendFile(filePath);
  // });

  app.get("/AppGetFiles", (req, res) => {
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
  });
};

module.exports = { filesEndPoints };
