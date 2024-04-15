const XLSX = require("xlsx");
const XlsxAll = require("../../../../v3/helpers/XlsxAll");
const ExcelDateToJSDate = require("../../../../v3/helpers/ExcelToJsDate");
require("dotenv").config();

const oilConsumption = async (req, res) => {
  try {
    const consurl = process.env.CONSUMPTON_ONEDRIVE_URL;
    const cons = await XlsxAll(consurl);
    const oilCons = XLSX.utils.sheet_to_json(cons.Sheets[`Oil Consumption`]);

    for (let i = 0; i < oilCons.length; i++) {
      oilCons[i]["Date"] = ExcelDateToJSDate(oilCons[i]["Date"]);
    }
    oilCons.sort((a, b) => a["Date"] - b["Date"]);

    const chunkSize = 1024 * 1024; // 1MB chuncks
    let sentBytes = 0;

    const writableStream = new Writable({
      write(chunk, emcoding, callback) {
        sentBytes += chunk.length;
        res.write(chunk);
        callback();
      },
    });

    writableStream.on("finish", () => {
      res.end();
      console.log(`Av Sent ${sentBytes} of data`);
    });

    oilCons.pipe(writableStream);

    // return res.status(200).json(oilCons);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { oilConsumption };
