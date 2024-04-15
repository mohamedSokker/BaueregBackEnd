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
    const memoryUsageBefore = process.memoryUsage().rss; // Measure memory usage before response
    const consurl = process.env.CONSUMPTON_ONEDRIVE_URL;
    const cons = await XlsxAll(consurl);
    const oilCons = XLSX.utils.sheet_to_json(cons.Sheets[`Oil Consumption`]);

    for (let i = 0; i < oilCons.length; i++) {
      oilCons[i]["Date"] = ExcelDateToJSDate(oilCons[i]["Date"]);
    }
    oilCons.sort((a, b) => a["Date"] - b["Date"]);

    const readableStream = createReadableStream(oilCons);
    readableStream.pipe(res);

    readableStream.on("data", (chunk) => {});

    readableStream.on("end", () => {
      const memoryUsageAfter = process.memoryUsage().rss;
      const memoryDiff = memoryUsageAfter - memoryUsageBefore;

      console.log(`Oil Cons b ${memoryUsageBefore / (1024 * 1024)} MB`);
      console.log(`Oil Cons a ${memoryDiff / (1024 * 1024)} MB`);
      res.end();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { oilConsumption };
