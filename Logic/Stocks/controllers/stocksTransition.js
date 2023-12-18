const {
  insertToTransition,
} = require("../functions/Transtition/InsertToTransition");
const { getData } = require("../../../functions/getData");
const { app2 } = require("../../../config/firebaseConfigs");
const { getUsersToken } = require("../functions/global/getUsersToken");
const { sendMessage } = require("../functions/global/sendMessage");

const getAllData = async (bodyData) => {
  const usersQuery = `SELECT * FROM AdminUsersApp`;
  const result = await getData(usersQuery);
  return result;
};

const addstocks = async (req, res) => {
  try {
    if (req.body.Status === "New")
      throw new Error(`This Item Is not Found in your Stock`);
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
      UserName: req.body.UserName,
      ProfileImg: req.body.ProfileImg,
      Category: "Stocks",
      Item: req.body.ItemFrom,
      Code: req.body.Code,
      ItemFrom: req.body.ItemFrom,
      ItemTo: req.body.ItemTo,
      ItemStatus: req.body.ItemStatus,
      title: req.body.title,
      body: req.body.body,
    };
    console.log(bodyData);
    const insertTransition = await insertToTransition(bodyData);
    const tokensData = await getUsersToken(bodyData, usersData);
    const tokens = tokensData.tokens;
    const notificationQuery = tokensData.notificationQuery;
    const sendToDB = await getData(`${insertTransition} ${notificationQuery}`);
    await sendMessage(bodyData, tokens);
    return res.status(200).json(sendToDB);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { addstocks };
