// const { updateStore } = require("../functions/Recieve/updateStore");
const { getMessaging } = require("firebase-admin/messaging");
const { app2 } = require("../../../../config/firebaseConfigs");

// const { getUsersToken } = require("../functions/global/getUsersToken");
// const { sendMessage } = require("../functions/global/sendMessage");

const { model } = require("../../../../model/mainModel");
const { getData } = require("../../../../helpers/getData");
const { addData, updateMany } = require("../../../../services/mainService");
const {
  AppNotificationSchema,
} = require("../../../../schemas/AppNotification/schema");
const {
  AppStocksTransitionSchema,
} = require("../../../../schemas/AppStocksTransition/schema");
const { AppStocksSchema } = require("../../../../schemas/AppStocks/schema");

const updateStore = async (bodyData) => {
  try {
    const diff = Number(bodyData.TransQuantity) - Number(bodyData.q);
    let updateTrans = {};
    if (diff === 0) {
      updateTrans = {
        ID: bodyData.TransID,
        Quantity: diff,
        IsPending: "false",
      };
    } else {
      updateTrans = {
        ID: bodyData.TransID,
        Quantity: diff,
        IsPending: "true",
      };
    }

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
    return { addStocks, updateStocks, updateTrans };
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

const stocksRecieve = async (req, res) => {
  try {
    let checkItem = [];
    if (model["AppStocksTransition"]) {
      checkItem = model["AppStocksTransition"]
        .filter(
          (item) =>
            item.Code === req.body.Code &&
            item.ItemFrom === req.body.ItemFrom &&
            item.ItemTo === req.body.ItemTo &&
            item.IsPending === "true"
        )
        .sort((a, b) => Number(a.ID) > Number(b.ID));
    } else {
      const query = `SELECT TOP 1 * FROM AppStocksTransition WHERE
    Code = '${req.body.Code}' AND ItemFrom = '${req.body.ItemFrom}'
    AND ItemTo = '${req.body.ItemTo}' AND IsPending = 'true' ORDER BY ID DESC`;
      checkItem = (await getData(query)).recordsets[0];
    }
    if (checkItem.length === 0)
      throw new Error(`No Item Found From this stock to you`);
    if (req.body?.q > checkItem[0]?.Quantity)
      throw new Error(`You have only ${checkItem[0]?.Quantity} items waiting`);
    let usersData = [];
    if (model["AdminUsersApp"]) {
      usersData = model["AdminUsersApp"];
    } else {
      const query = ``;
      usersData = (await getData(query)).recordsets[0];
    }
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
      TransID: checkItem[0]?.ID,
      TransQuantity: checkItem[0]?.Quantity,
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
      [updateStoreData.updateTrans],
      "AppStocksTransition",
      AppStocksTransitionSchema
    );
    await addData(notificationBody, "AppNotification", AppNotificationSchema);
    // const sendToDB = await getData(`${updateStoreData} ${notificationQuery}`);
    await sendMessage(bodyData, tokens);
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { stocksRecieve };
