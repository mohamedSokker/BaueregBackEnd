const { getData } = require("../../../functions/getData");

const filterDate = async (eq, data, startDate, date, endDate) => {
  if (date) {
    return data.filter((d) =>
      new Date(date) <= new Date(endDate)
        ? eq === d[`Equipment`] &&
          new Date(d[`Date_Time`]) >= new Date(startDate) &&
          new Date(d[`Date_Time`]) <= new Date(date)
        : eq === d[`Equipment`] &&
          new Date(d[`Date_Time`]) >= new Date(startDate) &&
          new Date(d[`Date_Time`]) <= new Date(endDate)
    );
  } else {
    return data.filter(
      (d) =>
        eq === d[`Equipment`] &&
        new Date(d[`Date_Time`]) >= new Date(startDate) &&
        new Date(d[`Date_Time`]) <= new Date(endDate)
    );
  }
};

const filterFilter = async (data, filter) => {
  if (!filter)
    return data.filter(
      (d) =>
        d.Equipment_Type === `Trench_Cutting_Machine` ||
        d.Equipment_Type === `Drilling_Machine`
    );
  return data.filter((d) => d.Equipment_Type === filter);
};

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;

    const dataQuery = `SELECT * FROM Maintenance 
                       WHERE Breakdown_Type <> 'Periodic Maintenance' AND
                       Equipment = '${fieldsData.Equipment}' ORDER BY Equipment`;
    const data = (await getData(dataQuery)).recordsets[0];

    let resultData = [];
    let result = {};
    let resultArray = [];

    const startDate =
      fieldsData.startDate &&
      new Date(fieldsData.startDate) > new Date("2023-01-01")
        ? new Date(fieldsData.startDate)
        : new Date("2023-01-01");
    const endDate = fieldsData.dateTime ? fieldsData.dateTime : new Date();

    const filterResult = await filterDate(
      fieldsData.Equipment,
      data,
      startDate,
      fieldsData?.dateTime,
      endDate
    );

    filterResult.sort((a, b) => a["Date_Time"] - b["Date_Time"]);
    resultData.push(...filterResult);

    resultData = await filterFilter(resultData, fieldsData.filter);

    resultData.forEach((v) => {
      result[v?.Breakdown_Type] = (result[v?.Breakdown_Type] || 0) + 1;
    });

    Object.keys(result).map((key) => {
      resultArray.push({ label: key, value: result[key] });
    });

    resultArray.sort((a, b) => b.value - a.value);
    resultArray = resultArray.slice(0, 10);

    let breakdownArray = [];

    resultArray.map((arr) => {
      breakdownArray.push(arr.label);
    });

    resultData = resultData.filter((d) =>
      breakdownArray.includes(d.Breakdown_Type)
    );

    return res.status(200).json({ graphData: resultArray, data: resultData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = logic;
