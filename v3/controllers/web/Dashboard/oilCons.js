const XLSX = require("xlsx");
const XlsxAll = require("../../../../v3/helpers/XlsxAll");
const ExcelDateToJSDate = require("../../../../v3/helpers/ExcelToJsDate");
require("dotenv").config();
const { Readable } = require("stream");

function createReadableStream(data) {
  return new Readable({
    objectMode: true,
    read() {
      data.forEach((item) => {
        this.push(JSON.stringify(item) + ",");
      });
      this.push(null);
    },
  });
}

const oilConsumption = async (req, res) => {
  try {
    const consurl = process.env.CONSUMPTON_ONEDRIVE_URL;
    const cons = await XlsxAll(consurl);
    const oilCons = XLSX.utils.sheet_to_json(cons.Sheets[`Oil Consumption`]);

    for (let i = 0; i < oilCons.length; i++) {
      oilCons[i]["Date"] = ExcelDateToJSDate(oilCons[i]["Date"]);
    }
    oilCons.sort((a, b) => a["Date"] - b["Date"]);

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Transfer-Encoding", "chunked");

    const readableStream = createReadableStream(oilCons);
    readableStream.pipe(res);

    // return res.status(200).json(oilCons);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { oilConsumption };
