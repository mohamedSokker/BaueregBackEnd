// const { getData } = require("../../../v3/helpers/getData");
// const { getAllData } = require("../../../services/mainService");
const JSONStream = require("JSONStream");

const { getData } = require("../../../helpers/getData");
const { model } = require("../../../model/mainModel");

const getActiveSites = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss;
    // const query = `SELECT *
    // FROM Equipments_Location
    // WHERE End_Date IS NULL`;
    // const eqsTransQuery = `SELECT * FROM EquipmentsTransport`;
    // const result = await getData(`${query} ${eqsTransQuery}`);
    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["Equipments_Location"]) {
      // Push the large JSON object into the JSONStream serializer
      model["Equipments_Location"]
        .filter((item) => item.End_Date === null)
        .forEach((item) => {
          jsonStream.write(item);
        });

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      getData("SELECT * FROM Equipments_Location WHERE End_Date IS NULL").then(
        (result) => {
          result.recordsets[0].forEach((item) => {
            jsonStream.write(item);
          });

          // End the JSONStream serializer
          jsonStream.end();
        }
      );
    }

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`getActiveSites b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`getActiveSites a ${memoryDiff / (1024 * 1024)} MB`);
    // const eqsLoc = await getAllData("Equipments_Location");
    // const eqsTrans = await getAllData("EquipmentsTransport");
    // return res.status(200).json({ eqsLoc: eqsLoc, eqsTrans: eqsTrans });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getActiveSites };
