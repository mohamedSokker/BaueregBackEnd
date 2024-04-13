const { cache } = require("../../Constants/constants");
const { authapp } = require("../../Constants/constants");

const dashboardAvLogic = require("../Availability/routes/logic");
const dashboardFuelLogic = require("../FuelConsumption/routes/logic");
const dashboardOilLogic = require("../OilConsumption/routes/logic");
const dashboardBreakdownLogic = require("../Breakdowns/routes/logic");
const dashboardPerMaintLogic = require("../PerMaint/routes/logic");
const dashboardProductionLogic = require("../Production/routes/logic");
const messages = require("../../AppMobile/getProblems/routes/getProblems");

const dashboardEndPoints = (app) => {
  app.use(
    "/api/v1/dashboardAv",
    authapp("Dashboard"),
    cache(`DB Dashboard Availability`),
    dashboardAvLogic
  );
  app.use(
    "/api/v1/dashboardFuel",
    authapp("Dashboard"),
    cache(`DB Dashboard Fuel`),
    dashboardFuelLogic
  );
  app.use(
    "/api/v1/dashboardOil",
    authapp("Dashboard"),
    cache(`DB Dashboard Oil`),
    dashboardOilLogic
  );
  app.use(
    "/api/v1/dashboardBreakdown",
    authapp("Dashboard"),
    cache(`DB Dashboard Breakdown`),
    dashboardBreakdownLogic
  );
  app.use(
    "/api/v1/dashboardPerMaint",
    authapp("Dashboard"),
    cache(`DB Dashboard PerMaint`),
    dashboardPerMaintLogic
  );
  app.use(
    "/api/v1/dashboardProduction",
    authapp("Dashboard"),
    cache(`DB Dashboard Production`),
    dashboardProductionLogic
  );
  app.use("/api/v1/getMessages", authapp("Dashboard"), messages);
};

module.exports = { dashboardEndPoints };
