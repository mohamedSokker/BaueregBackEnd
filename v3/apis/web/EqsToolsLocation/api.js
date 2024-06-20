const EqsToolsLocGetFiles = require("../../../routes/web/EqsToolsLocation/getFiles");

const EqsToolsLocEndPoints = (app) => {
  app.use("/api/v3/EqsToolsLocGetFiles", EqsToolsLocGetFiles);
};

module.exports = { EqsToolsLocEndPoints };
