const { getData } = require("../../functions/getData");

const getEqsInSite = async (site) => {
  const query = `SELECT * FROM Equipments_Location WHERE 
                   Location = '${site}' AND
                   End_Date IS NULL`;
  const result = await getData(query);
  return result.recordsets[0];
};

module.exports = getEqsInSite;
