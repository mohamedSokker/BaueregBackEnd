const JSONStream = require("JSONStream");

// const { cache } = require("../../../services/web/Cache/cache");
const { model } = require("../../../model/mainModel");
const { getData } = require("../../../helpers/getData");

const HomeFuelConsumption = (req, res) => {
  try {
    const body = req.body;

    const memoryUsageBefore = process.memoryUsage().rss;

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["FuelConsumption"]) {
      const now = new Date();
      const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      // Push the large JSON object into the JSONStream serializer
      for (let i = 0; i < model["FuelConsumption"].length; i++) {
        const item = model["FuelConsumption"][i];
        const currentDate = new Date(item["Date"]);

        if (
          currentDate >= lastMonth &&
          currentDate <= now &&
          body?.Sites?.map((site) => site?.name).includes(item.Location)
        )
          jsonStream.write(model["FuelConsumption"][i]);
      }

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      getData("SELECT * FROM FuelConsumption").then((result) => {
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
      `HomeFuelConsumption b ${memoryUsageBefore / (1024 * 1024)} MB`
    );
    console.log(`HomeFuelConsumption a ${memoryDiff / (1024 * 1024)} MB`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { HomeFuelConsumption };
