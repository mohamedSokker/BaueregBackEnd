const { getData } = require("../../functions/getData");

const getActiveSites = async (req, res) => {
  try {
    const query = `SELECT *
    FROM Equipments_Location 
    WHERE End_Date IS NULL`;
    const eqsTransQuery = `SELECT * FROM EquipmentsTransport`;
    const result = await getData(`${query} ${eqsTransQuery}`);
    return res
      .status(200)
      .json({ eqsLoc: result.recordsets[0], eqsTrans: result.recordsets[1] });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getActiveSites };
