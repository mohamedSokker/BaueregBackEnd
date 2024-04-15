const { Readable } = require("stream");

const { getAllData } = require("../../../services/mainService");

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

const availability = async (req, res) => {
  try {
    const avData = await getAllData("Availability");

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Transfer-Encoding", "chunked");

    const readableStream = createReadableStream(avData);
    readableStream.pipe(res);

    // return res.status(200).json(avData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { availability };
