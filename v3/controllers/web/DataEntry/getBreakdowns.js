// const { getData } = require("../../../helpers/getData");
// const { getAllData } = require("../../../services/mainService");
const JSONStream = require("JSONStream");

const { getData } = require("../../../helpers/getData");
const { model } = require("../../../model/mainModel");

const getBreakdowns = async (req, res) => {
  try {
    // const allBreakdownTypes = await getAllData("Bauer_Breakdown");
    const memoryUsageBefore = process.memoryUsage().rss;

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["Bauer_Breakdown"]) {
      // Push the large JSON object into the JSONStream serializer
      model["Bauer_Breakdown"].forEach((item) => {
        jsonStream.write(item);
      });

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      getData("SELECT * FROM Bauer_Breakdown").then((result) => {
        result.recordsets[0].forEach((item) => {
          jsonStream.write(item);
        });

        // End the JSONStream serializer
        jsonStream.end();
      });
    }

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`Bauer_Breakdown b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`Bauer_Breakdown a ${memoryDiff / (1024 * 1024)} MB`);
    // return res
    //   .status(200)
    //   .json({ sitesResult, usersResult, allBreakdownTypes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getBreakdowns };
