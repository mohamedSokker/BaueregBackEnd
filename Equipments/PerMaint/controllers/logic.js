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
                       Location + '=> ' + Equipment AS Location,
                       ExpectedTask AS Subject
                       FROM PeriodicMaintenance_Plan WHERE `;
    const filterQuery = `Equipment_Type = '${fieldsData?.filter}'`;
    const dateTimeQuery = `TimeStart >= '${fieldsData.dateTime}'`;
    if (eqURL.length === 0) return res.status(200).json([]);
    if (!fieldsData?.dateTime && !fieldsData?.filter) {
      query = `${mainQuery} ${eqURL}`;
    } else if (fieldsData?.dateTime && fieldsData?.filter) {
      query = `${mainQuery} ${dateTimeQuery} AND ${filterQuery} AND ${eqURL}`;
    } else if (fieldsData?.dateTime && !fieldsData?.filter) {
      query = `${mainQuery} ${dateTimeQuery} AND ${eqURL}`;
    } else if (!fieldsData?.dateTime && fieldsData?.filter) {
      query = `${mainQuery} ${filterQuery} AND ${eqURL}`;
    }

    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = logic;
