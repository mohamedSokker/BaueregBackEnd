const { getData } = require("../../../../../v3/helpers/getData");

const getActiveSites = async (req, res) => {
  try {
    const fieldsData = req.body;
    const query = `SELECT 
    Equipments_Location.Location,
    Equipments_Location.Equipment_Type,
    Bauer_Equipments.Equipment_Model,
    Equipments_Location.Equipment
    FROM Equipments_Location
    JOIN Bauer_Equipments
    ON (Equipments_Location.Equipment = Bauer_Equipments.Equipment) 
    WHERE Equipments_Location.End_Date IS NULL`;
    const usersQuery = `SELECT Top 1
    Locations FROM Users 
    WHERE UserName = '${fieldsData?.username}'`;
    const result = await getData(`${query} ${usersQuery}`);
    const sitesResult = result?.recordsets[0];
    const usersResult = result.recordsets[1];

    if (!usersResult) throw new Error(`No Users Found`);

    return res.status(200).json({ sitesResult, usersResult });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getActiveSites };
