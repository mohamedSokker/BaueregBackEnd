const { getData } = require("../../../functions/getData");

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;
    const PerEqs = fieldsData.Equipment;

    let eqURL = ` (Equipment = '${PerEqs}')`;
    let query = ``;
    const mainQuery = `SELECT  ID AS id,
                       TimeStart AS StartTime,
                       TimeEnd AS EndTime,
                       Equipment AS Subject,
                       Type
                       FROM PeriodicMaintenance_Plan WHERE `;
    // const filterQuery = fieldsData?.filter
    //   ? `Equipment_Type = '${fieldsData?.filter}'`
    //   : `Equipment_Type = 'Trench_Cutting_Machine' OR Equipment_Type = 'Drilling_Machine'`;
    const dateTimeQuery = !fieldsData.dateTime
      ? `TimeStart >= '2023-01-01'`
      : `TimeStart BETWEEN '2023-01-01' AND '${fieldsData.dateTime}'`;
    if (eqURL.length === 0) return res.status(200).json([]);

    query = `${mainQuery} ${dateTimeQuery} AND ${eqURL}`;

    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = logic;
