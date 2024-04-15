const XLSX = require("xlsx");
const XlsxAll = require("../../../../v3/helpers/XlsxAll");
const ExcelDateToJSDate = require("../../../../v3/helpers/ExcelToJsDate");
require("dotenv").config();

const productionDrill = async (req, res) => {
  try {
    const Piles = ["Piles"];
    const produrl = process.env.ONEDRIVE_URL;
    const prod = await XlsxAll(produrl);
    let prodDrill = [];
    prod.SheetNames.map((sheetName) => {
      if (Piles.includes(sheetName)) {
        prodDrill = [
          ...prodDrill,
          ...XLSX.utils.sheet_to_json(prod.Sheets[sheetName]),
        ];
      }
    });

    for (let i = 0; i < prodDrill.length; i++) {
      prodDrill[i]["Pouring Finish"] = ExcelDateToJSDate(
        prodDrill[i]["Pouring Finish"]
      );
    }
    prodDrill.sort((a, b) => a["Pouring Finish"] - b["Pouring Finish"]);

    return res.status(200).json(prodDrill);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { productionDrill };
