const taskManagerReadExcel = require("../routes/readExcel");

const taskManagerEndPoints = (app) => {
  app.use("/api/v1/taskManagerReadExcel", taskManagerReadExcel);
};

module.exports = { taskManagerEndPoints };
