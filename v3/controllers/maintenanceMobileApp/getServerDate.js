// const { getData } = require("../../helpers/getData");

const logic = async (req, res) => {
  try {
    // return { Date: new Date().toISOString() };
    // const query = `SELECT TOP 1 DATEADD(HOUR, 9, GETDATE()) AS Date FROM AppMaintMaintenance`;
    // const result = await getData(query);
    return res.status(200).json([{ Date: new Date().toISOString() }]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { logic };
