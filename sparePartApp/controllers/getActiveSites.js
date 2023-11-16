const { getData } = require("../../functions/getData");

const getActiveSites = async (req, res) => {
  try {
    const query = `SELECT DISTINCT Location FROM Equipments_Location WHERE End_Date IS NULL`;
    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getActiveSites };
