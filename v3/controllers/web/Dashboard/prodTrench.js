const XLSX = require("xlsx");
const XlsxAll = require("../../../../v3/helpers/XlsxAll");
const ExcelDateToJSDate = require("../../../../v3/helpers/ExcelToJsDate");
require("dotenv").config();
const { Readable } = require("stream");
const JSONStream = require("JSONStream");

const { model } = require("../../../model/mainModel");

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
    // const Trench = ["DW", "Cut-Off Wall", "Barrettes"];
    // const produrl = process.env.ONEDRIVE_URL;
    // const prod = await XlsxAll(produrl);
    // let prodTrench = [];
    // prod.SheetNames.map((sheetName) => {
    //   if (Trench.includes(sheetName)) {
    //     prodTrench = [
    //       ...prodTrench,
    //       ...XLSX.utils.sheet_to_json(prod.Sheets[sheetName]),
    //     ];
    //   }
    // });

    // for (let i = 0; i < prodTrench.length; i++) {
    //   prodTrench[i]["Pouring Finish"] = ExcelDateToJSDate(
    //     prodTrench[i]["Pouring Finish"]
    //   );
    // }
    // prodTrench.sort((a, b) => a["Pouring Finish"] - b["Pouring Finish"]);

    // res.setHeader("Content-Type", "application/json");
    // res.setHeader("Transfer-Encoding", "chunked");

    // res.writeHead(200);

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["prodTrench"]) {
      // Push the large JSON object into the JSONStream serializer
      for (let i = 0; i < model["prodTrench"].length; i++) {
        jsonStream.write(model["prodTrench"][i]);
      }

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      const produrl = process.env.ONEDRIVE_URL;
      await XlsxAll(produrl).then((prod) => {
        for (
          let i = 0;
          i <
          [
            ...XLSX.utils.sheet_to_json(prod.Sheets["DW"]),
            ...XLSX.utils.sheet_to_json(prod.Sheets["Cut-Off Wall"]),
            ...XLSX.utils.sheet_to_json(prod.Sheets["Barrettes"]),
          ].length;
          i++
        ) {
          jsonStream.write(
            [
              ...XLSX.utils.sheet_to_json(prod.Sheets["DW"]),
              ...XLSX.utils.sheet_to_json(prod.Sheets["Cut-Off Wall"]),
              ...XLSX.utils.sheet_to_json(prod.Sheets["Barrettes"]),
            ][i]
          );
        }

        // End the JSONStream serializer
        jsonStream.end();
      });
    }

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`Prod Trench b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`Prod Trench a ${memoryDiff / (1024 * 1024)} MB`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { productionTrench };
