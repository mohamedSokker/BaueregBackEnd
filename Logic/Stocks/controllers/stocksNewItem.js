const sql = require("mssql");
const config = require("../../../config");

const { checkIteminStock } = require("../functions/global/checkItemInStock");
const { updateStore } = require("../functions/NewItem/updateStore");
const { getData } = require("../../../functions/getData");
const { getUsersToken } = require("../functions/global/getUsersToken");
const { sendMessage } = require("../functions/global/sendMessage");

const stocksNewItem = async (req, res) => {
  try {
    const checkCode = await checkIteminAllStocks(req.body.Code);

    const bodyData = {
      Code: req.body.Code,
      UserName: req.body.UserName,
      ProfileImg: req.body.ProfileImg,
      Category: "Stocks",
      Item: req.body.ItemTo,
      SabCode: checkCode[0][`SabCode`],
      Unit: checkCode[0][`Unit`],
      Description: checkCode[0][`Description`],
      Detail: checkCode[0][`Detail`],
      Quantity: checkCode[0][`Quantity`],
      ItemTo: req.body.ItemTo,
      ItemStatus: req.body.ItemStatus,
      title: req.body.title,
      body: req.body.body,
    };
    const insertTransition = await updateStore(bodyData);
    const tokensData = await getUsersToken(bodyData);
    const tokens = tokensData.tokens;
    const notificationQuery = tokensData.notificationQuery;
    const sendToDB = await getData(`${insertTransition} ${notificationQuery}`);
    await sendMessage(bodyData, tokens);
    return res.status(200).json(sendToDB);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const checkIteminAllStocks = async (code) => {
  let query = `SELECT TOP 1 * FROM AppStocks WHERE Code = '${code}'`;
  try {
    const result = await getData(query);
    if (result.rowsAffected[0] === 0)
      throw new Error(`no items found in Stock`);
    return result.recordsets[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { stocksNewItem };
