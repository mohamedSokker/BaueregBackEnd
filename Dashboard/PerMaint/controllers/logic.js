const { getData } = require("../../../functions/getData");

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;
    const PerEqs = fieldsData.usersData[0].roles.Editor?.Equipments.concat(
      fieldsData.usersData[0].roles.User?.Equipments
    );

    let eqURL = ``;
    for (let i = 0; i < PerEqs.length; i++) {
      if (i === 0) {
        eqURL += ` (Equipment = '${PerEqs[i].name}'`;
      } else if (i === PerEqs.length - 1) {
        eqURL += ` OR Equipment = '${PerEqs[i].name}')`;
      } else {
        eqURL += ` OR Equipment = '${PerEqs[i].name}'`;
      }
    }
    let query = ``;
    const mainQuery = `SELECT  ID AS id,
                       TimeStart AS StartTime,
                       TimeEnd AS EndTime,
                       Location + '=> ' + Equipment AS Subject,
                       Type
                       FROM PeriodicMaintenance_Plan WHERE`;
    const filterQuery = fieldsData?.filter
      ? `Equipment_Type = '${fieldsData?.filter}'`
      : `(Equipment_Type = 'Trench_Cutting_Machine' OR Equipment_Type = 'Drilling_Machine')`;
    const dateTimeQuery = !fieldsData.dateTime
      ? `TimeStart >= '2023-01-01'`
      : `TimeStart BETWEEN '2023-01-01' AND '${fieldsData.dateTime}'`;
    if (eqURL.length === 0) return res.status(200).json([]);

    query = `${mainQuery} ${dateTimeQuery} AND ${filterQuery} AND ${eqURL}`;
    console.log(query);

    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = logic;
