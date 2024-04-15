const { getAllData } = require("../../../services/mainService");

const maintStocks = async (req, res) => {
  try {
    const maintStocksData = await getAllData("Maintenance_Stocks");

    const chunkSize = 1024 * 1024; // 1MB chuncks
    let sentBytes = 0;

    const writableStream = new Writable({
      write(chunk, emcoding, callback) {
        sentBytes += chunk.length;
        res.write(chunk);
        callback();
      },
    });

    writableStream.on("finish", () => {
      res.end();
      console.log(`Av Sent ${sentBytes} of data`);
    });

    maintStocksData.pipe(writableStream);

    // return res.status(200).json(maintStocksData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { maintStocks };
