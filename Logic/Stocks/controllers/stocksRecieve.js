const {
  checkItemInTransition,
} = require("../functions/global/checkItemInTransition");
const { updateStore } = require("../functions/Recieve/updateStore");
const { checkIteminStock } = require("../functions/global/checkItemInStock");
const { getData } = require("../../../functions/getData");
const { app2 } = require("../../../config/firebaseConfigs");
const { getUsersToken } = require("../functions/global/getUsersToken");
const { sendMessage } = require("../functions/global/sendMessage");

const stocksRecieve = async (req, res) => {
  try {
    const checkItem = await checkItemInTransition(req.body);
    const getFromStore = await checkIteminStock(
      checkItem[0][`Code`],
      req.body.ItemFrom
    );
    console.log(checkItem[0]);
    const bodyData = {
      TransID: checkItem[0][`ID`],
      ID: getFromStore[0][`ID`],
      UserName: req.body.UserName,
      ProfileImg: req.body.ProfileImg,
      Category: "Stocks",
      Item: req.body.ItemTo,
      Code: req.body.Code,
      SabCode: getFromStore[0][`SabCode`],
      Unit: getFromStore[0][`Unit`],
      Description: getFromStore[0][`Description`],
      Detail: getFromStore[0][`Detail`],
      Quantity: getFromStore[0][`Quantity`],
      ItemFrom: req.body.ItemFrom,
      ItemTo: req.body.ItemTo,
      ItemStatus: req.body.ItemStatus,
      title: req.body.title,
      body: req.body.body,
    };
    const updateStoreData = await updateStore(bodyData);
    const tokensData = await getUsersToken(bodyData);
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
