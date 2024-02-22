const avPlanLogic = require("../../Logic/AvailabilityPlan/routes/logic");
const avCalcLogic = require("../../Logic/AvailabilityCalc/routes/logic");
const insertPerMaint = require("../../Logic/PerMaintPlan/routes/logic");

const tablesLogicEndPoints = (app) => {
  app.use("/api/v1/AvPlanLogic", avPlanLogic);
  app.use("/api/v1/avCalcLogic", avCalcLogic);
  app.use("/api/v1/insertPerMaint", insertPerMaint);
};

module.exports = { tablesLogicEndPoints };
