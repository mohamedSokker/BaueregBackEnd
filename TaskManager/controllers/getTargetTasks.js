const { getData } = require("../../functions/getData");

const getTargetTasks = async (req, res) => {
  try {
    const { reportID } = req.body;
    const query = `SELECT * FROM TaskManagerTasks WHERE ReportID = '${reportID}'`;
    const data = (await getData(query)).recordsets[0];
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getTargetTasks };
