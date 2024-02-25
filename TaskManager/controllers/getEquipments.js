const { getData } = require("../../functions/getData");

const getEquipments = async (req, res) => {
  try {
    const query = `SELECT Equipment_Type, Equipment_Model, Equipment FROM Bauer_Equipments`;
    const data = (await getData(query)).recordsets[0];
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getEquipments };
