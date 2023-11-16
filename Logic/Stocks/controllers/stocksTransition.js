const { checkIteminStock } = require("../functions/global/checkItemInStock");
const {
  insertToTransition,
} = require("../functions/Transtition/InsertToTransition");
const { getData } = require("../../../functions/getData");
const { app2 } = require("../../../config/firebaseConfigs");
const { getUsersToken } = require("../functions/global/getUsersToken");
const { sendMessage } = require("../functions/global/sendMessage");

const addstocks = async (req, res) => {
  try {
    const checkCode = await checkIteminStock(req.body.Code, req.body.ItemFrom);
    const bodyData = {
      ID: checkCode[0][`ID`],
      UserName: req.body.UserName,
      ProfileImg: req.body.ProfileImg,
      Category: "Stocks",
      Item: req.body.ItemFrom,
      Code: req.body.Code,
      SabCode: checkCode[0][`SabCode`],
      Unit: checkCode[0][`Unit`],
      Description: checkCode[0][`Description`],
      Detail: checkCode[0][`Detail`],
      Quantity: checkCode[0][`Quantity`],
      ItemFrom: req.body.ItemFrom,
      ItemTo: req.body.ItemTo,
      ItemStatus: req.body.ItemStatus,
      title: req.body.title,
      body: req.body.body,
    };
    const insertTransition = await insertToTransition(bodyData);
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

module.exports = { addstocks };
