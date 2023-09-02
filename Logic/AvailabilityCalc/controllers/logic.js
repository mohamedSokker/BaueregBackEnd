const getbreakdownData = require("../../globalFunction/getBreakdownData");
const { getData } = require("../../../functions/getData");
const formatDate = require("../../globalFunction/formatdate");
const checkIfAvPlanRecord = require("../../globalFunction/checkifAvPlanRecord");
const getWeekInterval = require("../../globalFunction/getWeekInterval");

const avCalc = (avTime, PerMaintTime, BreakdownTime) => {
  return (
    (Number(avTime) - Number(PerMaintTime) - Number(BreakdownTime)) /
    (Number(avTime) - Number(PerMaintTime))
  ).toFixed(2);
};

const getSameDateBreakdownTime = async (dateTime, location, eq) => {
  const query = `SELECT * FROM Maintenance WHERE 
                 '${formatDate(dateTime)}' BETWEEN 
                 CONVERT(DATE, Problem_start_From) AND
                 CONVERT(DATE, Problem_End_To) AND
                 Location = '${location}' AND
                 Equipment = '${eq}' AND
                 Breakdown_Type <> 'Periodic Maintenance'`;
  const result = await getData(query);
  return result.recordsets[0];
};

const getSameDatePerMaint = async (dateTime, location, eq) => {
  const query = `SELECT * FROM Maintenance WHERE 
                 '${formatDate(dateTime)}' BETWEEN 
                 CONVERT(DATE, Problem_start_From) AND
                 CONVERT(DATE, Problem_End_To) AND
                 Location = '${location}' AND
                 Equipment = '${eq}' AND
                 Breakdown_Type = 'Periodic Maintenance'`;
  const result = await getData(query);
  return result.recordsets[0];
};

const getSameDateAv = async (dateTime, location, eq) => {
  const query = `SELECT * FROM Availability WHERE
                 Date_Time = '${formatDate(dateTime)}' AND
                 Location = '${location}' AND
                 Equipment = '${eq}'`;
  const result = await getData(query);
  return result.recordsets[0];
};

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;
    let breakdown = 0;
    let perMaint = 0;
    let result = [];
    const startDateInterval = getWeekInterval(fieldsData.Problem_start_From);
    const endDateInterval = getWeekInterval(fieldsData.Problem_End_To);
    const avPlanCheckStartDate = await checkIfAvPlanRecord(
      fieldsData.Location,
      formatDate(startDateInterval.startDate),
      formatDate(startDateInterval.endDate)
    );
    const avPlanCheckEndDate = await checkIfAvPlanRecord(
      fieldsData.Location,
      formatDate(endDateInterval.startDate),
      formatDate(endDateInterval.endDate)
    );
    if (!avPlanCheckStartDate || !avPlanCheckEndDate)
      return res.status(400).json({ message: `No Week Plan Found` });
    const fieldBreakdownData = await getbreakdownData(
      fieldsData.Problem_start_From,
      fieldsData.Problem_End_To,
      fieldsData.Location
    );
    for (let i = 0; i < fieldBreakdownData.length; i++) {
      console.log(fieldBreakdownData[i]);
      breakdown = 0;
      perMaint = 0;
      const currentDateTime = fieldBreakdownData[i].dateTime;
      const currentTime = fieldBreakdownData[i].breakdownTime;
      const breakdownAllData = await getSameDateBreakdownTime(
        currentDateTime,
        fieldsData.Location,
        fieldsData.Equipment
      );
      const perMaintAllData = await getSameDatePerMaint(
        currentDateTime,
        fieldsData.Location,
        fieldsData.Equipment
      );

      for (let i1 = 0; i1 < breakdownAllData.length; i1++) {
        const fieldBreakdownData = await getbreakdownData(
          breakdownAllData[i1].Problem_start_From,
          breakdownAllData[i1].Problem_End_To,
          breakdownAllData[i1].Location
        );
        const targetBreakdownTime = fieldBreakdownData.find(
          (data) => formatDate(data.dateTime) === currentDateTime
        );
        breakdown += targetBreakdownTime.breakdownTime;
      }
      for (let i2 = 0; i2 < perMaintAllData.length; i2++) {
        const fieldsPerMaintData = await getbreakdownData(
          perMaintAllData[i2].Problem_start_From,
          perMaintAllData[i2].Problem_End_To,
          perMaintAllData[i2].Location
        );
        const targetPerMaint = fieldsPerMaintData.find(
          (data) => formatDate(data.dateTime) === currentDateTime
        );
        perMaint += targetPerMaint.breakdownTime;
      }
      if (fieldsData.Breakdown_Type === `Periodic Maintenance`) {
        perMaint += currentTime;
        if (perMaint > 1440) perMaint = 1440;
      } else {
        breakdown += currentTime;
        if (breakdown > 1440) breakdown = 1440;
      }
      result.push({
        breakdown: breakdown,
        perMaint: perMaint,
        currentDate: currentDateTime,
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = logic;
