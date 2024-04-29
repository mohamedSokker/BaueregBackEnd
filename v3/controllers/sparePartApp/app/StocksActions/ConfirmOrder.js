const { getMessaging } = require("firebase-admin/messaging");

const { app2 } = require("../../../../config/firebaseConfigs");
const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");
const { addMany, updateMany } = require("../../../../services/mainService");
const {
  AppPlaceOrderSchema,
} = require("../../../../schemas/AppPlaceOrder/schema");
const {
  AppNotificationSchema,
} = require("../../../../schemas/AppNotification/schema");

const getMainTokens = async () => {
  let usersData = [];
  if (model["AdminUsersApp"]) {
    usersData = model["AdminUsersApp"];
  } else {
    const query = `SELECT * FROM AdminUsersApp`;
    usersData = (await getData(query)).recordsets[0];
  }

  let tokens = [];

  for (let i = 0; i < usersData.length; i++) {
    const userRole = JSON.parse(usersData[i].UserRole);
    if (userRole.StockRes && userRole.StockRes[0] === "Main") {
      if (
        usersData[i]?.Token !== "null" &&
        usersData[i]?.Token !== null &&
        usersData[i]?.Token !== ""
      )
        tokens.push(usersData[i]?.Token);
    }
  }
  return tokens;
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

const confirmOrder = async (req, res) => {
  try {
    let count = 0;
    const updatePlaceOrder = [];
    const addNot = [];
    for (let i = 0; i < req.body.length; i++) {
      updatePlaceOrder.push({
        ID: req.body[i].ID,
        Quantity: req.body[i].Quantity,
        Confirmed: "true",
      });
      if (count === 0) {
        addNot.push({
          DateTime: "Date.Now",
          FromUserName: req.body[i].FromUserName,
          FromUserImg: req.body[i].FromUserImg,
          ToUser: req.body[i].ToUser,
          Category: "Place Order",
          Item: "Order Confiremed",
          Body: `Check Order ${req.body[i].OrderNo} Confirmed`,
          Seen: "false",
          Sent: "false",
        });

        count++;
      }
    }
    const tokens = await getMainTokens();
    await updateMany([updatePlaceOrder], "AppPlaceOrder", AppPlaceOrderSchema);
    await addMany(addNot, "AppNotification", AppNotificationSchema);
    await sendMessage(
      {
        title: req.body[0].title,
        body: req.body[0].body,
      },
      tokens
    );
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { confirmOrder };
