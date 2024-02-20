const createFolder = require("../../OrdersFile/routes/OrdersCreateFolder"); // need query (fullpath)
const renameFolder = require("../../OrdersFile/routes/OrdersRenameFolder"); // need query (oldpath, newpath)
const deleteFolder = require("../../OrdersFile/routes/OrdersDeleteFolder"); // need query (oldpath)
const uploadItems = require("../../OrdersFile/routes/OrdersUploadFolder"); // need query (url)
const getFiles = require("../../OrdersFile/routes/OrderGetFiles"); // need query (fullpath)
const orderCheck = require("../../OrdersFile/routes/OrderCheck"); // need query (path)

const ordersFilesEndPoints = (app) => {
  app.use("/AppCreateFolder", createFolder);

  app.use("/AppRenameFolder", renameFolder);

  app.use("/AppDeleteFolder", deleteFolder);

  app.use("/AppUploadItems", uploadItems);

  app.use("/AppGetFiles", getFiles);

  app.use("/AppCheck", orderCheck);
};

module.exports = { ordersFilesEndPoints };
