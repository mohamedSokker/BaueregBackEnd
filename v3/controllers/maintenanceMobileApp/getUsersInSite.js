// const { getData } = require("../../../functions/getData");
// const { getAllData } = require("../../services/mainService");
const { getData } = require("../../helpers/getData");
const { model } = require("../../model/mainModel");

const logic = async (req, res) => {
  try {
    const { Location } = req.body;

    // console.log(`location: ${JSON.stringify(Location)}`);

    // const allData = await getAllData("AppMaintUsers");
    let result = [];

    if (model["AppMaintUsers"]) {
      model["AppMaintUsers"]
        .filter(
          (item) =>
            Location.some((loc) => item.Location.includes(loc)) &&
            item.Role !== "Operator"
        )
        .map((d) => {
          result.push({ Token: d.Token });
        });
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
      const query = `SELECT Token FROM AppMaintUsers WHERE ${locQuery}
                     AND Role <> 'Operator'`;
      console.log(query);
      result = (await getData(query)).recordsets[0];
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { logic };
