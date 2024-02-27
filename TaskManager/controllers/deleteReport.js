const { getData } = require("../../functions/getData");

const deleteReport = async (req, res) => {
  try {
    const { ID } = req.body;
    const query = `DELETE FROM TaskManagerReports WHERE ID = '${ID}'`;
    const data = await getData(query);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { deleteReport };
