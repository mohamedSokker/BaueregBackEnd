const dashboard = require("../../../routes/web/Dashboard/allData");

const dashboardApi = (app) => {
  app.use("/api/v1/dashboard", dashboard);
};

module.exports = { dashboardApi };
