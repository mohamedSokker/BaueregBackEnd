const { getAllData } = require("../../../services/mainService");
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

const maintStocks = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss; // Measure memory usage before response
    const maintStocksData = await getAllData("Maintenance_Stocks");

    const readableStream = createReadableStream(maintStocksData);
    readableStream.pipe(res);

    readableStream.on("data", (chunk) => {});

    readableStream.on("end", () => {
      const memoryUsageAfter = process.memoryUsage().rss;
      const memoryDiff = memoryUsageAfter - memoryUsageBefore;

      console.log(`Maint Stocks b ${memoryUsageBefore / (1024 * 1024)} MB`);
      console.log(`Maint Stocks a ${memoryDiff / (1024 * 1024)} MB`);
      res.end();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { maintStocks };
