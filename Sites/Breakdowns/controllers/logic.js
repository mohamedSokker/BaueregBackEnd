const { getData } = require("../../../functions/getData");
const formatDate = require("../../../Logic/globalFunction/formatdate");

const filterDate = async (eq, data, startDate, date, endDate) => {
  if (date) {
    return data.filter((d) =>
      new Date(date) <= new Date(endDate)
        ? d[`Equipment`] === eq &&
          new Date(d[`Date_Time`]) >= new Date(startDate) &&
          new Date(d[`Date_Time`]) <= new Date(date)
        : d[`Equipment`] === eq &&
          new Date(d[`Date_Time`]) >= new Date(startDate) &&
          new Date(d[`Date_Time`]) <= new Date(endDate)
    );
  } else {
    return data.filter(
      (d) =>
        d[`Equipment`] === eq &&
        new Date(d[`Date_Time`]) >= new Date(startDate) &&
        new Date(d[`Date_Time`]) <= new Date(endDate)
    );
  }
};

const filterFilter = async (data, filter) => {
  return data.filter((d) => d.Equipment_Type === filter);
};

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;
    const eqQuery = `SELECT Equipment, Equipment_Type, Start_Date, End_Date FROM Equipments_Location WHERE
                   Location = '${fieldsData.Location}'`;
    const PerEqs = (await getData(eqQuery)).recordsets[0];

    let eqURL = ``;
    let eqs = [];
    for (let i = 0; i < PerEqs.length; i++) {
      if (i === 0) {
        eqURL += ` ('${PerEqs[i].Equipment}',`;
      } else if (i === PerEqs.length - 1) {
        eqURL += ` '${PerEqs[i].Equipment}')`;
      } else {
        eqURL += ` '${PerEqs[i].Equipment}',`;
      }
      if (
        PerEqs[i].Equipment_Type === `Trench_Cutting_Machine` ||
        PerEqs[i].Equipment_Type === `Drilling_Machine`
      )
        eqs.push(PerEqs[i].Equipment);
    }

    const dataQuery = `SELECT Breakdown_Type,
                       Date_Time,
                       Equipment_Type,
                       Equipment
                       FROM Maintenance WHERE Breakdown_Type <> 'Periodic Maintenance' AND
                       Equipment IN ${eqURL} ORDER BY Equipment`;
    const data = (await getData(dataQuery)).recordsets[0];

    let startDate;
    let endDate;
    let resultData = [];
    let result = {};
    let resultArray = [];

    for (let j = 0; j < eqs.length; j++) {
      const perEqsFilter = PerEqs.filter((perEq) => perEq.Equipment === eqs[j]);
      const eqStartDate = perEqsFilter.sort(
        (a, b) => new Date(a?.Start_Date) - new Date(b?.Start_Date)
      );

      if (eqStartDate[0]) {
        startDate =
          new Date(eqStartDate[0].Start_Date) > new Date("2023-01-01")
            ? new Date(eqStartDate[0].Start_Date)
            : new Date("2023-01-01");
        endDate =
          eqStartDate[eqStartDate.length - 1].End_Date === null
            ? new Date()
            : new Date(eqStartDate[eqStartDate.length - 1].End_Date);
        const filterResult = await filterDate(
          eqs[j],
          data,
          startDate,
          fieldsData?.dateTime,
          endDate
        );
        filterResult.sort((a, b) => a["Date_Time"] - b["Date_Time"]);
        resultData.push(...filterResult);
        if (fieldsData.filter)
          resultData = await filterFilter(resultData, fieldsData.filter);
      }
    }
    resultData.forEach((v) => {
      result[v?.Breakdown_Type] = (result[v?.Breakdown_Type] || 0) + 1;
    });

    Object.keys(result).map((key) => {
      resultArray.push({ label: key, value: result[key] });
    });

    resultArray.sort((a, b) => b.value - a.value);
    resultArray = resultArray.slice(0, 10);
    return res.status(200).json(resultArray);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = logic;
