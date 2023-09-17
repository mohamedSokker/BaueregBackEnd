const { getData } = require("../../../functions/getData");

const getEquipments = async (req, res) => {
  const bodyData = req.body;
  const query = `SELECT * FROM Equipments_Location WHERE Location = '${bodyData.Location}' 
                    AND End_Date IS NULL AND Equipment_Type = '${bodyData.Equipment_Type}'`;
  try {
    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getEquipments };
