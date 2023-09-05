const { getData } = require("../functions/getData");

const getEqsInSites = async (req, res) => {
  try {
    const site = req?.query?.site;
    let query = ``;
    if (site) {
      query = `SELECT * FROM Equipments_Location WHERE 
               Location = '${site}' AND
               End_Date IS NULL`;
    } else {
      query = `SELECT * FROM Equipments_Location WHERE 
               End_Date IS NULL`;
    }

    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getEqsInSites };
