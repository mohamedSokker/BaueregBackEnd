// const { getData } = require("../../../helpers/getData");
// const { getAllData } = require("../../../services/mainService");
const JSONStream = require("JSONStream");

const { getData } = require("../../../helpers/getData");
const { model } = require("../../../model/mainModel");

const getActiveMachinary = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss;

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["Machinary"]) {
      // Push the large JSON object into the JSONStream serializer
      model["Machinary"]
        // .filter((item) => item.End_Date === null)
        .forEach((result) => {
          jsonStream.write(result);
        });

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      getData(`SELECT * FROM Machinary`).then((result) => {
        result.recordsets[0].forEach((item) => {
          jsonStream.write(item);
        });

        // End the JSONStream serializer
        jsonStream.end();
      });
    }

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`getActiveMachinary b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`getActiveMachinary a ${memoryDiff / (1024 * 1024)} MB`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getActiveMachinary };
