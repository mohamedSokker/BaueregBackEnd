const { getData } = require("../../functions/getData");

const getTargetOrder = async (req, res) => {
  try {
    const bodyData = req.body;
    const query = `SELECT TOP 1 * FROM AppPlaceOrder WHERE ID = '${bodyData?.ID}' ORDER BY ID DESC`;
    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getTargetOrder };
