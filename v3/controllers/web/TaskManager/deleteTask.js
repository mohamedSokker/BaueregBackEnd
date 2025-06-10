// const { getData } = require("../../../helpers/getData");
const { deleteData } = require("../../../services/mainService");

const deleteTask = async (req, res) => {
  try {
    const { ID } = req.body;
    const data = await deleteData(ID, "TaskManagerTasks");
    // const query = `DELETE FROM TaskManagerTasks WHERE ID = '${ID}'`;
    // const data = await getData(query);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { deleteTask };
