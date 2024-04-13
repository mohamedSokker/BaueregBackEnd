const taskManagerReadExcel = require("../../../routes/web/TaskManager/readExcel");
const taskManagerGetEquipments = require("../../../routes/web/TaskManager/getEquipments");
const taskManagerHandleReports = require("../../../routes/web/TaskManager/handleReport");
const taskManagerGetReports = require("../../../routes/web/TaskManager/getReports");
const taskManagerGetTasks = require("../../../routes/web/TaskManager/getTasks");
const taskManagerHandleTasks = require("../../../routes/web/TaskManager/handleTasks");
const taskManagerUpdateReports = require("../../../routes/web/TaskManager/updateReports");
const taskManagerUpdateTasks = require("../../../routes/web/TaskManager/updateTasks");
const taskManagerDeleteReport = require("../../../routes/web/TaskManager/deleteReport");
const taskManagerDeleteTask = require("../../../routes/web/TaskManager/deleteTask");
const taskManagergetTargetTasks = require("../../../routes/web/TaskManager/getTargetTasks");
const taskManagergetUsers = require("../../../routes/web/TaskManager/getUsers");
const taskMagaerGetTaskFiles = require("../../../routes/web/TaskManager/getTaskFiles");
const taskManagerUploadItems = require("../../../routes/web/TaskManager/uploadItems");
const taskManagerDeleteFile = require("../../../routes/web/TaskManager/deleteFile");

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
  app.use("/api/v1/taskManagergetTargetTasks", taskManagergetTargetTasks);
  app.use("/api/v1/taskManagergetUsers", taskManagergetUsers);
  app.use("/api/v1/taskMagaerGetTaskFiles", taskMagaerGetTaskFiles);
  app.use("/api/v1/taskManagerUploadItems", taskManagerUploadItems);
  app.use("/api/v1/taskManagerDeleteFile", taskManagerDeleteFile);
};

module.exports = { taskManagerEndPoints };
