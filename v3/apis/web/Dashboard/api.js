const dashboard = require("../../../routes/web/Dashboard/allData");
const maintenance = require("../../../routes/web/Dashboard/maintenance");
const availability = require("../../../routes/web/Dashboard/availability");
const maintenanceStocks = require("../../../routes/web/Dashboard/maintenanceStocks");
const fuelCons = require("../../../routes/web/Dashboard/fuelCons");
const oilCons = require("../../../routes/web/Dashboard/oilCons");
const prodDrill = require("../../../routes/web/Dashboard/prodDrill");
const prodTrench = require("../../../routes/web/Dashboard/prodTrench");

const dashboardApi = (app) => {
  app.use("/api/v1/dashboard", dashboard);
  app.use("/api/v1/maintenance", maintenance);
  app.use("/api/v1/availability", availability);
  app.use("/api/v1/maintenanceStocks", maintenanceStocks);
  app.use("/api/v1/fuelCons", fuelCons);
  app.use("/api/v1/oilCons", oilCons);
  app.use("/api/v1/prodDrill", prodDrill);
  app.use("/api/v1/prodTrench", prodTrench);
};

module.exports = { dashboardApi };
