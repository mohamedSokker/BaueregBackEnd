const CustomDataEntryGetFiles = require("../../../routes/web/CustomDataEntry/getFiles");
const CustomDataEntryCreateFolder = require("../../../routes/web/CustomDataEntry/createFolder");
const CustomDataEntryDeleteFiles = require("../../../routes/web/CustomDataEntry/deleteFiles");
const CustomDataEntryRenameFiles = require("../../../routes/web/CustomDataEntry/rename");
const CustomDataEntryUploadFiles = require("../../../routes/web/CustomDataEntry/uploadFiles");
const CustomDataEntrySearchFiles = require("../../../routes/web/CustomDataEntry/searchFiles");
const CustomDataEntryAnalyzeFiles = require("../../../routes/web/CustomDataEntry/analyze");

const CustomDataEntryEndPoints = (app) => {
  app.use("/api/v3/CustomDataEntryGetFiles", CustomDataEntryGetFiles);
  app.use("/api/v3/CustomDataEntryCreateFolder", CustomDataEntryCreateFolder);
  app.use("/api/v3/CustomDataEntryDeleteFiles", CustomDataEntryDeleteFiles);
  app.use("/api/v3/CustomDataEntryRenameFiles", CustomDataEntryRenameFiles);
  app.use("/api/v3/CustomDataEntryUploadFiles", CustomDataEntryUploadFiles);
  app.use("/api/v3/CustomDataEntrySearchFiles", CustomDataEntrySearchFiles);
  app.use("/api/v3/CustomDataEntryAnalyzeFiles", CustomDataEntryAnalyzeFiles);
};

module.exports = { CustomDataEntryEndPoints };
