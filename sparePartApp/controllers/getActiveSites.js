const { getData } = require("../../functions/getData");

const getActiveSites = async (req, res) => {
  try {
    const query = `SELECT DISTINCT 
    Equipments_Location.Location, 
    Location_Bauer.Location_Ar
    FROM Equipments_Location 
    JOIN Location_Bauer
    ON (Equipments_Location.Location = Location_Bauer.Location)
    WHERE Equipments_Location.End_Date IS NULL`;
    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getActiveSites };
