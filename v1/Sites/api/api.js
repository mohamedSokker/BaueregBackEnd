const { authapp } = require("../../auth/controllers/auth");
const { cache } = require("../../../v3/data/routeCache");

const sitesAvLogic = require("../../Sites/Availability/routes/logic");
const sitesFuelLogic = require("../../Sites/FuelConsumption/routes/logic");
const sitesOilLogic = require("../../Sites/OilConsumption/routes/logic");
const sitesBreakdownLogic = require("../../Sites/Breakdowns/routes/logic");
const sitesPerMaintLogic = require("../../Sites/PerMaint/routes/logic");
const sitesMachinaryLogic = require("../../Sites/Machinary/routes/logic");
const sitesEqsLogic = require("../../Sites/Equipments/routes/logic");
const sitesProductionLogic = require("../../Sites/Production/routes/logic");

const sitesEndPoints = (app) => {
  app.use(
    "/api/v1/sitesAv",
    // authapp("Sites"),
    // cache(`DB Sites Availability`),
    sitesAvLogic
  );
  app.use(
    "/api/v1/sitesFuel",
    // authapp("Sites"),
    // cache(`DB Sites Fuel`),
    sitesFuelLogic
  );
  app.use(
    "/api/v1/sitesOil",
    // authapp("Sites"),
    // cache(`DB Sites Oil`),
    sitesOilLogic
  );
  app.use(
    "/api/v1/sitesBreakdown",
    // authapp("Sites"),
    // cache(`DB Sites Breakdown`),
    sitesBreakdownLogic
  );
  app.use(
    "/api/v1/sitesPerMaint",
    // authapp("Sites"),
    // cache(`DB Sites PerMaint`),
    sitesPerMaintLogic
  );
  app.use(
    "/api/v1/sitesMachinary",
    authapp("Sites"),
    cache(`DB Sites Machinary`),
    sitesMachinaryLogic
  );
  app.use(
    "/api/v1/sitesEqs",
    authapp("Sites"),
    cache(`DB Sites sitesEqs`),
    sitesEqsLogic
  );
  app.use(
    "/api/v1/sitesProduction",
    // authapp("Sites"),
    // cache(`DB Sites Production`),
    sitesProductionLogic
  );
};

module.exports = { sitesEndPoints };
