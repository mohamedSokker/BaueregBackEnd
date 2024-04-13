// const { getData } = require("../../../functions/getData");
const { getAllData } = require("../../services/mainService");

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;
    const PerLocs = fieldsData.usersData[0].roles.Editor?.Sites.concat(
      fieldsData.usersData[0].roles.User?.Sites
    );
    const PerLocsArray = [];
    PerLocs.map((item) => {
      PerLocsArray.push(item.name);
    });

    const locsArray = Array.from(new Set(PerLocsArray));

    const allData = await getAllData("AppMaintMaintenance");

    const result = allData.filter((item) => locsArray.includes(item.Location));

    // let LocURL = ``;
    // for (let i = 0; i < PerLocs.length; i++) {
    //   if (PerLocs.length === 1) {
    //     LocURL += ` (Location = '${PerLocs[i].name}')`;
    //   } else if (i === 0) {
    //     LocURL += ` (Location = '${PerLocs[i].name}'`;
    //   } else if (i === PerLocs.length - 1) {
    //     LocURL += ` OR Location = '${PerLocs[i].name}')`;
    //   } else {
    //     LocURL += ` OR Location = '${PerLocs[i].name}'`;
    //   }
    // }
    // let query = ``;

    // const mainQuery = `SELECT * FROM AppMaintMaintenance WHERE `;

    // if (LocURL.length === 0) return res.status(200).json([]);

    // query = `${mainQuery} ${LocURL}`;

    // const result = await getData(query);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { logic };
