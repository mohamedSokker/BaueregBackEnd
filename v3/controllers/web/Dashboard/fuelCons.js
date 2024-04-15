const XLSX = require("xlsx");
const XlsxAll = require("../../../../v3/helpers/XlsxAll");
const ExcelDateToJSDate = require("../../../../v3/helpers/ExcelToJsDate");
require("dotenv").config();

const fuelConsumption = async (req, res) => {
  try {
    const consurl = process.env.CONSUMPTON_ONEDRIVE_URL;
    const cons = await XlsxAll(consurl);
    const fuelCons = XLSX.utils.sheet_to_json(cons.Sheets[`Fuel Consumption`]);
    for (let i = 0; i < fuelCons.length; i++) {
      fuelCons[i]["Date "] = ExcelDateToJSDate(fuelCons[i]["Date "]);
    }
    fuelCons.sort((a, b) => a["Date "] - b["Date "]);

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

    fuelCons.pipe(writableStream);

    // return res.status(200).json(fuelCons);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { fuelConsumption };
