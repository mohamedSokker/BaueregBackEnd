// const { getData } = require("../../../helpers/getData");
const { updateData } = require("../../../services/mainService");
const {
  TaskManagerTasksSchema,
} = require("../../../schemas/TaskManagerTasks/schema");
const {
  TaskManagerReportsSchema,
} = require("../../../schemas/TaskManagerReports/schema");

const updateTasks = async (req, res) => {
  try {
    const bodyData = req.body.data;
    // let query = `UPDATE TaskManagerTasks SET `;
    // const keys = Object.keys(bodyData);
    // for (let i = 0; i < keys.length; i++) {
    //   if (bodyData[keys[i]] === null) {
    //     query += `${keys[i]} = NULL ,`;
    //   } else if (bodyData[keys[i]] === "Date.Now") {
    //     query += `${keys[i]} = GETDATE() ,`;
    //   } else if (keys[i] !== "ID") {
    //     query += `${keys[i]} = '${bodyData[keys[i]]}',`;
    //   }
    // }
    // query = query.slice(0, -1);
    // query += ` WHERE ID = '${bodyData.ID}'`;
    const data = await updateData(
      bodyData,
      bodyData.ID,
      "TaskManagerTasks",
      TaskManagerTasksSchema
    );
    if (req.body?.flags?.updateReport) {
      await updateData(
        { Status: "Waiting Inspection" },
        req.body.flags.reportID,
        "TaskManagerReports",
        TaskManagerReportsSchema
      );
      await updateData(
        { IsReady: "true" },
        req.body.flags.reportID,
        "TaskManagerTasks",
        TaskManagerTasksSchema
      );
      // query += ` UPDATE TaskManagerReports SET Status = 'Waiting Inspection' WHERE ID = '${req.body.flags.reportID}'`;
      // query += ` UPDATE TaskManagerTasks SET IsReady = 'true' WHERE ReportID = '${req.body.flags.reportID}'`;
    }
    // console.log(query);
    // const data = await getData(query);

    // const tasksQuery = `SELECT * FROM TaskManagerTasks WHERE ReportID = '${bodyData.reportID}'`;
    // const tasksData = (await getData(tasksQuery)).recordsets[0];
    // const tasksUnFinished = tasksData.filter(
    //   (task) => task.Category !== "Waiting Inspection"
    // );
    // if (tasksUnFinished.length === 0) {
    //   const reportQuery = `UPDATE TaskManagerReports SET Status = 'true' WHERE ID = '${bodyData.reportID}'`;
    //   await getData(reportQuery);
    // }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { updateTasks };
