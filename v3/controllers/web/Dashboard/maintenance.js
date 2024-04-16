const { getAllData } = require("../../../services/mainService");

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

    const maintData = await getAllData("Maintenance");

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Transfer-Encoding", "chunked");

    res.writeHead(200);

    const jsonStream = JSONStream.stringify();

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    // Push the large JSON object into the JSONStream serializer
    maintData.forEach((item) => {
      jsonStream.write(item);
    });

    // End the JSONStream serializer
    jsonStream.end();

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`Maintenance b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`Maintenance a ${memoryDiff / (1024 * 1024)} MB`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { maintenance };
