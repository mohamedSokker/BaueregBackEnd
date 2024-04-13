// const { getData } = require("../../../helpers/getData");
const { addMany } = require("../../../services/mainService");
const {
  TaskManagerTasksSchema,
} = require("../../../schemas/TaskManagerTasks/schema");

const handleTasks = async (req, res) => {
  try {
    const bodydata = req.body;
    let body = [];
    // let query = ``;
    for (let i = 0; i < bodydata.length; i++) {
      bodydata[i]?.checked !== undefined &&
        !bodydata[i]?.checked &&
        body.push({
          DateTime: "Date.Now",
          Category: "Inspected",
          Equipment_Type: bodydata[i].eqType,
          Equipment_Model: bodydata[i].eqModel,
          Equipment: bodydata[i].eq,
          Title: bodydata[i].title,
          Description: bodydata[i]?.remarks
            ? `${bodydata[i].desc} ${bodydata[i].remarks}`
            : bodydata[i].desc,
          Status: "false",
          IsReady: "false",
          ReportID: bodydata[i].reportID,
        });
      // bodydata[i]?.checked !== undefined &&
      //   !bodydata[i]?.checked &&
      //   (query += `INSERT INTO TaskManagerTasks (
      //   DateTime,
      //   Category,
      //   Equipment_Type,
      //   Equipment_Model,
      //   Equipment,
      //   Title,
      //   Description,
      //   Status,
      //   IsReady,
      //   ReportID) VALUES (
      //       GETDATE(),
      //       'Inspected',
      //       '${bodydata[i].eqType}',
      //       '${bodydata[i].eqModel}',
      //       '${bodydata[i].eq}',
      //       '${bodydata[i].title}',
      //       '${bodydata[i].desc} ${
      //     bodydata[i].remarks ? `(${bodydata[i].remarks})` : ""
      //   }',
      //       'false',
      //       'false',
      //       '${bodydata[i].reportID}'
      //   )`);
    }
    if (body.length > 0) {
      // query += ` UPDATE TaskManagerReports SET Status = 'true' WHERE ID = '${bodydata[0].reportID}'`;
      // await getData(query);
      await addMany(body, "TaskManagerTasks", TaskManagerTasksSchema);
    } else {
      throw new Error(`No Tasks Found`);
    }
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleTasks };
