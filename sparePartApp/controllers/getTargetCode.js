const { getData } = require("../../functions/getData");

const getTargetCode = async (req, res) => {
  try {
    const bodyData = req.body;
    const query = `SELECT * FROM AppStocks WHERE
      Code = '${bodyData.Code}'`;
    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getTargetCode };
