const XLSX = require("xlsx");
const { Readable } = require("stream");
const JSONStream = require("JSONStream");

const XlsxAll = require("../../../../v3/helpers/XlsxAll");
const ExcelDateToJSDate = require("../../../../v3/helpers/ExcelToJsDate");
require("dotenv").config();

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

const fuelConsumption = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss; // Measure memory usage before response

    const consurl = process.env.CONSUMPTON_ONEDRIVE_URL;
    const cons = await XlsxAll(consurl);
    const fuelCons = XLSX.utils.sheet_to_json(cons.Sheets[`Fuel Consumption`]);
    for (let i = 0; i < fuelCons.length; i++) {
      fuelCons[i]["Date "] = ExcelDateToJSDate(fuelCons[i]["Date "]);
    }
    fuelCons.sort((a, b) => a["Date "] - b["Date "]);

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Transfer-Encoding", "chunked");

    res.writeHead(200);

    const jsonStream = JSONStream.stringify();

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    // Push the large JSON object into the JSONStream serializer
    fuelCons.forEach((item) => {
      jsonStream.write(item);
    });

    // End the JSONStream serializer
    jsonStream.end();

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`Fuel Cons b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`Fuel Cons a ${memoryDiff / (1024 * 1024)} MB`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { fuelConsumption };
