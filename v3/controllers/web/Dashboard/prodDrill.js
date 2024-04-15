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

const productionDrill = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss; // Measure memory usage before response
    const Piles = ["Piles"];
    const produrl = process.env.ONEDRIVE_URL;
    const prod = await XlsxAll(produrl);
    let prodDrill = [];
    prod.SheetNames.map((sheetName) => {
      if (Piles.includes(sheetName)) {
        prodDrill = [
          ...prodDrill,
          ...XLSX.utils.sheet_to_json(prod.Sheets[sheetName]),
        ];
      }
    });

    for (let i = 0; i < prodDrill.length; i++) {
      prodDrill[i]["Pouring Finish"] = ExcelDateToJSDate(
        prodDrill[i]["Pouring Finish"]
      );
    }
    prodDrill.sort((a, b) => a["Pouring Finish"] - b["Pouring Finish"]);

    const readableStream = createReadableStream(prodDrill);
    readableStream.pipe(res);

    readableStream.on("data", (chunk) => {});

    readableStream.on("end", () => {
      const memoryUsageAfter = process.memoryUsage().rss;
      const memoryDiff = memoryUsageAfter - memoryUsageBefore;

      console.log(`Prod Drill b ${memoryUsageBefore / (1024 * 1024)} MB`);
      console.log(`Prod Drill a ${memoryDiff / (1024 * 1024)} MB`);
      res.end();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { productionDrill };
