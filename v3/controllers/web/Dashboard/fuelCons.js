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

    const readableStream = createReadableStream(fuelCons);
    readableStream.pipe(res);

    readableStream.on("data", (chunk) => {});

    readableStream.on("end", () => {
      const memoryUsageAfter = process.memoryUsage().rss;
      const memoryDiff = memoryUsageAfter - memoryUsageBefore;

      console.log(`Fuel Cons b ${memoryUsageBefore / (1024 * 1024)} MB`);
      console.log(`Fuel Cons a ${memoryDiff / (1024 * 1024)} MB`);
      res.end();
    });

    // res.status(200).json(fuelCons);

    const memoryUsageAfter = process.memoryUsage().rss; // Measure memory usage after response
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(
      `Fuel Cons Memory usage for /my-endpoint: ${
        memoryDiff / (1024 * 1024)
      } MB`
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { fuelConsumption };
