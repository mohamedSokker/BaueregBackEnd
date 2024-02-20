const login = require("../../routes/login");
const FileSystem = require("../../controllers/filesystem");
const { auth } = require("../../controllers/auth");
let CurrDir = process.env.CURRENT_DIRECTORY;

const filesystemrcreateroutes = require("../../FileSystemroutes/handleCreateFolder");
const filessystemrenameroutes = require("../../FileSystemroutes/handleRenameFolder");
const filessystemdeleteroutes = require("../../FileSystemroutes/handleDeleteFolder");
const filessystemuploadroutes = require("../../FileSystemroutes/handleUploadFolder");

const fileSystemEndPoints = (app) => {
  app.get("/", (req, res) => {
    res.sendFile(CurrDir + "/login.html");
  });

  app.get("/style29.css", (req, res) => {
    res.sendFile(CurrDir + "/style29.css");
  });

  app.get("/favicon.ico", (req, res) => {
    res.sendFile(CurrDir + "/images/logo.jpg");
  });

  app.get("/images/logo.jpg", (req, res) => {
    res.sendFile(CurrDir + "/images/logo.jpg");
  });

  app.get("/images/cover.jpg", (req, res) => {
    res.sendFile(CurrDir + "/images/Cover.jpg");
  });

  app.use("/login", login);

  app.get("/Bauereg/Share/*", auth, FileSystem);

  app.get("/MaintApp/*", FileSystem);

  app.get("/Bauereg/Orders/*", FileSystem);

  app.get("/Bauereg/OilSamples/*", FileSystem);

  app.get("/Bauereg/OilSamplesAnalyzed/*", FileSystem);

  app.use("/CreateFolder", filesystemrcreateroutes);

  app.use("/RenameFolder", filessystemrenameroutes);

  app.use("/DeleteFolder", filessystemdeleteroutes);

  app.use("/Upload", filessystemuploadroutes);
};

module.exports = { fileSystemEndPoints };
