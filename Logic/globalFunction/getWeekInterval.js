const getDayName = require("./getDayName");
const addDays = require("./addDays");

const getWeekInterval = (anyDate) => {
  const dt = new Date(anyDate);
  let currentDate = dt;
  while (getDayName(currentDate) !== "Friday") {
    currentDate = addDays(currentDate, -1);
  }
  const startDate = new Date(currentDate.setDate(currentDate.getDate()));
  const endDate = new Date(currentDate.setDate(currentDate.getDate() + 6));
  return { startDate, endDate };
};

module.exports = getWeekInterval;
