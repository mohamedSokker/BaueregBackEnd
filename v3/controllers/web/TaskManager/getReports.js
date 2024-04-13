// const { getData } = require("../../../helpers/getData");
const { getAllData } = require("../../../services/mainService");

const getReports = async (req, res) => {
  try {
    // const query = `SELECT * FROM TaskManagerReports`;
    // const data = (await getData(query)).recordsets[0];
    const data = await getAllData("TaskManagerReports");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getReports };
