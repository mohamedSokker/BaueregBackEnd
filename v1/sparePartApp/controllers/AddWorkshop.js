const { getData } = require("../../../v3/helpers/getData");

const AddWorkshop = async (req, res) => {
  try {
    const bodyData = req.body;
    const query = `INSERT INTO WorkShops VALUES ('${bodyData.name}')`;
    const result = await getData(query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { AddWorkshop };
