const oilSamplesAnalyze = require("../../../routes/web/OilSamples/analyze");
const oilSampleCreateFolder = require("../../../routes/web/OilSamples/createFolder");
const oilSampleGetFiles = require("../../../routes/web/OilSamples/getFiles");
const oilSampleDeleteFiles = require("../../../routes/web/OilSamples/deleteFiles");
const oilSampleRenameFiles = require("../../../routes/web/OilSamples/rename");
const oilSampleUploadFiles = require("../../../routes/web/OilSamples/uploadFiles");
const oilSampleSearchFiles = require("../../../routes/web/OilSamples/searchFiles");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 * 1024 },
});

const oilSamplesEndPoints = (app) => {
  app.use("/api/v3/oilSamplesAnalyze", oilSamplesAnalyze);
  app.use("/api/v3/oilSampleCreateFolder", oilSampleCreateFolder);
  app.use("/api/v3/oilSampleGetFiles", oilSampleGetFiles);
  app.use("/api/v3/oilSampleDeleteFiles", oilSampleDeleteFiles);
  app.use("/api/v3/oilSampleRenameFiles", oilSampleRenameFiles);
  app.use(
    "/api/v3/oilSampleUploadFiles",
    upload.single("files"),
    oilSampleUploadFiles
  );
  app.use("/api/v3/oilSampleSearchFiles", oilSampleSearchFiles);
};

module.exports = { oilSamplesEndPoints };
