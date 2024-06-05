// const { getData } = require("../../../helpers/getData");
// const { getAllData } = require("../../../services/mainService");
const JSONStream = require("JSONStream");

const { getData } = require("../../../helpers/getData");
const { model } = require("../../../model/mainModel");

const getActiveSites = async (req, res) => {
  try {
    const memoryUsageBefore = process.memoryUsage().rss;

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["Equipments_Location"]) {
      // Push the large JSON object into the JSONStream serializer
      if (model["Bauer_Equipments"]) {
        model["Equipments_Location"]
          // .filter((item) => item.End_Date === null)
          .forEach((result) => {
            jsonStream.write({
              ...result,
              Equipment_Model: model["Bauer_Equipments"].find(
                (eq) => eq.Equipment === result.Equipment
              )?.Equipment_Model,
            });
          });
      } else {
        const query = `SELECT * FROM Bauer_Equipments`;
        getData(query).then((eqs) => {
          model["Equipments_Location"]
            // .filter((item) => item.End_Date === null)
            .forEach((result) => {
              jsonStream.write({
                ...result,
                Equipment_Model: eqs.recordsets[0].find(
                  (eq) => eq.Equipment === result.Equipment
                )?.Equipment_Model,
              });
            });
        });
      }

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      getData(`SELECT
     Equipments_Location.Location,
     Equipments_Location.Equipment_Type,
     Bauer_Equipments.Equipment_Model,
     Equipments_Location.Equipment
     FROM Equipments_Location
     JOIN Bauer_Equipments
     ON (Equipments_Location.Equipment = Bauer_Equipments.Equipment)
     `).then((result) => {
        result.recordsets[0].forEach((item) => {
          jsonStream.write(item);
        });

        // End the JSONStream serializer
        jsonStream.end();
      });
    }

    const memoryUsageAfter = process.memoryUsage().rss;
    const memoryDiff = memoryUsageAfter - memoryUsageBefore;

    console.log(`getActiveSites b ${memoryUsageBefore / (1024 * 1024)} MB`);
    console.log(`getActiveSites a ${memoryDiff / (1024 * 1024)} MB`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getActiveSites };
