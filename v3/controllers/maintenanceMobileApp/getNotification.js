// const { getData } = require("../../../functions/getData");
// const { getAllData } = require("../../services/mainService");

const JSONStream = require("JSONStream");

const { getData } = require("../../helpers/getData");
const { model } = require("../../model/mainModel");

const getNotification = async (req, res) => {
  try {
    const { username } = req.query;
    // const allData = await getAllData(`AppMaintNotification`);
    // const result = allData.filter(
    //   (item) => item.ToUser === username && item.Sent === "false"
    // );

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    const query = `SELECT * FROM AppMaintNotification WHERE ToUser = '${username}' AND Sent = 'false' ORDER BY ID DESC`;

    if (model["AppMaintNotification"]) {
      // Push the large JSON object into the JSONStream serializer
      for (
        let i = 0;
        i <
        model["AppMaintNotification"].filter(
          (item) => item.ToUser === username && item.Sent === "false"
        ).length;
        i++
      ) {
        jsonStream.write(
          model["AppMaintNotification"].filter(
            (item) => item.ToUser === username && item.Sent === "false"
          )[i]
        );
      }

      // End the JSONStream serializer
      jsonStream.end();
    } else {
      getData(query).then((result) => {
        for (let i = 0; i < result.recordsets[0].length; i++) {
          jsonStream.write(result.recordsets[0][i]);
        }

        // End the JSONStream serializer
        jsonStream.end();
      });
    }
    // const query = `SELECT * FROM AppMaintNotification WHERE ToUser = '${username}' AND Sent = 'false' ORDER BY ID DESC`;
    // const result = await getData(query);
    // return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getNotification };
