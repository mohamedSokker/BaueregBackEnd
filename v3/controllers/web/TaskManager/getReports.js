// const { getData } = require("../../../helpers/getData");
// const { getAllData } = require("../../../services/mainService");
const JSONStream = require("JSONStream");

const { getData } = require("../../../helpers/getData");
const { model } = require("../../../model/mainModel");

const getReports = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss;
    // const query = `SELECT * FROM TaskManagerReports`;
    // const data = (await getData(query)).recordsets[0];
    // const data = await getAllData("TaskManagerReports");
    // return res.status(200).json(data);
    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["TaskManagerReports"]) {
      // Push the large JSON object into the JSONStream serializer
      model["TaskManagerReports"].forEach((item) => {
        jsonStream.write(item);
      });

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      getData("SELECT * FROM TaskManagerReports").then((result) => {
        result.recordsets[0].forEach((item) => {
          jsonStream.write(item);
        });

        // End the JSONStream serializer
        jsonStream.end();
      });
    }

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`getReports b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`getReports a ${memoryDiff / (1024 * 1024)} MB`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getReports };
