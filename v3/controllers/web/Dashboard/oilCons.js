const XLSX = require("xlsx");
const XlsxAll = require("../../../../v3/helpers/XlsxAll");
const ExcelDateToJSDate = require("../../../../v3/helpers/ExcelToJsDate");
require("dotenv").config();
const { Readable } = require("stream");
const JSONStream = require("JSONStream");
const { model } = require("../../../model/mainModel");
const { sheerToJson } = require("../../../helpers/sheetToJson");

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

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["oilCons"]) {
      // Push the large JSON object into the JSONStream serializer
      for (let i = 0; i < model["oilCons"].length; i++) {
        jsonStream.write(model["oilCons"][i]);
      }

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      const produrl = process.env.CONSUMPTON_ONEDRIVE_URL;
      await XlsxAll(produrl).then((cons) => {
        for (
          let i = 0;
          i < sheerToJson(cons.Sheets[`Oil Consumption`]).length;
          i++
        ) {
          jsonStream.write(sheerToJson(cons.Sheets[`Oil Consumption`])[i]);
        }

        // End the JSONStream serializer
        jsonStream.end();
      });
    }

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`Oil Cons b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`Oil Cons a ${memoryDiff / (1024 * 1024)} MB`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { oilConsumption };
