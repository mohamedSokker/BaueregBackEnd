const { getData } = require("../../../functions/getData");

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;
    const PerEqs = fieldsData.Equipment;

    let eqURL = ` (Equipment = '${PerEqs}') `;

    let query = ``;
    const mainQuery = `SELECT DISTINCT TOP 10 Breakdown_Type AS label,
                       COUNT(Breakdown_Type)
                       AS value FROM Maintenance WHERE  `;
    const filterQuery = `Equipment_Type = '${fieldsData?.filter}'`;
    const dateTimeQuery = `Date_Time >= '${fieldsData.dateTime}'`;
    const groupByQuery = `GROUP BY Breakdown_Type
                          HAVING COUNT(Breakdown_Type) > 0
                          ORDER BY value DESC`;
    if (eqURL.length === 0) return res.status(200).json([]);
    if (!fieldsData?.dateTime && !fieldsData?.filter) {
      query = `${mainQuery} ${eqURL} ${groupByQuery}`;
    } else if (fieldsData?.dateTime && fieldsData?.filter) {
      query = `${mainQuery} ${dateTimeQuery} AND ${filterQuery} AND ${eqURL} ${groupByQuery}`;
    } else if (fieldsData?.dateTime && !fieldsData?.filter) {
      query = `${mainQuery} ${dateTimeQuery} AND ${eqURL} ${groupByQuery}`;
    } else if (!fieldsData?.dateTime && fieldsData?.filter) {
      query = `${mainQuery} ${filterQuery} AND ${eqURL} ${groupByQuery}`;
    }

    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = logic;
