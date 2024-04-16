const XLSX = require("xlsx");
const XlsxAll = require("../../../../v3/helpers/XlsxAll");
const ExcelDateToJSDate = require("../../../../v3/helpers/ExcelToJsDate");
require("dotenv").config();
const { Readable } = require("stream");
const JSONStream = require("JSONStream");

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

const productionTrench = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss; // Measure memory usage before response
    const Trench = ["DW", "Cut-Off Wall", "Barrettes"];
    const produrl = process.env.ONEDRIVE_URL;
    const prod = await XlsxAll(produrl);
    let prodTrench = [];
    prod.SheetNames.map((sheetName) => {
      if (Trench.includes(sheetName)) {
        prodTrench = [
          ...prodTrench,
          ...XLSX.utils.sheet_to_json(prod.Sheets[sheetName]),
        ];
      }
    });

    for (let i = 0; i < prodTrench.length; i++) {
      prodTrench[i]["Pouring Finish"] = ExcelDateToJSDate(
        prodTrench[i]["Pouring Finish"]
      );
    }
    prodTrench.sort((a, b) => a["Pouring Finish"] - b["Pouring Finish"]);

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Transfer-Encoding", "chunked");

    res.writeHead(200);

    const jsonStream = JSONStream.stringify();

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    // Push the large JSON object into the JSONStream serializer
    prodTrench.forEach((item) => {
      jsonStream.write(item);
    });

    // End the JSONStream serializer
    jsonStream.end();

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`Prod Trench b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`Prod Trench a ${memoryDiff / (1024 * 1024)} MB`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { productionTrench };
