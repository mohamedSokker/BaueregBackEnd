const JSONStream = require("JSONStream");

// const { cache } = require("../../../services/web/Cache/cache");
const { model } = require("../../../model/mainModel");
const { getData } = require("../../../helpers/getData");

const HomeMachLoc = (req, res) => {
  try {
    const body = req.body;

    const memoryUsageBefore = process.memoryUsage().rss;

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["Machinary_Location"]) {
      // Push the large JSON object into the JSONStream serializer
      for (let i = 0; i < model["Machinary_Location"].length; i++) {
        const item = model["Machinary_Location"][i];

        if (item["End_Date"] === null)
          jsonStream.write(model["Machinary_Location"][i]);
      }

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      getData("SELECT * FROM Machinary_Location").then((result) => {
        for (let i = 0; i < result.recordsets[0].length; i++) {
          jsonStream.write(result.recordsets[0][i]);
        }

        // End the JSONStream serializer
        jsonStream.end();
      });
    }

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(
      `HomeMachinary_Location b ${memoryUsageBefore / (1024 * 1024)} MB`
    );
    console.log(`HomeMachinary_Location a ${memoryDiff / (1024 * 1024)} MB`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { HomeMachLoc };
