const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");

const getItem = async (req, res) => {
  try {
    const bodyData = req.body;
    let result = [];
    if (model["AppStocks"]) {
      result = model["AppStocks"].filter(
        (item) => item.Code === bodyData?.Code
      );
    } else {
      const query = `SELECT TOP 1 * FROM AppStocks WHERE
      Code = '${bodyData.Code}'`;
      result = (await getData(query)).recordsets[0];
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getItem };
