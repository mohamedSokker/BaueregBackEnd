// const { getAllData } = require("../../../services/mainService");
const { getData } = require("../../../helpers/getData");
const { model } = require("../../../model/mainModel");

const { Readable } = require("stream");
require("dotenv").config();
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

const maintenance = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss; // Measure memory usage before response

    // const maintData = await getAllData("Maintenance");

    // res.setHeader("Content-Type", "application/json");
    // res.setHeader("Transfer-Encoding", "chunked");

    // res.writeHead(200);

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["Maintenance"]) {
      // Push the large JSON object into the JSONStream serializer
      for (let i = 0; i < model["Maintenance"].length; i++) {
        jsonStream.write(model["Maintenance"][i]);
      }

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      getData("SELECT * FROM Maintenance").then((result) => {
        for (let i = 0; i < result.recordsets[0].length; i++) {
          jsonStream.write(result.recordsets[0][i]);
        }

        // End the JSONStream serializer
        jsonStream.end();
      });
    }

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`Maintenance b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`Maintenance a ${memoryDiff / (1024 * 1024)} MB`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { maintenance };
