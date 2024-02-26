const taskManagerReadExcel = require("../routes/readExcel");
const taskManagerGetEquipments = require("../routes/getEquipments");
const taskManagerHandleReports = require("../routes/handleReport");
const taskManagerGetReports = require("../routes/getReports");
const taskManagerHandleTasks = require("../routes/handleTasks");

const taskManagerEndPoints = (app) => {
  app.use("/api/v1/taskManagerReadExcel", taskManagerReadExcel);
  app.use("/api/v1/taskManagerGetEquipments", taskManagerGetEquipments);
  app.use("/api/v1/taskManagerHandleReports", taskManagerHandleReports);
  app.use("/api/v1/taskManagerGetReports", taskManagerGetReports);
  app.use("/api/v1/taskManagerHandleTasks", taskManagerHandleTasks);
};

module.exports = { taskManagerEndPoints };
