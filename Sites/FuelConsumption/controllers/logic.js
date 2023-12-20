const XLSX = require("xlsx");
const XlsxAll = require("../../../functions/XlsxAll");
const ExcelDateToJSDate = require("../../../functions/ExcelToJsDate");
const addDays = require("../../../Logic/globalFunction/addDays");
const { getData } = require("../../../functions/getData");

// const Trench = ["DW", "Cut-Off Wall", "Barrettes"];
// const Piles = ["Piles"];

const filterDate = async (eq, data, startDate, date, endDate) => {
  if (date) {
    return data.filter((d) =>
      new Date(date) <= new Date(endDate)
        ? d[`Equipment`] === eq &&
          new Date(d[`Date `]) >= new Date(startDate) &&
          new Date(d[`Date `]) <= new Date(date)
        : d[`Equipment`] === eq &&
          new Date(d[`Date `]) >= new Date(startDate) &&
          new Date(d[`Date `]) <= new Date(endDate)
    );
  } else {
    return data.filter(
      (d) =>
        d[`Equipment`] === eq &&
        new Date(d[`Date `]) >= new Date(startDate) &&
        new Date(d[`Date `]) <= new Date(endDate)
    );
  }
};

const eqsFilter = async (data, eqs) => {
  return data.filter((d) => eqs.includes(d["Equipment"]));
};

const filterFilter = async (result) => {
  let data = [];
  // if (!filter && Type === "Trench_Cutting_Machine") {
  //   result.SheetNames.map((sheetName) => {
  //     if (Trench.includes(sheetName)) {
  //       data = [...data, ...XLSX.utils.sheet_to_json(result.Sheets[sheetName])];
  //     }
  //   });
  // } else if (!filter && Type === "Drilling_Machine") {
  //   result.SheetNames.map((sheetName) => {
  //     if (Piles.includes(sheetName)) {
  //       data = [...data, ...XLSX.utils.sheet_to_json(result.Sheets[sheetName])];
  //     }
  //   });
  // } else {
  data = XLSX.utils.sheet_to_json(result.Sheets[`Fuel Consumption`]);
  // }
  return data;
};

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;
    const query = `SELECT Equipment, Start_Date, End_Date FROM Equipments_Location WHERE
                   Location = '${fieldsData.Location}'`;
    const perEqs = (await getData(query)).recordsets[0];

    // const startDate = perEqs.sort(
    //   (a, b) => new Date(a.Start_Date) - new Date(b.Start_Date)
    // );

    let eqs = [];
    for (let j = 0; j < perEqs.length; j++) {
      eqs.push(perEqs[j].Equipment);
    }

    const url = process.env.CONSUMPTON_ONEDRIVE_URL;
    let result = await XlsxAll(url);

    result = await filterFilter(result);
    // result = await eqsFilter(result, eqs);

    for (let i = 0; i < result.length; i++) {
      result[i]["Date "] = ExcelDateToJSDate(result[i]["Date "]);
    }

    // console.log(result);

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

        const filterResult = await filterDate(
          eqs[j],
          result,
          startDate,
          fieldsData?.dateTime,
          endDate
        );
        // console.log(filterResult);
        filterResult.sort((a, b) => a["Date "] - b["Date "]);
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

        lastWeek.sort((a, b) => a["Date "] - b["Date "]);

        resultLastWeek.push(...lastWeek);
      }
    }

    let per = 0;
    let perLastWeek = 0;

    for (let i = 0; i < resultData.length; i++) {
      // if (fieldsData?.Type === "Trench_Cutting_Machine") {
      per += Number(resultData[i]["Fuel Consumption Quantity (Liter)"]);
      // } else {
      //   per += Number(result[i]["Actual Depth"]);
      // }
    }

    for (let i = 0; i < resultLastWeek.length; i++) {
      // if (fieldsData?.Type === "Trench_Cutting_Machine") {
      perLastWeek += Number(
        resultLastWeek[i]["Fuel Consumption Quantity (Liter)"]
      );
      // } else {
      //   perLastWeek += Number(resultLastWeek[i]["Actual Depth"]);
      // }
    }

    const target = {
      per: Number(per).toFixed(0),
      diff: ((Number(per) - Number(perLastWeek)) / Number(per)).toFixed(2),
      data: resultData,
    };

    return res.status(200).json(target);
  } catch (error) {
    return res.status(500).json({ messages: error.message });
  }
};

module.exports = logic;
