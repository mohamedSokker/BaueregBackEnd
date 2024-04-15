const XLSX = require("xlsx");
const XlsxAll = require("../../../../v3/helpers/XlsxAll");
const ExcelDateToJSDate = require("../../../../v3/helpers/ExcelToJsDate");
require("dotenv").config();

const productionTrench = async (req, res) => {
  try {
    const Trench = ["DW", "Cut-Off Wall", "Barrettes"];
    const produrl = process.env.ONEDRIVE_URL;
    const prod = await XlsxAll(produrl);
    let prodTrench = [];
    prod.SheetNames.map((sheetName) => {
      if (Trench.includes(sheetName)) {
        prodTrench = [
          ...prodTrench,
          ...XLSX.utils.sheet_to_json(prod.Sheets[sheetName]),
        ];
      }
    });

    for (let i = 0; i < prodTrench.length; i++) {
      prodTrench[i]["Pouring Finish"] = ExcelDateToJSDate(
        prodTrench[i]["Pouring Finish"]
      );
    }
    prodTrench.sort((a, b) => a["Pouring Finish"] - b["Pouring Finish"]);

    return res.status(200).json(prodTrench);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { productionTrench };
