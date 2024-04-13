const { authapp } = require("../../auth/controllers/auth");
const { cache } = require("../../../v3/data/routeCache");

const eqAvLogic = require("../../Equipments/Availability/routes/logic");
const eqFuelLogic = require("../../Equipments/FuelConsumption/routes/logic");
const eqOilLogic = require("../../Equipments/OilConsumption/routes/logic");
const eqBreakdownLogic = require("../../Equipments/Breakdowns/routes/logic");
const eqPerMaintLogic = require("../../Equipments/PerMaint/routes/logic");
const eqProductionLogic = require("../../Equipments/Production/routes/logic");

const equipmentsEndPoints = (app) => {
  app.use(
    "/api/v1/eqAv",
    authapp("Equipments"),
    cache(`DB Equipments Availability`),
    eqAvLogic
  );
  app.use(
    "/api/v1/eqFuel",
    authapp("Equipments"),
    cache(`DB Equipments Fuel`),
    eqFuelLogic
  );
  app.use(
    "/api/v1/eqOil",
    authapp("Equipments"),
    cache(`DB Equipments Oil`),
    eqOilLogic
  );
  app.use(
    "/api/v1/eqBreakdown",
    authapp("Equipments"),
    cache(`DB Equipments Breakdowns`),
    eqBreakdownLogic
  );
  app.use(
    "/api/v1/eqPerMaint",
    authapp("Equipments"),
    cache(`DB Equipments PerMaint`),
    eqPerMaintLogic
  );
  app.use(
    "/api/v1/eqProduction",
    authapp("Equipments"),
    cache(`DB Equipments Production`),
    eqProductionLogic
  );
};

module.exports = { equipmentsEndPoints };
