const taskManagerReadExcel = require("../routes/readExcel");
const taskManagerGetEquipments = require("../routes/getEquipments");
const taskManagerHandleReports = require("../routes/handleReport");
const taskManagerGetReports = require("../routes/getReports");
const taskManagerGetTasks = require("../routes/getTasks");
const taskManagerHandleTasks = require("../routes/handleTasks");
const taskManagerUpdateReports = require("../routes/updateReports");
const taskManagerUpdateTasks = require("../routes/updateTasks");
const taskManagerDeleteReport = require("../routes/deleteReport");
const taskManagerDeleteTask = require("../routes/deleteTask");

const taskManagerEndPoints = (app) => {
  app.use("/api/v1/taskManagerReadExcel", taskManagerReadExcel);
  app.use("/api/v1/taskManagerGetEquipments", taskManagerGetEquipments);
  app.use("/api/v1/taskManagerHandleReports", taskManagerHandleReports);
  app.use("/api/v1/taskManagerGetReports", taskManagerGetReports);
  app.use("/api/v1/taskManagerGetTasks", taskManagerGetTasks);
  app.use("/api/v1/taskManagerHandleTasks", taskManagerHandleTasks);
  app.use("/api/v1/taskManagerUpdateReports", taskManagerUpdateReports);
  app.use("/api/v1/taskManagerUpdateTasks", taskManagerUpdateTasks);
  app.use("/api/v1/taskManagerDeleteReport", taskManagerDeleteReport);
  app.use("/api/v1/taskManagerDeleteTask", taskManagerDeleteTask);
};

module.exports = { taskManagerEndPoints };
