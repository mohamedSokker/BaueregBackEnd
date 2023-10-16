const { getData } = require("../../../functions/getData");

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;
    const PerEqs = fieldsData.Equipment;

    let eqURL = ` (OilConsumption.Equipment = '${PerEqs}') 
                   GROUP BY OilConsumption.TotalConsumption, OilConsumption.Date 
                   ORDER BY OilConsumption.Date ASC`;
    let eqUrlForSum = ` (OilConsumption.Equipment = '${PerEqs}')`;

    let query = ``;
    let queryLastWeek = ``;
    let dataQuery = ``;
    const dataMainQuery = `SELECT OilConsumption.Date, OilConsumption.TotalConsumption FROM OilConsumption
                       JOIN Equipments_Location
                       ON (OilConsumption.Equipment = Equipments_Location.Equipment) 
                       WHERE Equipments_Location.End_Date IS NULL `;
    const mainQuery = `SELECT SUM(OilConsumption.TotalConsumption) AS SUM FROM OilConsumption
                       JOIN Equipments_Location
                       ON (OilConsumption.Equipment = Equipments_Location.Equipment) 
                       WHERE Equipments_Location.End_Date IS NULL `;
    const filterQuery = fieldsData?.filter
      ? `Equipments_Location.Equipment_Type = '${fieldsData?.filter}'`
      : `Equipments_Location.Equipment_Type <> ''`;
    const dateTimeQuery = !fieldsData.dateTime
      ? `OilConsumption.Date >= '2023-01-01'`
      : `OilConsumption.Date BETWEEN '2023-01-01' AND '${fieldsData.dateTime}'`;
    const lastWeekQuery = !fieldsData.dateTime
      ? `OilConsumption.Date BETWEEN '2023-01-01' AND GETDATE() - 7`
      : `OilConsumption.Date BETWEEN '2023-01-01' AND DATEADD(dd, -7, '${fieldsData.dateTime}')`;
    if (eqURL.length === 0) return res.status(200).json([]);

    query = `${mainQuery} AND ${dateTimeQuery} AND ${filterQuery} AND ${eqUrlForSum}`;
    dataQuery = `${dataMainQuery} AND ${dateTimeQuery} AND ${filterQuery} AND ${eqURL}`;
    queryLastWeek = `${mainQuery} AND ${filterQuery} AND ${lastWeekQuery} AND ${eqUrlForSum}`;

    let data = await getData(query);
    data = data.recordsets[0];
    let dataLastWeek = await getData(queryLastWeek);
    dataLastWeek = dataLastWeek.recordsets[0];
    const allData = await getData(dataQuery);
    let per = 0;
    if (!data[0]?.SUM) {
      per = 0;
    } else {
      per = (data[0]?.SUM).toFixed(0);
    }
    let perLastWeek = 0;
    if (!dataLastWeek[0]?.SUM) {
      perLastWeek = 0;
    } else {
      perLastWeek = (dataLastWeek[0]?.SUM).toFixed(0);
    }
    const result = {
      per: Number(per),
      diff: Number(per) - Number(perLastWeek),
      data: allData.recordsets[0],
    };
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = logic;
