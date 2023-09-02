const getDayName = require("./getDayName");
const { getData } = require("../../functions/getData");

const checkifAvPlanRecord = async (site, DateFrom, DateTo) => {
  const query = `SELECT *
                 FROM Availability_Plan WHERE 
                 Location = '${site}' AND 
                 DateFrom = '${DateFrom}' AND
                 DateTo = '${DateTo}'`;
  const result = await getData(query);
  if (result.recordsets[0].length > 0) return true;
  return false;
};

module.exports = checkifAvPlanRecord;
