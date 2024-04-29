const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");
const { addMany } = require("../../../../services/mainService");
const {
  AppPlaceOrderSchema,
} = require("../../../../schemas/AppPlaceOrder/schema");
const {
  AppNotificationSchema,
} = require("../../../../schemas/AppNotification/schema");

const checkItemInStore = async (Code) => {
  try {
    let result = [];
    if (model["AppStocks"]) {
      result = model["AppStocks"].filter((item) => item.Code === Code);
    } else {
      const query = `SELECT TOP 1 * FROM AppStocks WHERE
    Code = '${Code}'`;
      result = (await getData(query)).recordsets[0];
    }

    if (result.length === 0) throw new Error(`${Code} not found in store`);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const stocksPlaceOrder = async (req, res) => {
  try {
    let query = "";
    let count = 0;
    console.log(req.body);
    let addPlaceOrder = [];
    let addNot = [];
    for (let i = 0; i < req.body.length; i++) {
      const checkCode = await checkItemInStore(req.body[i].Code);
      addPlaceOrder.push({
        DateTime: "Date.Now",
        OrderNo: req.body[i].OrderNo,
        Code: req.body[i].Code,
        SabCode: checkCode[0]["SabCode"],
        Unit: checkCode[0]["Unit"],
        Quantity: req.body[i].Quantity,
        Description: checkCode[0]["Description"],
        FromStore: req.body[i].FromStore,
        ToUser: req.body[i].ToUser,
        Confirmed: "false",
      });

      if (count === 0) {
        addNot.push({
          DateTime: "Date.Now",
          FromUserName: req.body[i].FromUserName,
          FromUserImg: req.body[i].FromUserImg,
          ToUser: req.body[i].ToUser,
          Category: "Place Order",
          Item: req.body[i].FromStore,
          Body: `There are order from ${req.body[i].FromStore} You may want to see`,
          Seen: "false",
          Sent: "false",
        });
        count++;
      }
    }
    await addMany(addPlaceOrder, "AppPlaceOrder", AppPlaceOrderSchema);
    await addMany(addNot, "AppNotification", AppNotificationSchema);
    // console.log(query);
    // const result = await getData(query);
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { stocksPlaceOrder };
