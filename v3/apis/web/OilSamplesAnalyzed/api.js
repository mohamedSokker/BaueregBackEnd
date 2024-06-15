const oilSampleAnalyzedCreateFolder = require("../../../routes/web/OilSamplesAnalyzed/createFolder");
const oilSampleAnalyzedGetFiles = require("../../../routes/web/OilSamplesAnalyzed/getFiles");
const oilSampleAnalyzedDeleteFiles = require("../../../routes/web/OilSamplesAnalyzed/deleteFiles");
const oilSampleAnalyzedRenameFiles = require("../../../routes/web/OilSamplesAnalyzed/rename");
const oilSampleAnalyzedUploadFiles = require("../../../routes/web/OilSamplesAnalyzed/uploadFiles");
const oilSampleAnalyzedSearchFiles = require("../../../routes/web/OilSamplesAnalyzed/searchFiles");

const oilSamplesAnalyzedEndPoints = (app) => {
  app.use(
    "/api/v3/oilSampleAnalyzedCreateFolder",
    oilSampleAnalyzedCreateFolder
  );
  app.use("/api/v3/oilSampleAnalyzedGetFiles", oilSampleAnalyzedGetFiles);
  app.use("/api/v3/oilSampleAnalyzedDeleteFiles", oilSampleAnalyzedDeleteFiles);
  app.use("/api/v3/oilSampleAnalyzedRenameFiles", oilSampleAnalyzedRenameFiles);
  app.use("/api/v3/oilSampleAnalyzedUploadFiles", oilSampleAnalyzedUploadFiles);
  app.use("/api/v3/oilSampleAnalyzedSearchFiles", oilSampleAnalyzedSearchFiles);
};

module.exports = { oilSamplesAnalyzedEndPoints };
