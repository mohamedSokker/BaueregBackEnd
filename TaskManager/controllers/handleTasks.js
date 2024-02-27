const { getData } = require("../../functions/getData");

const handleTasks = async (req, res) => {
  try {
    const bodydata = req.body;
    let query = ``;
    for (let i = 0; i < bodydata.length; i++) {
      bodydata[i]?.checked !== undefined &&
        !bodydata[i]?.checked &&
        (query += `INSERT INTO TaskManagerTasks (
        DateTime, 
        Category,
        Equipment_Type,
        Equipment_Model,
        Equipment,
        Title,
        Description,
        Status,
        ReportID) VALUES (
            GETDATE(),
            'Inspected',
            '${bodydata[i].eqType}',
            '${bodydata[i].eqModel}',
            '${bodydata[i].eq}',
            '${bodydata[i].title}',
            '${bodydata[i].desc} ${
          bodydata[i].remarks ? `(${bodydata[i].remarks})` : ""
        }',
            'false',
            '${bodydata[i].reportID}'
        )`);
    }
    if (query !== ``) {
      query += ` UPDATE TaskManagerReports SET Status = 'true' WHERE ID = '${bodydata[0].reportID}'`;
      await getData(query);
    } else {
      throw new Error(`No Tasks Found`);
    }
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleTasks };
