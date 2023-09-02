const dateDiffDays = require("../../Logic/globalFunction/dateDiff");
const dateDiffMin = require("../../Logic/globalFunction/dateDiffMin");
const getDayName = require("../../Logic/globalFunction/getDayName");
const formatDate = require("../../Logic/globalFunction/formatdate");
const { getData } = require("../../functions/getData");
const getWeekInterval = require("../../Logic/globalFunction/getWeekInterval");
const addDays = require("../../Logic/globalFunction/addDays");

const getbreakdownData = async (startDate, endDate, Location) => {
  try {
    let startTime = startDate;
    let endTime = endDate;
    const diff = dateDiffDays(endDate, startDate);
    let result = [];
    let breakdownTime = 0;
    if (diff > 0) {
      let currTime = new Date(startTime).toLocaleString();
      while (new Date(currTime) <= new Date(endTime)) {
        const weekInterval = getWeekInterval(currTime);
        const startInterval = formatDate(weekInterval.startDate);
        const endInterval = formatDate(weekInterval.endDate);
        const avPlanQuery = `SELECT ${getDayName(currTime)} AS day
                           FROM Availability_Plan WHERE 
                           Location = '${Location}' AND 
                           DateFrom = '${startInterval}' AND
                           DateTo = '${endInterval}'`;
        let avPlanData = await getData(avPlanQuery);
        avPlanData = avPlanData.recordsets[0];
        if (formatDate(currTime) === formatDate(startTime)) {
          let nextTime = formatDate(addDays(currTime, 1));
          nextTime = `${nextTime} 00:00:00`;
          breakdownTime = dateDiffMin(nextTime, currTime);
          result.push({
            breakdownTime: breakdownTime,
            dateTime: formatDate(currTime),
          });
        } else if (formatDate(currTime) === formatDate(endTime)) {
          let targetTime = `${formatDate(endTime)} 00:00:00`;
          breakdownTime = dateDiffMin(endTime, targetTime);
          result.push({
            breakdownTime: breakdownTime,
            dateTime: formatDate(currTime),
          });
        } else {
          breakdownTime = Number(avPlanData[0][`day`]);
          result.push({
            breakdownTime: breakdownTime,
            dateTime: formatDate(currTime),
          });
        }
        currTime = new Date(addDays(currTime, 1)).toLocaleString();
      }
    } else {
      breakdownTime = dateDiffMin(endDate, startDate);
      result.push({
        breakdownTime: breakdownTime,
        dateTime: formatDate(startDate),
      });
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getbreakdownData;
