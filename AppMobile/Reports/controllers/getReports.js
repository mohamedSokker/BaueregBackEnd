const { getData } = require("../../../functions/getData");

const getReports = async (req, res) => {
  const bodyData = req.body;
  const query = `SELECT * FROM AppMaintMaintenance WHERE Location = '${bodyData.Location}'`;
  try {
    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getReports };
