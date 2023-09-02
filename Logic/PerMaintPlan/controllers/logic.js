const { getData } = require("../../../functions/getData");

const getEquipmentDetails = async (eq) => {
  const year = new Date(dateTime).getFullYear();
  const query = `SELECT Top 1
                 Equipments_Location.Location,
                 Equipments_Location.Equipment_Type,
                 Bauer_Equipments.Equipment_Model,
                 Equipments_Location.Equipment,
                 FROM Equipments_Location
                 JOIN Bauer_Equipments
                 ON (Equipments_Location.Equipment = Bauer_Equipments.Equipment) 
                 WHERE
                 Equipments_Location.End_Date IS NULL AND
                 Equipment = '${Equipment}'`;
  const result = await getData(query);
  return result.recordsets[0];
};

const logic = async (req, res) => {
  const fieldsData = req.body;
  const eqsDetails = await getEquipmentDetails(fieldsData.Equipment);
  let query = ``;
  if (eqsDetails.length > 0) {
    let startDate = `${fieldsData.Year.toString()}-01-01 00:00:00`;
    let firstReg = 0;
    let secondReg = 0;
    while (
      new Date(startDate) <
      new Date(`${fieldsData.Year.toString()}-12-31 23:59:59`)
    ) {}
  }
};

module.exports = logic;
