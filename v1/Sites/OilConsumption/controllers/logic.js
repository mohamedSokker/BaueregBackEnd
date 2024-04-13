const XLSX = require("xlsx");
const XlsxAll = require("../../../../v3/helpers/XlsxAll");
const ExcelDateToJSDate = require("../../../../v3/helpers/ExcelToJsDate");
const addDays = require("../../../Logic/globalFunction/addDays");
const { getData } = require("../../../../v3/helpers/getData");

const filterDate = async (eq, data, startDate, date, endDate) => {
  if (date) {
    return data.filter((d) =>
      new Date(date) <= new Date(endDate)
        ? d[`Equipment`] === eq &&
          new Date(d[`Date`]) >= new Date(startDate) &&
          new Date(d[`Date`]) <= new Date(date)
        : d[`Equipment`] === eq &&
          new Date(d[`Date`]) >= new Date(startDate) &&
          new Date(d[`Date`]) <= new Date(endDate)
    );
  } else {
    return data.filter(
      (d) =>
        d[`Equipment`] === eq &&
        new Date(d[`Date`]) >= new Date(startDate) &&
        new Date(d[`Date`]) <= new Date(endDate)
    );
  }
};

// const eqsFilter = async (data, eqs) => {
//   return data.filter((d) => eqs.includes(d["Equipment"]));
// };

const filterFilter = async (result) => {
  let data = [];
  data = XLSX.utils.sheet_to_json(result.Sheets[`Oil Consumption`]);
  return data;
};

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;
    const query = `SELECT Equipment, Start_Date, End_Date FROM Equipments_Location WHERE
                   Location = '${fieldsData.Location}'`;
    const perEqs = (await getData(query)).recordsets[0];

    // console.log(startDate);

    let eqs = [];
    for (let j = 0; j < perEqs.length; j++) {
      eqs.push(perEqs[j].Equipment);
    }
    // console.log(eqs);

    const url = process.env.CONSUMPTON_ONEDRIVE_URL;
    let result = await XlsxAll(url);

    result = await filterFilter(result);
    // result = await eqsFilter(result, eqs);

    for (let i = 0; i < result.length; i++) {
      result[i]["Date"] = ExcelDateToJSDate(result[i]["Date"]);
    }

    let startDate;
    let endDate;
    let resultData = [];
    let resultLastWeek = [];

    for (let j = 0; j < eqs.length; j++) {
      // console.log(eqs[j]);
      const perEqsFilter = perEqs.filter((perEq) => perEq.Equipment === eqs[j]);
      // console.log(perEqsFilter);
      const eqStartDate = perEqsFilter.sort(
        (a, b) => new Date(a?.Start_Date) - new Date(b?.Start_Date)
      );
      // console.log(eqStartDate);

      if (eqStartDate[0]) {
        startDate =
          new Date(eqStartDate[0].Start_Date) > new Date("2023-01-01")
            ? new Date(eqStartDate[0].Start_Date)
            : new Date("2023-01-01");
        endDate =
          eqStartDate[eqStartDate.length - 1].End_Date === null
            ? new Date()
            : new Date(eqStartDate[eqStartDate.length - 1].End_Date);

        // console.log(startDate, endDate);
        // console.log(eqStartDate[eqStartDate.length - 1]);

        const filterResult = await filterDate(
          eqs[j],
          result,
          startDate,
          fieldsData?.dateTime,
          endDate
        );
        filterResult.sort((a, b) => a["Date"] - b["Date"]);
        resultData.push(...filterResult);

        const lastWeek = !fieldsData?.dateTime
          ? await filterDate(
              eqs[j],
              result,
              startDate,
              addDays(new Date(), -7),
              endDate
            )
          : await filterDate(
              eqs[j],
              result,
              startDate,
              addDays(fieldsData?.dateTime, -7),
              endDate
            );

        lastWeek.sort((a, b) => a["Date"] - b["Date"]);

        resultLastWeek.push(...lastWeek);
      }
    }

    let per = 0;
    let perLastWeek = 0;

    for (let i = 0; i < resultData.length; i++) {
      resultData[i]["TOTAL (L)"] =
        Number(resultData[i]["TOTAL FLUIDMATIC D2 (L)"]) +
        Number(resultData[i]["TOTAL AZOLLA ZS 68 (L)"]) +
        Number(resultData[i]["TOTAL Rubia 15 W 40 (L)"]) +
        Number(resultData[i]["TOTAL  Carter EP 150 (L)"]) +
        Number(resultData[i]["TOTAL Carter SH 220 (L)"]);

      per += Number(resultData[i]["TOTAL (L)"]);
    }

    for (let i = 0; i < resultLastWeek.length; i++) {
      resultLastWeek[i]["TOTAL (L)"] =
        Number(resultLastWeek[i]["TOTAL FLUIDMATIC D2 (L)"]) +
        Number(resultLastWeek[i]["TOTAL AZOLLA ZS 68 (L)"]) +
        Number(resultLastWeek[i]["TOTAL Rubia 15 W 40 (L)"]) +
        Number(resultLastWeek[i]["TOTAL  Carter EP 150 (L)"]) +
        Number(resultLastWeek[i]["TOTAL Carter SH 220 (L)"]);

      perLastWeek += Number(resultLastWeek[i]["TOTAL (L)"]);
    }

    const target = {
      per: Number(per).toFixed(0),
      diff: ((Number(per) - Number(perLastWeek)) / Number(per)).toFixed(1),
      data: resultData,
    };

    return res.status(200).json(target);
  } catch (error) {
    return res.status(500).json({ messages: error.message });
  }
};

module.exports = logic;
