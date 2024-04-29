const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");

const getItems = async (req, res) => {
  try {
    const bodyData = req.body;
    let result = [];
    if (model["AppStocks"]) {
      result = model["AppStocks"]
        .filter(
          (item) =>
            item?.Code?.includes(bodyData.Code) ||
            item?.Description?.includes(bodyData.Code) ||
            item?.SabCode?.includes(bodyData.Code)
        )
        .slice(0, 10);
    } else {
      const query = `SELECT DISTINCT Code, Description, SabCode, Quantity, Store FROM AppStocks WHERE
      Code LIKE '%${bodyData.Code}%' OR 
      Description LIKE '%${bodyData.Code}%' OR 
      SabCode LIKE '%${bodyData.Code}%'`;
      result = (await getData(query)).recordsets[0].slice(0, 10);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getItems };
