const JSONStream = require("JSONStream");

const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");

const getWorkshops = async (req, res) => {
  try {
    const bodyData = req.body;

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["WorkShops"]) {
      for (let i = 0; i < model["WorkShops"].length; i++) {
        jsonStream.write(model["WorkShops"][i]);
      }

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      getData("SELECT * FROM WorkShops").then((result) => {
        for (let i = 0; i < result.recordsets[0].length; i++) {
          jsonStream.write(result.recordsets[0][i]);
        }

        // End the JSONStream serializer
        jsonStream.end();
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getWorkshops };
