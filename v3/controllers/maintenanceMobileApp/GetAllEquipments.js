// const { getData } = require("../../functions/getData");
const { getAllData } = require("../../services/mainService");

const getAllEq = async (req, res) => {
  try {
    const allData = await getAllData("Equipments_Location");
    const result = allData.filter((item) => item.End_Date === null);
    // const query = `SELECT * FROM Equipments_Location WHERE ENd_Date IS NULL`;
    // const result = await getData(query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllEq };
