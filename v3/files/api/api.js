const path = require("path");
require("dotenv").config();

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

  app.get("/Bauereg/Orders/*", (req, res) => {
    const inputPath = req.url
      .toString()
      .replace("bauereg", "")
      .replace("Bauereg", "");
    const filePath = path.join(__dirname, "..", `/${decodeURL(inputPath)}`);
    res.sendFile(filePath);
  });

  app.get("/Bauereg/OilSamples/*", (req, res) => {
    const inputPath = req.url
      .toString()
      .replace("bauereg", "")
      .replace("Bauereg", "");
    const filePath = path.join(__dirname, "..", `/${decodeURL(inputPath)}`);
    res.sendFile(filePath);
  });

  app.get("/Bauereg/OilSamplesAnalyzed/*", (req, res) => {
    const inputPath = req.url
      .toString()
      .replace("bauereg", "")
      .replace("Bauereg", "");
    const filePath = path.join(__dirname, "..", `/${decodeURL(inputPath)}`);
    res.sendFile(filePath);
  });
};

module.exports = { filesEndPoints };
