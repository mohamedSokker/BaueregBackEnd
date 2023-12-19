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
        eqURL += ` (PeriodicMaintenance_Plan.Equipment = '${PerEqs[i].name}'`;
      } else if (i === PerEqs.length - 1) {
        eqURL += ` OR PeriodicMaintenance_Plan.Equipment = '${PerEqs[i].name}')`;
      } else {
        eqURL += ` OR PeriodicMaintenance_Plan.Equipment = '${PerEqs[i].name}'`;
      }
    }
    let query = ``;
    const mainQuery = `SELECT  PeriodicMaintenance_Plan.ID AS id,
                       PeriodicMaintenance_Plan.TimeStart AS StartTime,
                       PeriodicMaintenance_Plan.TimeEnd AS EndTime,
                       PeriodicMaintenance_Plan.Equipment AS Subject,
                       PeriodicMaintenance_Plan.Type
                       FROM PeriodicMaintenance_Plan JOIN Equipments_Location
                       ON (PeriodicMaintenance_Plan.Equipment = Equipments_Location.Equipment) WHERE 
                       Equipments_Location.Location = '${fieldsData.Location}' AND `;
    const filterQuery = fieldsData?.filter
      ? `PeriodicMaintenance_Plan.Equipment_Type = '${fieldsData?.filter}'`
      : `(PeriodicMaintenance_Plan.Equipment_Type = 'Trench_Cutting_Machine' OR PeriodicMaintenance_Plan.Equipment_Type = 'Drilling_Machine')`;
    const dateTimeQuery = !fieldsData.dateTime
      ? `PeriodicMaintenance_Plan.TimeStart >= '2023-01-01'`
      : `PeriodicMaintenance_Plan.TimeStart BETWEEN '2023-01-01' AND '${fieldsData.dateTime}'`;
    if (eqURL.length === 0) return res.status(200).json([]);

    query = `${mainQuery} ${dateTimeQuery} AND ${filterQuery} AND ${eqURL}`;

    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = logic;
