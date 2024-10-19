const EqsToolsUploadCreateFolder = require("../../../routes/web/EqsToolsUpload/createFolder");
const EqsToolsUploadGetFiles = require("../../../routes/web/EqsToolsUpload/getFiles");
const EqsToolsUploadDeleteFiles = require("../../../routes/web/EqsToolsUpload/deleteFiles");
const EqsToolsUploadRenameFiles = require("../../../routes/web/EqsToolsUpload/rename");
const EqsToolsUploadUploadFiles = require("../../../routes/web/EqsToolsUpload/uploadFiles");
const EqsToolsUploadSearchFiles = require("../../../routes/web/EqsToolsUpload/searchFiles");
const EqsToolsUploadAnalyzeFiles = require("../../../routes/web/EqsToolsUpload/analyze");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 * 1024 },
});

const EqsToolsUploadEndPoints = (app) => {
  app.use("/api/v3/EqsToolsUploadCreateFolder", EqsToolsUploadCreateFolder);
  app.use("/api/v3/EqsToolsUploadGetFiles", EqsToolsUploadGetFiles);
  app.use("/api/v3/EqsToolsUploadDeleteFiles", EqsToolsUploadDeleteFiles);
  app.use("/api/v3/EqsToolsUploadRenameFiles", EqsToolsUploadRenameFiles);
  app.use(
    "/api/v3/EqsToolsUploadUploadFiles",
    upload.single("files"),
    EqsToolsUploadUploadFiles
  );
  app.use("/api/v3/EqsToolsUploadSearchFiles", EqsToolsUploadSearchFiles);
  app.use("/api/v3/EqsToolsUploadAnalyzeFiles", EqsToolsUploadAnalyzeFiles);
};

module.exports = { EqsToolsUploadEndPoints };
