const { getMessaging } = require("firebase-admin/messaging");

const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");
const { app2 } = require("../../../../config/firebaseConfigs");
const { addData, updateMany } = require("../../../../services/mainService");
const {
  AppNotificationSchema,
} = require("../../../../schemas/AppNotification/schema");
const {
  AppStocksTransitionSchema,
} = require("../../../../schemas/AppStocksTransition/schema");
const { AppStocksSchema } = require("../../../../schemas/AppStocks/schema");

const updateStore = async (bodyData) => {
  const addStocksTrans = {
    DateTime: "Date.Now",
    Code: bodyData.Code,
    SabCode: bodyData.SabCode,
    Description: bodyData.Description,
    Quantity: bodyData?.q,
    ItemFrom: bodyData.ItemFrom,
    ItemFromNo: bodyData.catData,
    ItemTo: bodyData.ItemTo,
    ItemToNo: "",
    ItemStatus: bodyData.ItemStatus,
    IsPending: "",
  };

  try {
    let updateStocks = {};
    let addStocks = {};
    if (bodyData.Status === `New`) {
      addStocks = {
        Code: bodyData.Code,
        SabCode: bodyData.SabCode,
        Unit: bodyData.Unit,
        Quantity: Number(bodyData.q),
        Store: bodyData.ItemTo,
        Description: bodyData.Description,
        Detail: bodyData.Detail,
        Position: bodyData.Position,
      };
    } else {
      updateStocks = {
        ID: bodyData.ID,
        Quantity: Number(bodyData.q) + Number(bodyData.Quantity),
      };
    }
    return { addStocks, updateStocks, addStocksTrans };
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error Updating Store`);
  }
};

const getArrayValues = async (array) => {
  let result = undefined;
  if (array) {
    result = array.map((data) => data.name);
  }

  return result;
};

const getUsersToken = async (bodyData, usersData) => {
  let tokens = [];
  let notificationBody = {};

  for (let i = 0; i < usersData.length; i++) {
    const userRole = JSON.parse(usersData[i].UserRole);
    const editorStocksList = await getArrayValues(userRole?.Editor?.StocksList);
    const usersStocksList = await getArrayValues(userRole?.User?.StocksList);
    if (
      (userRole.Admin && usersData[i].UserName !== bodyData.UserName) ||
      (usersData[i].UserName !== bodyData.UserName &&
        (editorStocksList?.includes(bodyData.ItemFrom) ||
          usersStocksList?.includes(bodyData.ItemFrom) ||
          editorStocksList?.includes(bodyData.ItemTo) ||
          usersStocksList?.includes(bodyData.ItemTo))) ||
      (userRole?.StockRes &&
        userRole?.StockRes[0] === bodyData?.ItemTo &&
        usersData[i].UserName !== bodyData.UserName)
    ) {
      if (
        usersData[i]?.Token !== "null" &&
        usersData[i]?.Token !== null &&
        usersData[i]?.Token !== ""
      ) {
        tokens.push(usersData[i]?.Token);
        notificationBody = {
          DateTime: "Date.Now",
          FromUserName: bodyData.UserName,
          FromUserImg: bodyData.ProfileImg,
          ToUser: usersData[i].UserName,
          Category: bodyData.Category,
          Item: bodyData.title,
          Body: bodyData.body,
          Seen: "false",
          Sent: "false",
        };
      }
    }
  }
  return { tokens, notificationBody };
};

const sendMessage = async (fieldsData, tokens) => {
  const message = {
    notification: {
      title: fieldsData.title,
      body: fieldsData.body,
    },

    tokens: tokens,
  };

  if (tokens.length > 0) {
    getMessaging(app2)
      .sendEachForMulticast(message)
      .then((response) => {
        return { recieved: response.successCount };
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } else {
    throw new Error(`no tokens found`);
  }
};

const stocksNewItem = async (req, res) => {
  try {
    let usersData = [];
    if (model["AdminUsersApp"]) {
      usersData = model["AdminUsersApp"];
    } else {
      const query = `SELECT * FROM AdminUsersApp`;
      usersData = (await getData(query)).recordsets[0];
    }
    // const usersData = allData.recordsets[0];
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
      ItemFrom: req.body.ItemFrom,
      ItemTo: req.body.ItemTo,
      ItemStatus: req.body.ItemStatus,
      title: req.body.title,
      body: req.body.body,
    };
    const updateStoreData = await updateStore(bodyData);
    const tokensData = await getUsersToken(bodyData, usersData);
    const tokens = tokensData.tokens;
    const notificationBody = tokensData.notificationBody;
    if (updateStoreData.addStocks.Code)
      await addData(updateStoreData.addStocks, "AppStocks", AppStocksSchema);
    if (updateStoreData.updateStocks.Code)
      await updateMany(
        [updateStoreData.updateStocks],
        "AppStocks",
        AppStocksSchema
      );
    await updateMany(
      [updateStoreData.addStocksTrans],
      "AppStocksTransition",
      AppStocksTransitionSchema
    );
    await addData(notificationBody, "AppNotification", AppNotificationSchema);
    // const sendToDB = await getData(`${insertTransition} ${notificationQuery}`);
    await sendMessage(bodyData, tokens);
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { stocksNewItem };
