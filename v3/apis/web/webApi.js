const { authEndPoints } = require("./login&auth/api");
const { taskManagerEndPoints } = require("./TaskManager/api");
const { transportationsEndPoints } = require("./Transportation/api");
const { dashboardApi } = require("./Dashboard/api");
const { dataEntryEndPoints } = require("./DataEntry/api");
const { bReportEndPoints } = require("./BReport/api");
const { orderIncompleteEndPoints } = require("./OrdersAnalysis/api");
const { oilSamplesEndPoints } = require("./OilSamples/api");
const { oilSamplesAnalyzedEndPoints } = require("./OilSamplesAnalyzed/api");
const { CataloguesEndPoints } = require("./Catalogues/api");
const { EqsToolsLocEndPoints } = require("./EqsToolsLocation/api");
const { EqsToolsUploadEndPoints } = require("./EqsToolsUpload.js/api");
const { CustomDataEntryEndPoints } = require("./CustomDataEntry/api");
const { AIEndPoints } = require("./AI(RAG)/api");
const { homeEndPoints } = require("./Home/api");

const webApi = (app) => {
  authEndPoints(app);
  taskManagerEndPoints(app);
  transportationsEndPoints(app);
  dashboardApi(app);
  dataEntryEndPoints(app);
  bReportEndPoints(app);
  orderIncompleteEndPoints(app);
  oilSamplesEndPoints(app);
  oilSamplesAnalyzedEndPoints(app);
  CataloguesEndPoints(app);
  EqsToolsLocEndPoints(app);
  EqsToolsUploadEndPoints(app);
  CustomDataEntryEndPoints(app);
  AIEndPoints(app);
  homeEndPoints(app);
};

module.exports = { webApi };
