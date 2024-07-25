const dataEntryGetActiveSites = require("../../../routes/web/DataEntry/getActiveSites");
const dataEntryGetActiveMachinary = require("../../../routes/web/DataEntry/getActiveMachinary");
const dataEntryGetActiveInvoice = require("../../../routes/web/DataEntry/getActiveInvoice");
const dataEntryGetActiveTools = require("../../../routes/web/DataEntry/getActiveTools");
const dataEntryGetBreakdowns = require("../../../routes/web/DataEntry/getBreakdowns");
const dataEntryGetUserSites = require("../../../routes/web/DataEntry/getUsers");
const dataEntryReadExcel = require("../../../routes/web/DataEntry/readExcel");
const dataEntryHandleAvCalc = require("../../../routes/web/DataEntry/Maintenance/handleAvCalc");
const dataEntryHandleAvPlan = require("../../../routes/web/DataEntry/Availability_Plan/handleAvPlan");
const dataEntryHandleReceivedInvoice = require("../../../routes/web/DataEntry/Received_Invoice/handleAddReceivedInvoice");
const dataEntryHandleAddEqLocation = require("../../../routes/web/DataEntry/EquipmentsLocation/handleAddEqLocation");
const dataEntryHandleEditEqLocation = require("../../../routes/web/DataEntry/EquipmentsLocation/handleEditEqLocation");
const dataEntryHandleAddMachLocation = require("../../../routes/web/DataEntry/MachinaryLocation/handleAddMachinaryLocation");
const dataEntryHandleEditMachLocation = require("../../../routes/web/DataEntry/MachinaryLocation/handleEditMachinaryLocation");

const orderConfirmationGetFiles = require("../../../routes/web/DataEntry/Orders/OrderConfirmation/getFiles");
const orderConfirmationUploadFiles = require("../../../routes/web/DataEntry/Orders/OrderConfirmation/uploadFiles");
const orderConfirmationSearchFiles = require("../../../routes/web/DataEntry/Orders/OrderConfirmation/searchFiles");
const orderConfirmationDeleteFiles = require("../../../routes/web/DataEntry/Orders/OrderConfirmation/deleteFiles");
const orderConfirmationRenameFiles = require("../../../routes/web/DataEntry/Orders/OrderConfirmation/rename");
const orderConfirmationCreateFolder = require("../../../routes/web/DataEntry/Orders/OrderConfirmation/createFolder");
const orderConfirmationAnalyze = require("../../../routes/web/DataEntry/Orders/OrderConfirmation/analyze");
const orderConfirmationAddOrder = require("../../../routes/web/DataEntry/Orders/OrderConfirmation/addOrder");

const orderNoGetFiles = require("../../../routes/web/DataEntry/Orders/OrderNo/getFiles");
const orderNoUploadFiles = require("../../../routes/web/DataEntry/Orders/OrderNo/uploadFiles");
const orderNoSearchFiles = require("../../../routes/web/DataEntry/Orders/OrderNo/searchFiles");
const orderNoDeleteFiles = require("../../../routes/web/DataEntry/Orders/OrderNo/deleteFiles");
const orderNoRenameFiles = require("../../../routes/web/DataEntry/Orders/OrderNo/rename");
const orderNoCreateFolder = require("../../../routes/web/DataEntry/Orders/OrderNo/createFolder");
const orderNoAnalyze = require("../../../routes/web/DataEntry/Orders/OrderNo/analyze");
const orderNoAddOrder = require("../../../routes/web/DataEntry/Orders/OrderNo/addOrder");

const orderQuotationGetFiles = require("../../../routes/web/DataEntry/Orders/OrderQuotation/getFiles");
const orderQuotationUploadFiles = require("../../../routes/web/DataEntry/Orders/OrderQuotation/uploadFiles");
const orderQuotationSearchFiles = require("../../../routes/web/DataEntry/Orders/OrderQuotation/searchFiles");
const orderQuotationDeleteFiles = require("../../../routes/web/DataEntry/Orders/OrderQuotation/deleteFiles");
const orderQuotationRenameFiles = require("../../../routes/web/DataEntry/Orders/OrderQuotation/rename");
const orderQuotationCreateFolder = require("../../../routes/web/DataEntry/Orders/OrderQuotation/createFolder");
const orderQuotationAnalyze = require("../../../routes/web/DataEntry/Orders/OrderQuotation/analyze");
const orderQuotationAddOrder = require("../../../routes/web/DataEntry/Orders/OrderQuotation/addOrder");

const orderInvoiceGetFiles = require("../../../routes/web/DataEntry/Orders/OrderInvoice/getFiles");
const orderInvoiceUploadFiles = require("../../../routes/web/DataEntry/Orders/OrderInvoice/uploadFiles");
const orderInvoiceSearchFiles = require("../../../routes/web/DataEntry/Orders/OrderInvoice/searchFiles");
const orderInvoiceDeleteFiles = require("../../../routes/web/DataEntry/Orders/OrderInvoice/deleteFiles");
const orderInvoiceRenameFiles = require("../../../routes/web/DataEntry/Orders/OrderInvoice/rename");
const orderInvoiceCreateFolder = require("../../../routes/web/DataEntry/Orders/OrderInvoice/createFolder");
const orderInvoiceAnalyze = require("../../../routes/web/DataEntry/Orders/OrderInvoice/analyze");
const orderInvoiceAddOrder = require("../../../routes/web/DataEntry/Orders/OrderInvoice/addOrder");

