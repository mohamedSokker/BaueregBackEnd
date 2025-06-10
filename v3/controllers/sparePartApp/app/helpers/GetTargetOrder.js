const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");

const getTargetOrder = async (req, res) => {
  try {
    const bodyData = req.body;
    let result = [];
    if (model["AppPlaceOrder"]) {
      result = model["AppPlaceOrder"]
        .filter((item) => item.OrderNo === bodyData?.OrderNo)
        .sort((a, b) => Number(a.ID) > Number(b.ID));
    } else {
      const query = `SELECT * FROM AppPlaceOrder WHERE OrderNo = '${bodyData?.OrderNo}' ORDER BY ID DESC`;
      result = (await getData(query)).recordsets[0];
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getTargetOrder };
