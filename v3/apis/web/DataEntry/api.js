const dataEntryGetActiveSites = require("../../../routes/web/DataEntry/getActiveSites");
const dataEntryGetBreakdowns = require("../../../routes/web/DataEntry/getBreakdowns");
const dataEntryGetUserSites = require("../../../routes/web/DataEntry/getUsers");
const dataEntryReadExcel = require("../../../routes/web/DataEntry/readExcel");
const dataEntryHandleAvCalc = require("../../../routes/web/DataEntry/Maintenance/handleAvCalc");
const dataEntryHandleAvPlan = require("../../../routes/web/DataEntry/Availability_Plan/handleAvPlan");

const dataEntryEndPoints = (app) => {
  app.use("/api/v1/getActiveData", dataEntryGetActiveSites);
  app.use("/api/v1/getBreakdowns", dataEntryGetBreakdowns);
  app.use("/api/v1/getUserSites", dataEntryGetUserSites);
  app.use("/readExcel", dataEntryReadExcel);
  app.use("/api/v3/dataEntryHandleAvCalc", dataEntryHandleAvCalc);
  app.use("/api/v3/dataEntryHandleAvPlan", dataEntryHandleAvPlan);
};

module.exports = { dataEntryEndPoints };
