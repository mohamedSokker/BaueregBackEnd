const dataEntryGetActiveSites = require("../../../routes/web/DataEntry/getActiveSites");
const dataEntryGetActiveMachinary = require("../../../routes/web/DataEntry/getActiveMachinary");
const dataEntryGetBreakdowns = require("../../../routes/web/DataEntry/getBreakdowns");
const dataEntryGetUserSites = require("../../../routes/web/DataEntry/getUsers");
const dataEntryReadExcel = require("../../../routes/web/DataEntry/readExcel");
const dataEntryHandleAvCalc = require("../../../routes/web/DataEntry/Maintenance/handleAvCalc");
const dataEntryHandleAvPlan = require("../../../routes/web/DataEntry/Availability_Plan/handleAvPlan");
const dataEntryHandleAddEqLocation = require("../../../routes/web/DataEntry/EquipmentsLocation/handleAddEqLocation");
const dataEntryHandleEditEqLocation = require("../../../routes/web/DataEntry/EquipmentsLocation/handleEditEqLocation");
const dataEntryHandleAddMachLocation = require("../../../routes/web/DataEntry/MachinaryLocation/handleAddMachinaryLocation");
const dataEntryHandleEditMachLocation = require("../../../routes/web/DataEntry/MachinaryLocation/handleEditMachinaryLocation");

const dataEntryEndPoints = (app) => {
  app.use("/api/v1/getActiveData", dataEntryGetActiveSites);
  app.use("/api/v1/getActiveMachinary", dataEntryGetActiveMachinary);
  app.use("/api/v1/getBreakdowns", dataEntryGetBreakdowns);
  app.use("/api/v1/getUserSites", dataEntryGetUserSites);
  app.use("/readExcel", dataEntryReadExcel);
  app.use("/api/v3/dataEntryHandleAvCalc", dataEntryHandleAvCalc);
  app.use("/api/v3/dataEntryHandleAvPlan", dataEntryHandleAvPlan);
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
};

module.exports = { dataEntryEndPoints };
