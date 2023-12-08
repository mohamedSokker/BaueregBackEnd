const { updateStore } = require("../functions/Recieve/updateStore");
const { getData } = require("../../../functions/getData");
const { getUsersToken } = require("../functions/global/getUsersToken");
const { sendMessage } = require("../functions/global/sendMessage");

const getAllData = async (bodyData) => {
  const transQuery = `SELECT TOP 1 * FROM AppStocksTransition WHERE
    Code = '${bodyData.Code}' AND ItemFrom = '${bodyData.ItemFrom}'
    AND ItemTo = '${bodyData.ItemTo}' AND IsPending = 'true' ORDER BY ID DESC`;
  const usersQuery = `SELECT * FROM AdminUsersApp`;
  const result = await getData(`${transQuery} ${usersQuery}`);
  return result;
};

const stocksRecieve = async (req, res) => {
  try {
    const allData = await getAllData(req.body);
    const checkItem = allData.recordsets[0];
    if (checkItem.length === 0)
      throw new Error(`No Item Found From this stock to you`);
    const usersData = allData.recordsets[1];
    const bodyData = {
      ID: req.body?.ID,
      Status: req.body?.Status,
      Quantity: req.body?.Quantity,
      q: req.body?.q,
      SabCode: req.body?.SabCode,
      Unit: req.body?.Unit,
      Description: req.body?.Description,
      Detail: req.body?.Detail,
      TransID: checkItem[0]?.ID,
      UserName: req.body.UserName,
      ProfileImg: req.body.ProfileImg,
      Category: "Stocks",
      Item: req.body.ItemTo,
      Code: req.body.Code,
      ItemFrom: req.body.ItemFrom,
      ItemTo: req.body.ItemTo,
      ItemStatus: req.body.ItemStatus,
      title: req.body.title,
      body: req.body.body,
    };
    const updateStoreData = await updateStore(bodyData);
    const tokensData = await getUsersToken(bodyData, usersData);
    const tokens = tokensData.tokens;
    const notificationQuery = tokensData.notificationQuery;
    const sendToDB = await getData(`${updateStoreData} ${notificationQuery}`);
    await sendMessage(bodyData, tokens);
    return res.status(200).json(sendToDB);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { stocksRecieve };
