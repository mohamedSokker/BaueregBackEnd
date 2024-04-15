const { getAllData } = require("../../../services/mainService");
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

const maintenance = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss; // Measure memory usage before response

    const maintData = await getAllData("Maintenance");

    const readableStream = createReadableStream(maintData);
    readableStream.pipe(res);

    readableStream.on("data", (chunk) => {});

    readableStream.on("end", () => {
      const memoryUsageAfter = process.memoryUsage().rss;
      const memoryDiff = memoryUsageAfter - memoryUsageBefore;

      console.log(`Maintenance b ${memoryUsageBefore / (1024 * 1024)} MB`);
      console.log(`Maintenance a ${memoryDiff / (1024 * 1024)} MB`);
      res.end();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { maintenance };
