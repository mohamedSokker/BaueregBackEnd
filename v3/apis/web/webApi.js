const { authEndPoints } = require("../web/login&auth/api");
const { taskManagerEndPoints } = require("../web/TaskManager/api");
const { transportationsEndPoints } = require("../web/Transportation/api");
const { dashboardApi } = require("../web/Dashboard/api");
const { dataEntryEndPoints } = require("../web/DataEntry/api");
const { bReportEndPoints } = require("../web/BReport/api");

const webApi = (app) => {
  authEndPoints(app);
  taskManagerEndPoints(app);
  transportationsEndPoints(app);
  dashboardApi(app);
  dataEntryEndPoints(app);
  bReportEndPoints(app);
};

module.exports = { webApi };
