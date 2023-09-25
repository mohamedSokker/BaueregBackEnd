const XLSX = require("xlsx");
const XlsxAll = require("../../../functions/XlsxAll");
const ExcelDateToJSDate = require("../../../functions/ExcelToJsDate");
const addDays = require("../../../Logic/globalFunction/addDays");

const Trench = ["DW", "Cut-Off Wall", "Barrettes"];
const Piles = ["Piles"];

const filterDate = async (data, date) => {
  if (date) {
    return data.filter((d) => new Date(d["Pouring Finish"]) < new Date(date));
  } else {
    return data;
  }
};

const eqsFilter = async (data, eqs) => {
  return data.filter((d) => eqs.includes(d["# Machine"]));
};

const filterFilter = async (result, filter, Type) => {
  let data = [];
  if (!filter && Type === "Trench_Cutting_Machine") {
    result.SheetNames.map((sheetName) => {
      if (Trench.includes(sheetName)) {
        data = [...data, ...XLSX.utils.sheet_to_json(result.Sheets[sheetName])];
      }
    });
  } else if (!filter && Type === "Drilling_Machine") {
    result.SheetNames.map((sheetName) => {
      if (Piles.includes(sheetName)) {
        data = [...data, ...XLSX.utils.sheet_to_json(result.Sheets[sheetName])];
      }
    });
  } else {
    data = XLSX.utils.sheet_to_json(result.Sheets[filter]);
  }
  return data;
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

    const url = process.env.ONEDRIVE_URL;
    let result = await XlsxAll(url);

    result = await filterFilter(result, fieldsData?.filter, fieldsData?.Type);
    result = await eqsFilter(result, eqs);

    for (let i = 0; i < result.length; i++) {
      result[i]["Pouring Finish"] = ExcelDateToJSDate(
        result[i]["Pouring Finish"]
      );
    }

    result = await filterDate(result, fieldsData?.dateTime);

    let resultLastWeek = await filterDate(result, addDays(new Date(), -7));

    let per = 0;
    let perLastWeek = 0;

    for (let i = 0; i < result.length; i++) {
      if (fieldsData?.Type === "Trench_Cutting_Machine") {
        per += Number(result[i]["Actual M2"]);
      } else {
        per += Number(result[i]["Actual Depth"]);
      }
    }

    for (let i = 0; i < resultLastWeek.length; i++) {
      if (fieldsData?.Type === "Trench_Cutting_Machine") {
        perLastWeek += Number(resultLastWeek[i]["Actual M2"]);
      } else {
        perLastWeek += Number(resultLastWeek[i]["Actual Depth"]);
      }
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