const dataEntryEndPoints = (app) => {
  app.use("/api/v1/getActiveData", dataEntryGetActiveSites);
  app.use("/api/v1/getActiveMachinary", dataEntryGetActiveMachinary);
  app.use("/api/v1/getActiveInvoice", dataEntryGetActiveInvoice);
  app.use("/api/v1/getActiveTools", dataEntryGetActiveTools);
  app.use("/api/v1/getBreakdowns", dataEntryGetBreakdowns);
  app.use("/api/v1/getUserSites", dataEntryGetUserSites);
  app.use("/readExcel", dataEntryReadExcel);
  app.use("/api/v3/dataEntryHandleAvCalc", dataEntryHandleAvCalc);
  app.use("/api/v3/dataEntryHandleAvPlan", dataEntryHandleAvPlan);
  app.use(
    "/api/v3/dataEntryHandleReceivedInvoice",
    dataEntryHandleReceivedInvoice
  );
  app.use("/api/v3/dataEntryHandleAddEqLocation", dataEntryHandleAddEqLocation);
  app.use(
    "/api/v3/dataEntryHandleEditEqLocation",
    dataEntryHandleEditEqLocation
  );
  app.use(
    "/api/v3/dataEntryHandleAddMachLocation",
    dataEntryHandleAddMachLocation
  );
  app.use(
    "/api/v3/dataEntryHandleEditMachLocation",
    dataEntryHandleEditMachLocation
  );

  app.use("/api/v3/dataEntryOrderNoGetFiles", orderNoGetFiles);
  app.use("/api/v3/dataEntryOrderNoDeleteFiles", orderNoDeleteFiles);
  app.use("/api/v3/dataEntryOrderNoRenameFiles", orderNoRenameFiles);
  app.use("/api/v3/dataEntryOrderNoUploadFiles", orderNoUploadFiles);
  app.use("/api/v3/dataEntryOrderNoSearchFiles", orderNoSearchFiles);
  app.use("/api/v3/dataEntryOrderNoCreateFolder", orderNoCreateFolder);
  app.use("/api/v3/dataEntryOrderNoAnalyze", orderNoAnalyze);
  app.use("/api/v3/dataEntryOrderNoAddOrder", orderNoAddOrder);

  app.use("/api/v3/dataEntryOrderQuotationFiles", orderQuotationGetFiles);
  app.use(
    "/api/v3/dataEntryOrderQuotationDeleteFiles",
    orderQuotationDeleteFiles
  );
  app.use(
    "/api/v3/dataEntryOrderQuotationRenameFiles",
    orderQuotationRenameFiles
  );
  app.use(
    "/api/v3/dataEntryOrderQuotationUploadFiles",
    orderQuotationUploadFiles
  );
  app.use(
    "/api/v3/dataEntryOrderQuotationSearchFiles",
    orderQuotationSearchFiles
  );
  app.use(
    "/api/v3/dataEntryOrderQuotationCreateFolder",
    orderQuotationCreateFolder
  );
  app.use("/api/v3/dataEntryOrderQuotationAnalyze", orderQuotationAnalyze);
  app.use("/api/v3/dataEntryOrderQuotationAddOrder", orderQuotationAddOrder);

  app.use("/api/v3/dataEntryOrderConfirmationFiles", orderConfirmationGetFiles);
  app.use(
    "/api/v3/dataEntryOrderConfirmationDeleteFiles",
    orderConfirmationDeleteFiles
  );
  app.use(
    "/api/v3/dataEntryOrderConfirmationRenameFiles",
    orderConfirmationRenameFiles
  );
  app.use(
    "/api/v3/dataEntryOrderConfirmationUploadFiles",
    orderConfirmationUploadFiles
  );
  app.use(
    "/api/v3/dataEntryOrderConfirmationSearchFiles",
    orderConfirmationSearchFiles
  );
  app.use(
    "/api/v3/dataEntryOrderConfirmationCreateFolder",
    orderConfirmationCreateFolder
  );
  app.use(
    "/api/v3/dataEntryOrderConfirmationAnalyze",
    orderConfirmationAnalyze
  );
  app.use(
    "/api/v3/dataEntryOrderConfirmationAddOrder",
    orderConfirmationAddOrder
  );

  app.use("/api/v3/dataEntryOrderInvoiceFiles", orderInvoiceGetFiles);
  app.use("/api/v3/dataEntryOrderInvoiceDeleteFiles", orderInvoiceDeleteFiles);
  app.use("/api/v3/dataEntryOrderInvoiceRenameFiles", orderInvoiceRenameFiles);
  app.use("/api/v3/dataEntryOrderInvoiceUploadFiles", orderInvoiceUploadFiles);
  app.use("/api/v3/dataEntryOrderInvoiceSearchFiles", orderInvoiceSearchFiles);
  app.use(
    "/api/v3/dataEntryOrderInvoiceCreateFolder",
    orderInvoiceCreateFolder
  );
  app.use("/api/v3/dataEntryOrderInvoiceAnalyze", orderInvoiceAnalyze);
  app.use("/api/v3/dataEntryOrderInvoiceAddOrder", orderInvoiceAddOrder);
};

module.exports = { dataEntryEndPoints };
