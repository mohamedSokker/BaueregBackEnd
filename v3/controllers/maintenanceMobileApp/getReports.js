// const { getData } = require("../../../functions/getData");
const { getAllData } = require("../../services/mainService");

const getReports = async (req, res) => {
  const { Location } = req.body;

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
  // const query = `SELECT * FROM AppMaintMaintenance WHERE ${locQuery} ORDER BY ID DESC`;
  try {
    const allData = await getAllData("AppMaintMaintenance");

    const filteredResult = allData.filter((item) =>
      Location.some((loc) => loc.includes(item.Location))
    );
    const result = filteredResult.sort((a, b) => Number(b.ID) - Number(a.ID));
    // const result = await getData(query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getReports };
