// const {
//   insertToTransition,
// } = require("../functions/Transtition/InsertToTransition");
const { getData } = require("../../../../helpers/getData");
const { addData, updateMany } = require("../../../../services/mainService");
const { model } = require("../../../../model/mainModel");
// const { getUsersToken } = require("../functions/global/getUsersToken");
// const { sendMessage } = require("../functions/global/sendMessage");
const {
  AppNotificationSchema,
} = require("../../../../schemas/AppNotification/schema");
const { AppStocksSchema } = require("../../../../schemas/AppStocks/schema");
const {
  AppStocksTransitionSchema,
} = require("../../../../schemas/AppStocksTransition/schema");
const { getMessaging } = require("firebase-admin/messaging");
const { app2 } = require("../../../../config/firebaseConfigs");

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

const getArrayValues = async (array) => {
  let result = undefined;
  if (array) {
    result = array.map((data) => data.name);
  }

  return result;
};

const getUsersToken = async (bodyData) => {
  let tokens = [];
  let notificationBody = {};

  if (model["AdminUsersApp"]) {
    for (let i = 0; i < model["AdminUsersApp"].length; i++) {
      const userRole = JSON.parse(model["AdminUsersApp"][i].UserRole);
      const editorStocksList = await getArrayValues(
        userRole?.Editor?.StocksList
      );
      const usersStocksList = await getArrayValues(userRole?.User?.StocksList);
      if (
        (userRole.Admin &&
          model["AdminUsersApp"][i].UserName !== bodyData.UserName) ||
        (model["AdminUsersApp"][i].UserName !== bodyData.UserName &&
          (editorStocksList?.includes(bodyData.ItemFrom) ||
            usersStocksList?.includes(bodyData.ItemFrom) ||
            editorStocksList?.includes(bodyData.ItemTo) ||
            usersStocksList?.includes(bodyData.ItemTo))) ||
        (userRole?.StockRes &&
          userRole?.StockRes[0] === bodyData?.ItemTo &&
          model["AdminUsersApp"][i].UserName !== bodyData.UserName)
      ) {
        if (
          model["AdminUsersApp"][i]?.Token !== "null" &&
          model["AdminUsersApp"][i]?.Token !== null &&
          model["AdminUsersApp"][i]?.Token !== ""
        ) {
          tokens.push(model["AdminUsersApp"][i]?.Token);
          notificationBody = {
            DateTime: "Date.Now",
            FromUserName: bodyData.UserName,
            FromUserImg: bodyData.ProfileImg,
            ToUser: model["AdminUsersApp"][i].UserName,
            Category: bodyData.Category,
            Item: bodyData.title,
            Body: bodyData.body,
            Seen: "false",
            Sent: "false",
          };
        }
      }
    }
  } else {
    getData(`SELECT * FROM AdminUsersApp`).then(async (result) => {
      for (let i = 0; i < result.recordsets[0].length; i++) {
        const userRole = JSON.parse(result.recordsets[0][i].UserRole);
        const editorStocksList = await getArrayValues(
          userRole?.Editor?.StocksList
        );
        const usersStocksList = await getArrayValues(
          userRole?.User?.StocksList
        );
        if (
          (userRole.Admin &&
            result.recordsets[0][i].UserName !== bodyData.UserName) ||
          (result.recordsets[0][i].UserName !== bodyData.UserName &&
            (editorStocksList?.includes(bodyData.ItemFrom) ||
              usersStocksList?.includes(bodyData.ItemFrom) ||
              editorStocksList?.includes(bodyData.ItemTo) ||
              usersStocksList?.includes(bodyData.ItemTo))) ||
          (userRole?.StockRes &&
            userRole?.StockRes[0] === bodyData?.ItemTo &&
            result.recordsets[0][i].UserName !== bodyData.UserName)
        ) {
          if (
            result.recordsets[0][i]?.Token !== "null" &&
            result.recordsets[0][i]?.Token !== null &&
            result.recordsets[0][i]?.Token !== ""
          ) {
            tokens.push(result.recordsets[0][i]?.Token);
            notificationBody = {
              DateTime: "Date.Now",
              FromUserName: bodyData.UserName,
              FromUserImg: bodyData.ProfileImg,
              ToUser: result.recordsets[0][i].UserName,
              Category: bodyData.Category,
              Item: bodyData.title,
              Body: bodyData.body,
              Seen: "false",
              Sent: "false",
            };
          }
        }
      }
    });
  }

  console.log(tokens);
  return { tokens, notificationBody };
};

// const getAllData = async (bodyData) => {
//   const usersQuery = `SELECT * FROM AdminUsersApp`;
//   const result = await getData(usersQuery);
//   return result;
// };

const insertToTransition = async (bodyData) => {
  try {
    const AppStocksTrans = {
      DateTime: "Date.Now",
      Code: bodyData.Code,
      SabCode: bodyData.SabCode,
      Description: bodyData.Description,
      Quantity: bodyData?.q,
      ItemFrom: bodyData.ItemFrom,
      ItemFromNo: "",
      ItemTo: bodyData.ItemTo,
      ItemToNo: "",
      ItemStatus: bodyData.ItemStatus,
      IsPending: "true",
    };

    const AppStocks = {
      ID: bodyData.ID,
      Quantity: Number(bodyData.Quantity) - Number(bodyData.q),
    };
    //   const transQuery = `INSERT INTO AppStocksTransition VALUES(
    //   GETDATE(),
    // '${bodyData.Code}','${bodyData.SabCode}', '${bodyData.Description}',
    // '${bodyData?.q}',
    // '${bodyData.ItemFrom}', '', '${bodyData.ItemTo}', '', '${bodyData.ItemStatus}',
    //  'true')`;

    //   const fromQuery = `UPDATE AppStocks SET Quantity =
    // '${Number(bodyData.Quantity) - Number(bodyData.q)}'
    //  WHERE ID = '${bodyData.ID}'`;

    //   const query = `${transQuery} ${fromQuery} `;

    // console.log(query);

    return { AppStocksTrans, AppStocks };
  } catch (error) {
    throw new Error(error.message);
  }
};

const addstocks = async (req, res) => {
  try {
    if (req.body.Status === "New")
      throw new Error(`This Item Is not Found in your Stock`);
    // const allData = await getAllData(req.body);
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
    const tokensData = await getUsersToken(bodyData);
    const tokens = tokensData.tokens;
    const notificationBody = tokensData.notificationBody;
    await updateMany(
      [insertTransition.AppStocks],
      "AppStocks",
      AppStocksSchema
    );
    await addData(
      insertTransition.AppStocksTrans,
      "AppStocksTransition",
      AppStocksTransitionSchema
    );
    await addData(notificationBody, "AppNotification", AppNotificationSchema);
    // const sendToDB = await getData(`${insertTransition} ${notificationQuery}`);
    await sendMessage(bodyData, tokens);
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { addstocks };
