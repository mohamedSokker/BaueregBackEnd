// const { getData } = require("../../../helpers/getData");
const { getAllData } = require("../../../services/mainService");

const getEquipments = async (req, res) => {
  try {
    // const query = `SELECT Equipment_Type, Equipment_Model, Equipment FROM Bauer_Equipments`;
    // const data = (await getData(query)).recordsets[0];
    const data = await getAllData("Bauer_Equipments");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getEquipments };
