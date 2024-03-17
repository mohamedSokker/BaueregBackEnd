// const { getData } = require("../../../functions/getData");
const { getAllData } = require("../../../app/service");

const logic = async (req, res) => {
  try {
    const { Location } = req.body;

    console.log(`location: ${JSON.stringify(Location)}`);

    const allData = await getAllData("AppMaintUsers");

    const filteredData = allData.filter(
      (item) =>
        Location.some((loc) => loc.includes(item.Location)) &&
        item.Role !== "Operator"
    );

    console.log(`filteredData: ${filteredData}`);

    const result = [];
    filteredData.map((item) => {
      result.push({ Token: item.Token });
    });
    // let locQuery = ``;
    // for (let i = 0; i < Location.length; i++) {
    //   if (Location.length === 1) {
    //     locQuery += ` (Location LIKE '%${Location[i]}%')`;
    //   } else {
    //     if (i === 0) {
    //       locQuery += ` (Location LIKE '%${Location[i]}%'`;
    //     } else if (i === Location.length - 1) {
    //       locQuery += ` OR Location LIKE '%${Location[i]}%')`;
    //     } else {
    //       locQuery += ` OR Location LIKE '%${Location[i]}%'`;
    //     }
    //   }
    // }
    // const query = `SELECT Token FROM AppMaintUsers WHERE ${locQuery}
    //                AND Role <> 'Operator'`;
    // console.log(query);
    // const result = await getData(query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { logic };
