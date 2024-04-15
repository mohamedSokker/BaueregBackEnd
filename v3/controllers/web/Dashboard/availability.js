const { getAllData } = require("../../../services/mainService");

const availability = async (req, res) => {
  try {
    const avData = await getAllData("Availability");

    return res.status(200).json(avData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { availability };
