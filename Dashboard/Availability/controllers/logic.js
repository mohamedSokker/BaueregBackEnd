const { getData } = require("../../../functions/getData");

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;
    const PerEqs = fieldsData.usersData[0]?.roles.Editor?.Equipments.concat(
      fieldsData.usersData[0]?.roles.User?.Equipments
    );

    let eqURL = ``;
    let eqUrlForSum = ``;
    for (let i = 0; i < PerEqs.length; i++) {
      if (i === 0) {
        eqURL += ` (Availability.Equipment = '${PerEqs[i].name}'`;
        eqUrlForSum += ` (Availability.Equipment = '${PerEqs[i].name}'`;
      } else if (i === PerEqs.length - 1) {
        eqURL += ` OR Availability.Equipment = '${PerEqs[i].name}') 
                   GROUP BY Availability.Maintenance_Availability, Availability.Date_Time 
                   ORDER BY Availability.Date_Time ASC`;
        eqUrlForSum += ` OR Availability.Equipment = '${PerEqs[i].name}')`;
      } else {
        eqURL += ` OR Availability.Equipment = '${PerEqs[i].name}'`;
        eqUrlForSum += ` OR Availability.Equipment = '${PerEqs[i].name}'`;
      }
    }
    let query = ``;
    let queryLastWeek = ``;
    let dataQuery = ``;
    const dataMainQuery = `SELECT Availability.Date_Time,Availability.Maintenance_Availability 
                       FROM Availability 
                       JOIN Equipments_Location
                       ON (Availability.Equipment = Equipments_Location.Equipment) 
                       WHERE Equipments_Location.End_Date IS NULL`;
    const mainQuery = `SELECT SUM(CONVERT(float,Availability.Maintenance_Availability)) AS SUM,
                       COUNT(Availability.Maintenance_Availability) AS COUNT FROM Availability 
                       JOIN Equipments_Location
                       ON (Availability.Equipment = Equipments_Location.Equipment) 
                       WHERE Equipments_Location.End_Date IS NULL`;
    const filterQuery = fieldsData?.filter
      ? `Equipments_Location.Equipment_Type = '${fieldsData?.filter}'`
      : `Equipments_Location.Equipment_Type <> ''`;
    const dateTimeQuery = !fieldsData.dateTime
      ? `Availability.Date_Time >= '2023-01-01'`
      : `Availability.Date_Time BETWEEN '2023-01-01' AND '${fieldsData.dateTime}'`;
    const lastWeekQuery = !fieldsData.dateTime
      ? `Availability.Date_Time BETWEEN '2023-01-01' AND GETDATE() - 7`
      : `Availability.Date_Time BETWEEN '2023-01-01' AND DATEADD(dd, -7, '${fieldsData.dateTime}')`;
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
      per = ((data[0]?.SUM / data[0]?.COUNT) * 100).toFixed(1);
    }
    let perLastWeek = 0;
    if (!dataLastWeek[0]?.SUM) {
      perLastWeek = 0;
    } else {
      perLastWeek = (
        (dataLastWeek[0]?.SUM / dataLastWeek[0]?.COUNT) *
        100
      ).toFixed(1);
    }

    const result = {
      per: Number(per),
      diff: (Number(per) - Number(perLastWeek)).toFixed(2),
      data: allData.recordsets[0],
    };
    return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = logic;
