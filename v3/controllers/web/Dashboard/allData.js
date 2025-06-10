const { getAllData } = require("../../../services/mainService");
const XLSX = require("xlsx");
const XlsxAll = require("../../../../v3/helpers/XlsxAll");
const ExcelDateToJSDate = require("../../../../v3/helpers/ExcelToJsDate");
const { sheerToJson } = require("../../../helpers/sheetToJson");
require("dotenv").config();

const allData = async (req, res) => {
  try {
    const avData = await getAllData("Availability");
    const maintData = await getAllData("Maintenance");
    const maintStocksData = await getAllData("Maintenance_Stocks");
    const consurl = process.env.CONSUMPTON_ONEDRIVE_URL;
    const cons = await XlsxAll(consurl);
    const fuelCons = sheerToJson(cons.Sheets[`Fuel Consumption`]);
    const oilCons = sheerToJson(cons.Sheets[`Oil Consumption`]);
    for (let i = 0; i < fuelCons.length; i++) {
      fuelCons[i]["Date "] = ExcelDateToJSDate(fuelCons[i]["Date "]);
    }
    fuelCons.sort((a, b) => a["Date "] - b["Date "]);
    for (let i = 0; i < oilCons.length; i++) {
      oilCons[i]["Date"] = ExcelDateToJSDate(oilCons[i]["Date"]);
    }
    oilCons.sort((a, b) => a["Date"] - b["Date"]);

    const Trench = ["DW", "Cut-Off Wall", "Barrettes"];
    const Piles = ["Piles"];
    const produrl = process.env.ONEDRIVE_URL;
    const prod = await XlsxAll(produrl);
    let prodDrill = [];
    let prodTrench = [];
    prod.SheetNames.map((sheetName) => {
      if (Piles.includes(sheetName)) {
        prodDrill = [...prodDrill, ...sheerToJson(prod.Sheets[sheetName])];
      }
      if (Trench.includes(sheetName)) {
        prodTrench = [...prodTrench, ...sheerToJson(prod.Sheets[sheetName])];
      }
    });

    for (let i = 0; i < prodTrench.length; i++) {
      prodTrench[i]["Pouring Finish"] = ExcelDateToJSDate(
        prodTrench[i]["Pouring Finish"]
      );
    }
    prodTrench.sort((a, b) => a["Pouring Finish"] - b["Pouring Finish"]);

    for (let i = 0; i < prodDrill.length; i++) {
      prodDrill[i]["Pouring Finish"] = ExcelDateToJSDate(
        prodDrill[i]["Pouring Finish"]
      );
    }
    prodDrill.sort((a, b) => a["Pouring Finish"] - b["Pouring Finish"]);

    const data = {
      avData: avData,
      maintData: maintData,
      maintStocksData: maintStocksData,
      fuelCons: fuelCons,
      oilCons: oilCons,
      prodDrill: prodDrill,
      prodTrench: prodTrench,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { allData };
