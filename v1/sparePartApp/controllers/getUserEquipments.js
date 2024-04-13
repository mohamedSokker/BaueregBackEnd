const { getData } = require("../../../v3/helpers/getData");

const getUserEquipments = async (req, res) => {
  try {
    const bodyData = req.body;
    const query = `SELECT ID, Equipment FROM Equipments_Location WHERE
      End_Date IS NULL AND Location = '${bodyData?.site}'`;
    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserEquipments };
