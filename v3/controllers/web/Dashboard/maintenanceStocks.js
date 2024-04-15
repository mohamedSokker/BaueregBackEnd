const { getAllData } = require("../../../services/mainService");
const { Readable } = require("stream");

function createReadableStream(data) {
  return new Readable({
    objectMode: true,
    read() {
      data.forEach((item) => {
        this.push(JSON.stringify(item) + "\n");
      });
      this.push(null);
    },
  });
}

const maintStocks = async (req, res) => {
  try {
    const maintStocksData = await getAllData("Maintenance_Stocks");

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Transfer-Encoding", "chunked");

    const readableStream = createReadableStream(maintStocksData);
    readableStream.pipe(res);

    // return res.status(200).json(maintStocksData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { maintStocks };
