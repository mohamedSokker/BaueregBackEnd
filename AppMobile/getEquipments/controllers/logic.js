const { getData } = require("../../../functions/getData");

const getEquipments = async (req, res) => {
  const { Location } = req.body;

  let locQuery = ``;
  for (let i = 0; i < Location.length; i++) {
    if (i === 0) {
      locQuery += ` (Location LIKE '%${Location[i]}%'`;
    } else if (i === PerEqs.length - 1) {
      locQuery += ` OR Location LIKE '%${Location[i]}%')`;
    } else {
      locQuery += ` OR Location LIKE '%${Location[i]}%'`;
    }
  }
  const query = `SELECT * FROM Equipments_Location WHERE ${locQuery} 
                    AND End_Date IS NULL AND Equipment_Type = '${bodyData.Equipment_Type}'`;
  try {
    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getEquipments };
