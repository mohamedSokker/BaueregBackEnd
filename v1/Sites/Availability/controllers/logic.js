const { getData } = require("../../../../v3/helpers/getData");
const addDays = require("../../../Logic/globalFunction/addDays");

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
    let PerEqs = (await getData(eqQuery)).recordsets[0];

    if (fieldsData.filter)
      PerEqs = await filterFilter(PerEqs, fieldsData.filter);

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

    console.log(eqs);

    const dataQuery = `SELECT *
                       FROM Availability
                       WHERE Equipment IN ${eqURL} ORDER BY Equipment`;
    const data = (await getData(dataQuery)).recordsets[0];

    let startDate;
    let endDate;
    let resultData = [];

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
      }
    }

    let per = 0;
    let perLastWeek = 0;
    let sum = 0;
    let sumLastWeek = 0;
    let lastWeekCount = 0;

    resultData.map((d) => {
      sum += Number(d?.Maintenance_Availability);
      if (new Date(d.Date_Time) < addDays(new Date(), -7)) {
        sumLastWeek += Number(d.Maintenance_Availability);
        lastWeekCount += 1;
      }
    });

    per = ((sum / resultData.length) * 100).toFixed(1);
    perLastWeek = ((sum / lastWeekCount) * 100).toFixed(1);

    resultData.sort(
      (a, b) => new Date(a["Date_Time"]) - new Date(b["Date_Time"])
    );

    const result = {
      per: Number(per),
      diff: (Number(per) - Number(perLastWeek)).toFixed(2),
      data: resultData,
    };
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = logic;
