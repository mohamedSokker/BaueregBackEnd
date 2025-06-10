// const { getData } = require("../../../functions/getData");
// const { getAllData } = require("../../services/mainService");

const JSONStream = require("JSONStream");

const { getData } = require("../../helpers/getData");
const { model } = require("../../model/mainModel");

const getEquipments = async (req, res) => {
  try {
    const bodyData = req.body;
    const Location = JSON.parse(bodyData.Location);

    // const allData = await getAllData("Equipments_Location");

    // const result = allData.filter(
    //   (item) =>
    //     Location.includes(item.Location) &&
    //     item.End_Date === null &&
    //     item.Equipment_Type === bodyData.Equipment_Type
    // );

    let locQuery = ``;
    for (let i = 0; i < Location.length; i++) {
      if (Location.length === 1) {
        locQuery += ` (Location = '${Location[i]}')`;
      } else {
        if (i === 0) {
          locQuery += ` (Location = '${Location[i]}'`;
        } else if (i === Location.length - 1) {
          locQuery += ` OR Location = '${Location[i]}')`;
        } else {
          locQuery += ` OR Location = '${Location[i]}'`;
        }
      }
    }
    const query = `SELECT * FROM Equipments_Location WHERE ${locQuery}
                    AND End_Date IS NULL AND Equipment_Type = '${bodyData.Equipment_Type}'`;

    const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

    // Pipe the large JSON object to the JSONStream serializer
    jsonStream.pipe(res);

    if (model["Equipments_Location"]) {
      // Push the large JSON object into the JSONStream serializer
      for (
        let i = 0;
        i <
        model["Equipments_Location"].filter(
          (item) =>
            Location.includes(item.Location) &&
            item.End_Date === null &&
            item.Equipment_Type === bodyData.Equipment_Type
        ).length;
        i++
      ) {
        jsonStream.write(
          model["Equipments_Location"].filter(
            (item) =>
              Location.includes(item.Location) &&
              item.End_Date === null &&
              item.Equipment_Type === bodyData.Equipment_Type
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
    // console.log(Location);

    // console.log(query);

    // const result = await getData(query);
    // return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getEquipments };
