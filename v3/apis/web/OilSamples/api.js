const oilSamplesAnalyze = require("../../../routes/web/OilSamples/analyze");
const oilSampleCreateFolder = require("../../../routes/web/OilSamples/createFolder");
const oilSampleGetFiles = require("../../../routes/web/OilSamples/getFiles");
const oilSampleDeleteFiles = require("../../../routes/web/OilSamples/deleteFiles");
const oilSampleUploadFiles = require("../../../routes/web/OilSamples/uploadFiles");

const oilSamplesEndPoints = (app) => {
  app.use("/api/v3/oilSamplesAnalyze", oilSamplesAnalyze);
  app.use("/api/v3/oilSampleCreateFolder", oilSampleCreateFolder);
  app.use("/api/v3/oilSampleGetFiles", oilSampleGetFiles);
  app.use("/api/v3/oilSampleDeleteFiles", oilSampleDeleteFiles);
  app.use("/api/v3/oilSampleUploadFiles", oilSampleUploadFiles);
};

module.exports = { oilSamplesEndPoints };
