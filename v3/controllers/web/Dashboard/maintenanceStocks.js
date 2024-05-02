// const { getAllData } = require("../../../services/mainService");
const { getData } = require("../../../helpers/getData");
const { model } = require("../../../model/mainModel");

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

const maintStocks = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss; // Measure memory usage before response
    // const maintStocksData = await getAllData("Maintenance_Stocks");

    // res.setHeader("Content-Type", "application/json");
    // res.setHeader("Transfer-Encoding", "chunked");

    // res.writeHead(200);

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["Maintenance_StocksDemo"]) {
      // Push the large JSON object into the JSONStream serializer
      for (let i = 0; i < model["Maintenance_StocksDemo"].length; i++) {
        jsonStream.write(model["Maintenance_StocksDemo"][i]);
      }
      model["Maintenance_StocksDemo"].forEach((item) => {
        jsonStream.write(item);
      });

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      getData("SELECT * FROM Maintenance_StocksDemo").then((result) => {
        for (let i = 0; i < result.recordsets[0].length; i++) {
          jsonStream.write(result.recordsets[0][i]);
        }

        // End the JSONStream serializer
        jsonStream.end();
      });
    }

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`Maint Stocks b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`Maint Stocks a ${memoryDiff / (1024 * 1024)} MB`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { maintStocks };
