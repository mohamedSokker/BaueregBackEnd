const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");

const checkIteminStock = async (code) => {
  try {
    let result = [];
    if (model["AppStocks"]) {
      result = model["AppStocks"].filter((item) => item.Code === code);
    } else {
      const query = `SELECT * FROM AppStocks WHERE Code = '${code}'`;
      result = (await getData(query)).recordsets[0];
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { checkIteminStock };
