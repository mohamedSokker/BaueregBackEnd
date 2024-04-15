const XLSX = require("xlsx");
const { Readable } = require("stream");

const XlsxAll = require("../../../../v3/helpers/XlsxAll");
const ExcelDateToJSDate = require("../../../../v3/helpers/ExcelToJsDate");
require("dotenv").config();

function createReadableStream(data) {
  return new Readable({
    objectMode: true,
    read() {
      data.forEach((item) => {
        this.push(JSON.stringify(item) + "\n");
      });
      this.push(null);
    },
  });
}

const fuelConsumption = async (req, res) => {
  try {
    const consurl = process.env.CONSUMPTON_ONEDRIVE_URL;
    const cons = await XlsxAll(consurl);
    const fuelCons = XLSX.utils.sheet_to_json(cons.Sheets[`Fuel Consumption`]);
    for (let i = 0; i < fuelCons.length; i++) {
      fuelCons[i]["Date "] = ExcelDateToJSDate(fuelCons[i]["Date "]);
    }
    fuelCons.sort((a, b) => a["Date "] - b["Date "]);

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Transfer-Encoding", "chunked");

    const readableStream = createReadableStream(fuelCons);
    readableStream.pipe(res);

    // return res.status(200).json(fuelCons);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { fuelConsumption };
