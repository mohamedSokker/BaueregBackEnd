const { updateStore } = require("../functions/NewItem/updateStore");
const { getData } = require("../../../functions/getData");
const { getUsersToken } = require("../functions/global/getUsersToken");
const { sendMessage } = require("../functions/global/sendMessage");

const getAllData = async (bodyData) => {
  const usersQuery = `SELECT * FROM AdminUsersApp`;
  const result = await getData(usersQuery);
  return result;
};

const stocksNewItem = async (req, res) => {
  try {
    const allData = await getAllData(req.body);
    const usersData = allData.recordsets[0];
    const bodyData = {
      ID: req.body?.ID,
      Status: req.body?.Status,
      Quantity: req.body?.Quantity,
      q: req.body?.q,
      SabCode: req.body?.SabCode,
      Unit: req.body?.Unit,
      Description: req.body?.Description,
      Detail: req.body?.Detail,
      Position: req.body?.Position,
      catData: req.body?.catData,
      Code: req.body.Code,
      UserName: req.body.UserName,
      ProfileImg: req.body.ProfileImg,
      Category: "Stocks",
      Item: req.body.ItemTo,
      ItemTo: req.body.ItemTo,
      ItemStatus: req.body.ItemStatus,
      title: req.body.title,
      body: req.body.body,
    };
    const insertTransition = await updateStore(bodyData);
    const tokensData = await getUsersToken(bodyData, usersData);
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

module.exports = { stocksNewItem };
