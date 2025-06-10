// const { getData } = require("../../functions/getData");
// const { getAllData } = require("../../services/mainService");

const JSONStream = require("JSONStream");

const { getData } = require("../../helpers/getData");
const { model } = require("../../model/mainModel");

const getAllEq = async (req, res) => {
  try {
    // const allData = await getAllData("Equipments_Location");
    // const result = allData.filter((item) => item.End_Date === null);

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["Equipments_Location"]) {
      // Push the large JSON object into the JSONStream serializer
      for (
        let i = 0;
        i <
        model["Equipments_Location"].filter((item) => item.End_Date === null)
          .length;
        i++
      ) {
        jsonStream.write(
          model["Equipments_Location"].filter((item) => item.End_Date === null)[
            i
          ]
        );
      }

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      getData("SELECT * FROM Equipments_Location WHERE ENd_Date IS NULL").then(
        (result) => {
          for (let i = 0; i < result.recordsets[0].length; i++) {
            jsonStream.write(result.recordsets[0][i]);
          }

          // End the JSONStream serializer
          jsonStream.end();
        }
      );
    }
    // const query = `SELECT * FROM Equipments_Location WHERE ENd_Date IS NULL`;
    // const result = await getData(query);
    // return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllEq };
