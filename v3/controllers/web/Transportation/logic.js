// const { getData } = require("../../../v3/helpers/getData");
const { getAllData } = require("../../../services/mainService");

const getActiveSites = async (req, res) => {
  try {
    // const query = `SELECT *
    // FROM Equipments_Location
    // WHERE End_Date IS NULL`;
    // const eqsTransQuery = `SELECT * FROM EquipmentsTransport`;
    // const result = await getData(`${query} ${eqsTransQuery}`);
    const eqsLoc = await getAllData("Equipments_Location");
    const eqsTrans = await getAllData("EquipmentsTransport");
    return res.status(200).json({ eqsLoc: eqsLoc, eqsTrans: eqsTrans });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getActiveSites };
