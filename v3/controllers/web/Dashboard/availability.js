const { Readable } = require("stream");
const { streamArray } = require("stream-json/streamers/StreamArray");

const { getAllData } = require("../../../services/mainService");

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

const availability = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss;
    const avData = await getAllData("Availability");

    const readableStream = createReadableStream(avData);
    readableStream.pipe(res);

    readableStream.on("data", (chunk) => {});

    readableStream.on("end", () => {
      const memoryUsageAfter = process.memoryUsage().rss;
      const memoryDiff = memoryUsageAfter - memoryUsageBefore;

      console.log(`Availability b ${memoryUsageBefore / (1024 * 1024)} MB`);
      console.log(`Availability a ${memoryDiff / (1024 * 1024)} MB`);
      res.end();
    });

    // res.status(200).json(avData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { availability };
