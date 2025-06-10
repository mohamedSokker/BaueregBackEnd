// const { getData } = require("../../../functions/getData");
// const { getAllData } = require("../../services/mainService");

const JSONStream = require("JSONStream");

const { getData } = require("../../helpers/getData");
const { model } = require("../../model/mainModel");

const getReports = async (req, res) => {
  try {
    const { Location } = req.body;

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["AppMaintMaintenance"]) {
      const filteredData = model["AppMaintMaintenance"].filter((item) => {
        // console.log(item);
        return Location.some((loc) => loc.includes(item.Location));
      });
      // Push the large JSON object into the JSONStream serializer
      for (let i = 0; i < filteredData.length; i++) {
        jsonStream.write(filteredData[i]);
      }

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      let locQuery = ``;
      for (let i = 0; i < Location.length; i++) {
        if (Location.length === 1) {
          locQuery += ` (Location LIKE '%${Location[i]}%')`;
        } else {
          if (i === 0) {
            locQuery += ` (Location LIKE '%${Location[i]}%'`;
          } else if (i === Location.length - 1) {
            locQuery += ` OR Location LIKE '%${Location[i]}%')`;
          } else {
            locQuery += ` OR Location LIKE '%${Location[i]}%'`;
          }
        }
      }
      const query = `SELECT * FROM AppMaintMaintenance WHERE ${locQuery} ORDER BY ID DESC`;

      getData(query).then((result) => {
        for (let i = 0; i < result.recordsets[0].length; i++) {
          jsonStream.write(result.recordsets[0][i]);
        }

        // End the JSONStream serializer
        jsonStream.end();
      });
    }
    // const allData = await getAllData("AppMaintMaintenance");

    // const filteredResult = allData.filter((item) =>
    //   Location.some((loc) => loc.includes(item.Location))
    // );
    // const result = filteredResult.sort((a, b) => Number(b.ID) - Number(a.ID));
    // const result = await getData(query);
    // return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getReports };
