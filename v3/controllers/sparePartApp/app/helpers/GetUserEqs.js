const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");

const getUserEquipments = async (req, res) => {
  try {
    const bodyData = req.body;
    let result = [];
    if (model["Equipments_Location"]) {
      result = model["Equipments_Location"].filter(
        (item) => item.End_Date === null && item.Location === bodyData?.site
      );
    } else {
      const query = `SELECT ID, Equipment FROM Equipments_Location WHERE
      End_Date IS NULL AND Location = '${bodyData?.site}'`;
      result = (await getData(query)).recordsets[0];
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserEquipments };
