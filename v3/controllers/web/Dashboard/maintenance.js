const { getAllData } = require("../../../services/mainService");
const XLSX = require("xlsx");
const XlsxAll = require("../../../../v3/helpers/XlsxAll");
const ExcelDateToJSDate = require("../../../../v3/helpers/ExcelToJsDate");
require("dotenv").config();

const maintenance = async (req, res) => {
  try {
    const maintData = await getAllData("Maintenance");

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

    maintData.pipe(writableStream);

    // return res.status(200).json(maintData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { maintenance };
