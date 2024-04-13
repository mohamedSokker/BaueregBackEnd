const { getData } = require("../../../v3/helpers/getData");

const getTargetOrder = async (req, res) => {
  try {
    const bodyData = req.body;
    const query = `SELECT * FROM AppPlaceOrder WHERE OrderNo = '${bodyData?.OrderNo}' ORDER BY ID DESC`;
    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getTargetOrder };
