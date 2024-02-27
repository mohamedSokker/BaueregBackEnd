const { getData } = require("../../functions/getData");

const getTasks = async (req, res) => {
  try {
    const query = `SELECT * FROM TaskManagerTasks`;
    const data = (await getData(query)).recordsets[0];
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getTasks };
