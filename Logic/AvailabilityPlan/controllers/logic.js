const { getData } = require("../../../functions/getData");
const getEqsInSite = require("../../globalFunction/getEquipmentsinSite");
const formatDate = require("../../globalFunction/formatdate");
const getDayName = require("../../globalFunction/getDayName");
const addDays = require("../../globalFunction/addDays");

const checkifRecordExist = async (fieldsData) => {
  const query = `SELECT * FROM Availability_Plan WHERE 
                 Location = '${fieldsData.Location}' AND
                 DateFrom = '${fieldsData.DateFrom}' AND
                 DateTo = '${fieldsData.DateTo}'`;
  const result = await getData(query);
  if (result.recordsets[0].length === 0) return false;
  return true;
};

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;
    const checkifExist = await checkifRecordExist(fieldsData);
    let query1 = ``;
    if (checkifExist) {
      query1 += `UPDATE Availability_Plan SET
                 Location = '${fieldsData.Location}',
                 DateFrom = '${fieldsData.DateFrom}',
                 DateTo = '${fieldsData.DateTo}',
                 Friday = '${fieldsData.Friday}',
                 Saturday = '${fieldsData.Saturday}',
                 Sunday = '${fieldsData.Sunday}',
                 Monday = '${fieldsData.Monday}',
                 Tuesday = '${fieldsData.Tuesday}',
                 Wednesday = '${fieldsData.Wednesday}',
                 Thursday = '${fieldsData.Thursday}' WHERE
                 Location = '${fieldsData.Location}' AND
                 DateFrom = '${fieldsData.DateFrom}' AND
                 DateTo = '${fieldsData.DateTo}'`;
    } else {
      query1 += `INSERT INTO Availability_Plan VALUES(
                 '${fieldsData.Location}',
                 '${fieldsData.DateFrom}',
                 '${fieldsData.DateTo}',
                 '${fieldsData.Friday}',
                 '${fieldsData.Saturday}',
                 '${fieldsData.Sunday}',
                 '${fieldsData.Monday}',
                 '${fieldsData.Tuesday}',
                 '${fieldsData.Wednesday}',
                 '${fieldsData.Thursday}'
                 )`;
    }
    await getData(query1);
    const eqs = await getEqsInSite(fieldsData.Location);
    let query = ``;
    let mainAv = 0;
    let siteAv = 0;
    let avTime = 0;
    const filteredEqs = eqs.filter(
      (eq) =>
        eq.Equipment_Type === `Trench_Cutting_Machine` ||
        eq.Equipment_Type === `Drilling_Machine`
    );
    for (let i = 0; i < filteredEqs.length; i++) {
      let startDate = formatDate(fieldsData.DateFrom);
      let endDate = formatDate(fieldsData.DateTo);
      while (new Date(startDate) <= new Date(endDate)) {
        const avQuery = `SELECT * FROM Availability WHERE
                       Date_Time = '${startDate}' AND
                       Location = '${fieldsData.Location}' AND
                       Equipment = '${filteredEqs[i][`Equipment`]}'`;
        let avData = await getData(avQuery);
        avData = avData.recordsets[0];
        const avPlanQuery = `SELECT ${getDayName(startDate)} AS day
                           FROM Availability_Plan WHERE 
                           Location = '${fieldsData.Location}' AND 
                           DateFrom = '${fieldsData.DateFrom}' AND
                           DateTo = '${fieldsData.DateTo}'`;
        let avPlanData = await getData(avPlanQuery);
        avPlanData = avPlanData.recordsets[0];
        if (avData.length > 1)
          throw new Error(`There are more than one record for this date`);
        if (avData.length === 0) {
          query += ` INSERT INTO Availability VALUES(
                  '${formatDate(startDate)}',
                  '${filteredEqs[i][`Equipment`]}',
                  '${fieldsData.Location}',
                  '0',
                  '0',
                  '${avPlanData[0][`day`]}',
                  '1',
                  '0',
                  '1',
                  ''
                 )`;
        } else if (avData.length === 1) {
          if (avPlanData.length === 0) {
            mainAv = 1;
            siteAv = 1;
          } else {
            mainAv =
              (Number(avPlanData[0][`day`]) -
                Number(avData[0][`Periodic_Maintenance`]) -
                Number(avData[0][`Breakdown_Time`])) /
              (Number(avPlanData[0][`day`]) -
                Number(avData[0][`Periodic_Maintenance`]));
            siteAv =
              (Number(avPlanData[0][`day`]) -
                Number(avData[0][`Periodic_Maintenance`]) -
                Number(avData[0][`Site_QC_Time`])) /
              (Number(avPlanData[0][`day`]) -
                Number(avData[0][`Periodic_Maintenance`]));
          }
          avTime =
            Number(avPlanData[0][`day`]) -
            Number(avData[0][`Periodic_Maintenance`]) -
            Number(avData[0][`Breakdown_Time`]);
          query += ` UPDATE Availability SET
                Available_Time = '${avTime}',
                Maintenance_Availability = '${mainAv}',
                Site_Availability = '${siteAv}' WHERE
                Date_Time = '${startDate}' AND
                Location = '${fieldsData.Location}' AND
                Equipment = '${filteredEqs[i][`Equipment`]}'`;
        }
        startDate = formatDate(addDays(startDate, 1));
      }
    }
    const result = await getData(`${query}`);
    return res.status(200).json({ success: "true", result: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = logic;
