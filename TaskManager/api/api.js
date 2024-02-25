const taskManagerReadExcel = require("../routes/readExcel");
const taskManagerGetEquipments = require("../routes/getEquipments");
const taskManagerHandleReports = require("../routes/handleReport");

const taskManagerEndPoints = (app) => {
  app.use("/api/v1/taskManagerReadExcel", taskManagerReadExcel);
  app.use("/api/v1/taskManagerGetEquipments", taskManagerGetEquipments);
  app.use("/api/v1/taskManagerHandleReports", taskManagerHandleReports);
};

module.exports = { taskManagerEndPoints };
