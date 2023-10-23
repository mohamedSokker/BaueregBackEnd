const XLSX = require("xlsx");
const XlsxAll = require("../../../functions/XlsxAll");
const ExcelDateToJSDate = require("../../../functions/ExcelToJsDate");
const addDays = require("../../../Logic/globalFunction/addDays");
const { getData } = require("../../../functions/getData");

// const Trench = ["DW", "Cut-Off Wall", "Barrettes"];
// const Piles = ["Piles"];

const filterDate = async (data, date) => {
  if (date) {
    return data.filter(
      (d) =>
        new Date(d["Date "]) <= new Date(date) &&
        new Date(d["Date "]) >= new Date("2023-01-01")
    );
  } else {
    return data.filter((d) => new Date(d["Date "]) >= new Date("2023-01-01"));
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
    const query = `SELECT DISTINCT Equipment FROM Equipments_Location WHERE
                   Location = '${fieldsData.Location}'`;
    const perEqs = (await getData(query)).recordsets[0];

    let eqs = [];
    for (let j = 0; j < perEqs.length; j++) {
      eqs.push(perEqs[j].Equipment);
    }

    const url = process.env.CONSUMPTON_ONEDRIVE_URL;
    let result = await XlsxAll(url);

    result = await filterFilter(result);
    result = await eqsFilter(result, eqs);

    for (let i = 0; i < result.length; i++) {
      result[i]["Date "] = ExcelDateToJSDate(result[i]["Date "]);
    }

    result = await filterDate(result, fieldsData?.dateTime);

    result.sort((a, b) => a["Date "] - b["Date "]);

    let resultLastWeek = !fieldsData?.dateTime
      ? await filterDate(result, addDays(new Date(), -7))
      : await filterDate(result, addDays(fieldsData?.dateTime, -7));

    resultLastWeek.sort((a, b) => a["Date "] - b["Date "]);

    let per = 0;
    let perLastWeek = 0;

    for (let i = 0; i < result.length; i++) {
      // if (fieldsData?.Type === "Trench_Cutting_Machine") {
      per += Number(result[i]["Fuel Consumption Quantity (Liter)"]);
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
      data: result,
    };

    return res.status(200).json(target);
  } catch (error) {
    return res.status(500).json({ messages: error.message });
  }
};

module.exports = logic;
