const { getData } = require("../../../functions/getData");

const filterDate = async (eq, data, startDate, date, endDate) => {
  if (date) {
    return data.filter((d) =>
      new Date(date) <= new Date(endDate)
        ? d[`Subject`] === eq &&
          new Date(d[`StartTime`]) >= new Date(startDate) &&
          new Date(d[`StartTime`]) <= new Date(date)
        : d[`Subject`] === eq &&
          new Date(d[`StartTime`]) >= new Date(startDate) &&
          new Date(d[`StartTime`]) <= new Date(endDate)
    );
  } else {
    return data.filter(
      (d) =>
        d[`Subject`] === eq &&
        new Date(d[`StartTime`]) >= new Date(startDate) &&
        new Date(d[`StartTime`]) <= new Date(endDate)
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

    const dataQuery = `SELECT  ID AS id,
                        TimeStart AS StartTime,
                        TimeEnd AS EndTime,
                        Equipment_Type,
                        Equipment AS Subject,
                        Type
                        FROM PeriodicMaintenance_Plan WHERE
                        Equipment IN  ${eqURL} ORDER BY Equipment`;
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
        filterResult.sort((a, b) => a["StartTime"] - b["StartTime"]);
        resultData.push(...filterResult);
        if (fieldsData.filter)
          resultData = await filterFilter(resultData, fieldsData.filter);
      }
    }

    return res.status(200).json(resultData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = logic;
