// const { getData } = require("../../../functions/getData");
const { getAllData } = require("../../../app/service");

const getEquipments = async (req, res) => {
  try {
    const bodyData = req.body;
    const Location = JSON.parse(bodyData.Location);

    const allData = await getAllData("Equipments_Location");

    const result = allData.filter(
      (item) =>
        Location.includes(item.Location) &&
        item.End_Date === null &&
        item.Equipment_Type === bodyData.Equipment_Type
    );
    // console.log(Location);

    // let locQuery = ``;
    // for (let i = 0; i < Location.length; i++) {
    //   if (Location.length === 1) {
    //     locQuery += ` (Location = '${Location[i]}')`;
    //   } else {
    //     if (i === 0) {
    //       locQuery += ` (Location = '${Location[i]}'`;
    //     } else if (i === Location.length - 1) {
    //       locQuery += ` OR Location = '${Location[i]}')`;
    //     } else {
    //       locQuery += ` OR Location = '${Location[i]}'`;
    //     }
    //   }
    // }
    // const query = `SELECT * FROM Equipments_Location WHERE ${locQuery}
    //                 AND End_Date IS NULL AND Equipment_Type = '${bodyData.Equipment_Type}'`;
    // console.log(query);

    // const result = await getData(query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getEquipments };
