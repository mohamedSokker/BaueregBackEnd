const oilSampleAnalyzedCreateFolder = require("../../../routes/web/OilSamplesAnalyzed/createFolder");
const oilSampleAnalyzedGetFiles = require("../../../routes/web/OilSamplesAnalyzed/getFiles");
const oilSampleAnalyzedDeleteFiles = require("../../../routes/web/OilSamplesAnalyzed/deleteFiles");
const oilSampleAnalyzedRenameFiles = require("../../../routes/web/OilSamplesAnalyzed/rename");
const oilSampleAnalyzedUploadFiles = require("../../../routes/web/OilSamplesAnalyzed/uploadFiles");
const oilSampleAnalyzedSearchFiles = require("../../../routes/web/OilSamplesAnalyzed/searchFiles");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 * 1024 },
});

const oilSamplesAnalyzedEndPoints = (app) => {
  app.use(
    "/api/v3/oilSampleAnalyzedCreateFolder",
    oilSampleAnalyzedCreateFolder
  );
  app.use("/api/v3/oilSampleAnalyzedGetFiles", oilSampleAnalyzedGetFiles);
  app.use("/api/v3/oilSampleAnalyzedDeleteFiles", oilSampleAnalyzedDeleteFiles);
  app.use("/api/v3/oilSampleAnalyzedRenameFiles", oilSampleAnalyzedRenameFiles);
  app.use(
    "/api/v3/oilSampleAnalyzedUploadFiles",
    upload.single("files"),
    oilSampleAnalyzedUploadFiles
  );
  app.use("/api/v3/oilSampleAnalyzedSearchFiles", oilSampleAnalyzedSearchFiles);
};

module.exports = { oilSamplesAnalyzedEndPoints };
