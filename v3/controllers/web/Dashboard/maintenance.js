const { getAllData } = require("../../../services/mainService");
const XLSX = require("xlsx");
const { Readable } = require("stream");
const XlsxAll = require("../../../../v3/helpers/XlsxAll");
const ExcelDateToJSDate = require("../../../../v3/helpers/ExcelToJsDate");
require("dotenv").config();

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

const maintenance = async (req, res) => {
  try {
    const maintData = await getAllData("Maintenance");

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Transfer-Encoding", "chunked");

    const readableStream = createReadableStream(maintData);
    readableStream.pipe(res);

    // return res.status(200).json(maintData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { maintenance };
