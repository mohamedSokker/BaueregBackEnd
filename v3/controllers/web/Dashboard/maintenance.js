const { getAllData } = require("../../../services/mainService");
const XLSX = require("xlsx");
const XlsxAll = require("../../../../v3/helpers/XlsxAll");
const ExcelDateToJSDate = require("../../../../v3/helpers/ExcelToJsDate");
require("dotenv").config();

const maintenance = async (req, res) => {
  try {
    const maintData = await getAllData("Maintenance");

    return res.status(200).json(maintData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { maintenance };
