const { Readable } = require("stream");
// const { streamArray } = require("stream-json/streamers/StreamArray");
// const { io } = require("../../../socket/socket");
const JSONStream = require("JSONStream");

// const { getAllData } = require("../../../services/mainService");
const { getData } = require("../../../helpers/getData");
const { model } = require("../../../model/mainModel");

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
    // const avData = await getAllData("Availability");

    // res.setHeader("Content-Type", "application/json");
    // res.setHeader("Transfer-Encoding", "chunked");

    // res.writeHead(200);

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["Availability"]) {
      // Push the large JSON object into the JSONStream serializer
      model["Availability"].forEach((item) => {
        jsonStream.write(item);
      });

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      getData("SELECT * FROM Availability").then((result) => {
        result.recordsets[0].forEach((item) => {
          jsonStream.write(item);
        });

        // End the JSONStream serializer
        jsonStream.end();
      });
    }

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`Availability b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`Availability a ${memoryDiff / (1024 * 1024)} MB`);

    // const readableStream = createReadableStream(avData);
    // // readableStream.pipe(res);

    // readableStream.on("data", (chunk) => {
    //   io.emit("avData", chunk);
    // });

    // readableStream.on("end", () => {
    //   const memoryUsageAfter = process.memoryUsage().rss;
    //   const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    //   console.log(`Availability b ${memoryUsageBefore / (1024 * 1024)} MB`);
    //   console.log(`Availability a ${memoryDiff / (1024 * 1024)} MB`);
    //   // res.end();
    // });

    // res.status(200).json(avData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { availability };
