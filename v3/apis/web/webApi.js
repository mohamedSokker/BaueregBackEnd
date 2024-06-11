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
};

module.exports = { webApi };
