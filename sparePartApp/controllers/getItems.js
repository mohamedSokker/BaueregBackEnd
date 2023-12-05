const { getData } = require("../../functions/getData");

const getItems = async (req, res) => {
  try {
    const bodyData = req.body;
    const query = `SELECT DISTINCT Code, Description, SabCode, Quantity FROM AppStocks WHERE
      Code LIKE '%${bodyData.Code}%' OR 
      Description LIKE '%${bodyData.Code}%' OR 
      SabCode LIKE '%${bodyData.Code}%'`;
    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getItems };
