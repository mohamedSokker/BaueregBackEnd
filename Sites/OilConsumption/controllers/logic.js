const XLSX = require("xlsx");
const XlsxAll = require("../../../functions/XlsxAll");
const ExcelDateToJSDate = require("../../../functions/ExcelToJsDate");
const addDays = require("../../../Logic/globalFunction/addDays");
const { getData } = require("../../../functions/getData");

const filterDate = async (data, date) => {
  if (date) {
    return data.filter(
      (d) =>
        new Date(d["Date"]) <= new Date(date) &&
        new Date(d["Date"]) >= new Date("2023-01-01")
    );
  } else {
    return data.filter((d) => new Date(d["Date"]) >= new Date("2023-01-01"));
  }
};

const eqsFilter = async (data, eqs) => {
  return data.filter((d) => eqs.includes(d["Equipment"]));
};

const filterFilter = async (result) => {
  let data = [];
  data = XLSX.utils.sheet_to_json(result.Sheets[`Oil Consumption`]);
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
    console.log(eqs);

    const url = process.env.CONSUMPTON_ONEDRIVE_URL;
    let result = await XlsxAll(url);

    result = await filterFilter(result);
    result = await eqsFilter(result, eqs);

    for (let i = 0; i < result.length; i++) {
      result[i]["Date"] = ExcelDateToJSDate(result[i]["Date"]);
    }

    result = await filterDate(result, fieldsData?.dateTime);

    result.sort((a, b) => a["Date"] - b["Date"]);

    let resultLastWeek = !fieldsData?.dateTime
      ? await filterDate(result, addDays(new Date(), -7))
      : await filterDate(result, addDays(fieldsData?.dateTime, -7));

    resultLastWeek.sort((a, b) => a["Date"] - b["Date"]);

    let per = 0;
    let perLastWeek = 0;

    for (let i = 0; i < result.length; i++) {
      result[i]["TOTAL (L)"] =
        Number(result[i]["TOTAL FLUIDMATIC D2 (L)"]) +
        Number(result[i]["TOTAL AZOLLA ZS 68 (L)"]) +
        Number(result[i]["TOTAL Rubia 15 W 40 (L)"]) +
        Number(result[i]["TOTAL  Carter EP 150 (L)"]) +
        Number(result[i]["TOTAL Carter SH 220 (L)"]);

      per += Number(result[i]["TOTAL (L)"]);
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
      data: result,
    };

    return res.status(200).json(target);
  } catch (error) {
    return res.status(500).json({ messages: error.message });
  }
};

module.exports = logic;
