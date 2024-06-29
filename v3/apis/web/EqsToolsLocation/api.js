const EqsToolsLocGetFiles = require("../../../routes/web/EqsToolsLocation/getFiles");
const EqsToolsLocHandleAdd = require("../../../routes/web/EqsToolsLocation/handleAdd");
const EqsToolsLocHandleEdit = require("../../../routes/web/EqsToolsLocation/handleEdit");
const EqsToolsLocHandleDelete = require("../../../routes/web/EqsToolsLocation/handleDelete");

const EqsToolsLocEndPoints = (app) => {
  app.use("/api/v3/EqsToolsLocGetFiles", EqsToolsLocGetFiles);
  app.use("/api/v3/EqsToolsLocHandleAdd", EqsToolsLocHandleAdd);
  app.use("/api/v3/EqsToolsLocHandleEdit", EqsToolsLocHandleEdit);
  app.use("/api/v3/EqsToolsLocHandleDelete", EqsToolsLocHandleDelete);
};

module.exports = { EqsToolsLocEndPoints };
