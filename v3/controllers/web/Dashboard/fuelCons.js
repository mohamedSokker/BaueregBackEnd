const XLSX = require("xlsx");
const { Readable } = require("stream");
const JSONStream = require("JSONStream");

const XlsxAll = require("../../../../v3/helpers/XlsxAll");
const ExcelDateToJSDate = require("../../../../v3/helpers/ExcelToJsDate");
require("dotenv").config();
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

const fuelConsumption = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss; // Measure memory usage before response

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["FuelConsumption"]) {
      // Push the large JSON object into the JSONStream serializer
      for (let i = 0; i < model["FuelConsumption"].length; i++) {
        jsonStream.write(model["FuelConsumption"][i]);
      }

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      getData("SELECT * FROM FuelConsumption").then((result) => {
        for (let i = 0; i < result.recordsets[0].length; i++) {
          jsonStream.write(result.recordsets[0][i]);
        }

        // End the JSONStream serializer
        jsonStream.end();
      });
      // const produrl = process.env.CONSUMPTON_ONEDRIVE_URL;
      // await XlsxAll(produrl).then((cons) => {
      //   for (
      //     let i = 0;
      //     i < sheerToJson(cons.Sheets[`Fuel Consumption`]).length;
      //     i++
      //   ) {
      //     jsonStream.write(sheerToJson(cons.Sheets[`Fuel Consumption`])[i]);
      //   }

      //   // End the JSONStream serializer
      //   jsonStream.end();
      // });
    }

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`Fuel Cons b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`Fuel Cons a ${memoryDiff / (1024 * 1024)} MB`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { fuelConsumption };
