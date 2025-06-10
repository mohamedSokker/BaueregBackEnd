const bReportGetFiles = require("../../../routes/web/BReport/getFiles");
const bReportUploadFiles = require("../../../routes/web/BReport/uploadFiles");
const bReportDeleteFiles = require("../../../routes/web/BReport/deleteFiles");
const bReportReadFile = require("../../../routes/web/BReport/readFile");

const bReportEndPoints = (app) => {
  app.use("/api/v1/bReportGetFiles", bReportGetFiles);
  app.use("/api/v1/bReportUploadFiles", bReportUploadFiles);
  app.use("/api/v1/bReportDeleteFiles", bReportDeleteFiles);
  app.use("/api/v1/bReportReadFile", bReportReadFile);
};

module.exports = { bReportEndPoints };
