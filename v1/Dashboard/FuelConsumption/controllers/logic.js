const XLSX = require("xlsx");
const XlsxAll = require("../../../../v3/helpers/XlsxAll");
const ExcelDateToJSDate = require("../../../../v3/helpers/ExcelToJsDate");
const addDays = require("../../../Logic/globalFunction/addDays");

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
  return XLSX.utils.sheet_to_json(result.Sheets[`Fuel Consumption`]);
};

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;
    const perEqs = fieldsData?.usersData[0]?.roles?.Editor?.Equipments.concat(
      fieldsData?.usersData[0]?.roles?.User?.Equipments
    );

    let eqs = [];
    for (let j = 0; j < perEqs.length; j++) {
      eqs.push(perEqs[j].name);
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
      per += Number(result[i]["Fuel Consumption Quantity (Liter)"]);
    }

    for (let i = 0; i < resultLastWeek.length; i++) {
      perLastWeek += Number(
        resultLastWeek[i]["Fuel Consumption Quantity (Liter)"]
      );
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
