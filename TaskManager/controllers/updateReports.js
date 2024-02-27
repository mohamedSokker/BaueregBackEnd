const { getData } = require("../../functions/getData");

const updateReports = async (req, res) => {
  try {
    const bodyData = req.body;
    let query = `UPDATE TaskManagerReports SET `;
    const keys = Object.keys(bodyData);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== "ID") {
        query += `${keys[i]} = '${bodyData[keys[i]]}',`;
      }
    }
    query = query.slice(0, -1);
    query += ` WHERE ID = '${bodyData.ID}'`;
    const data = await getData(query);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { updateReports };
