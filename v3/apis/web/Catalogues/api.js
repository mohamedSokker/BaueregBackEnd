const CataloguesCreateFolder = require("../../../routes/web/Catalogues/createFolder");
const CataloguesGetFiles = require("../../../routes/web/Catalogues/getFiles");
const CataloguesDeleteFiles = require("../../../routes/web/Catalogues/deleteFiles");
const CataloguesRenameFiles = require("../../../routes/web/Catalogues/rename");
const CataloguesUploadFiles = require("../../../routes/web/Catalogues/uploadFiles");
const CataloguesSearchFiles = require("../../../routes/web/Catalogues/searchFIles");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 * 1024 },
});

const CataloguesEndPoints = (app) => {
  app.use("/api/v3/CataloguesCreateFolder", CataloguesCreateFolder);
  app.use("/api/v3/CataloguesGetFiles", CataloguesGetFiles);
  app.use("/api/v3/CataloguesDeleteFiles", CataloguesDeleteFiles);
  app.use("/api/v3/CataloguesRenameFiles", CataloguesRenameFiles);
  app.use(
    "/api/v3/CataloguesUploadFiles",
    upload.single("files"),
    CataloguesUploadFiles
  );
  app.use("/api/v3/CataloguesSearchFiles", CataloguesSearchFiles);
};

module.exports = { CataloguesEndPoints };
