const { authapp } = require("../../auth/controllers/auth");

const AppStocksTransition = require("../../routes/AppStocksTransition");
const AppStocks = require("../../routes/AppStocks");
const AppNotification = require("../../routes/AppNotification");
const AppPlaceOrder = require("../../routes/AppPlaceOrder");
const StockTransition = require("../../Logic/Stocks/routes/stocksTransition");
const stocksRecieve = require("../../Logic/Stocks/routes/stocksRecieve");
const stocksExchange = require("../../Logic/Stocks/routes/stocksExchange");
const stocksNewItem = require("../../Logic/Stocks/routes/stocksNewItem");
const stocksPlaceOrder = require("../../Logic/Stocks/routes/stocksPlaceOrder");
const confirmOrder = require("../../Logic/Stocks/routes/confirmOrder");
const {
  SparePartSendMessage,
} = require("../../sparePartApp/controllers/sendMessage");
const getUsersTokens = require("../../sparePartApp/routes/getUsersToken");
const AllStocks = require("../../data/allStocks");
const sparePartGetPosts = require("../../sparePartApp/routes/getPosts");
const sparePartGetItems = require("../../sparePartApp/routes/getItems");
const sparePartGetItem = require("../../sparePartApp/routes/getItem");
const sparePartGetProfile = require("../../sparePartApp/routes/getProfile");
const sparePartGetTargetOrder = require("../../sparePartApp/routes/getTargetOrder");
const sparePartGetMainToken = require("../../sparePartApp/routes/getMainToken");
const sparePartGetUnrevievedInv = require("../../sparePartApp/routes/getUnrecievedInv");
const sparePartGetTargetPosts = require("../../sparePartApp/routes/getTargetPosts");
const sparePartGetActiveSites = require("../../sparePartApp/routes/getActiveSites");
const sparePartGetUserNotifications = require("../../sparePartApp/routes/getUserNotifications");
const sparePartGetTargetCode = require("../../sparePartApp/routes/getTargetCode");
const sparePartSetUserSite = require("../../sparePartApp/routes/setUserSite");
const sparePartGetUserEqs = require("../../sparePartApp/routes/getUserEquipments");
const sparePartGetWorkshops = require("../../sparePartApp/routes/getWorkshops");
const sparePartAddWorkshop = require("../../sparePartApp/routes/AddWorkshop");
const {
  checkIteminStock,
} = require("../../Logic/Stocks/functions/global/checkItemInStock");
const sparePartSendAll = require("../../Logic/Stocks/routes/stocksSendAll");

const sparePartEndPoints = (app) => {
  app.use(
    "/api/v1/AppStocksTransition",
    authapp("AppStocksTransition"),
    AppStocksTransition
  );

  app.use("/api/v1/AppStocks", authapp("AppStocks"), AppStocks);

  app.use(
    "/api/v1/AppNotification",
    authapp("AppNotification"),
    AppNotification
  );

  app.use(
    "/api/v1/StockTransition",
    authapp("StockTransition"),
    StockTransition
  );

  app.use("/api/v1/AppPlaceOrder", authapp("AppPlaceOrder"), AppPlaceOrder);

  app.use("/api/v1/stocksRecieve", authapp("stocksRecieve"), stocksRecieve);

  app.use("/api/v1/stocksExchange", authapp("stocksExchange"), stocksExchange);

  app.use("/api/v1/stocksNewItem", authapp("stocksNewItem"), stocksNewItem);

  app.use(
    "/api/v1/stocksPlaceOrder",
    authapp("stocksPlaceOrder"),
    stocksPlaceOrder
  );

  app.use("/api/v1/confirmOrder", authapp("confirmOrder"), confirmOrder);

  app.use("/api/v1/SparePartSendMessage", SparePartSendMessage);

  app.use("/api/v1/sparePartGetUsersToken", getUsersTokens);

  app.get("/api/v1/sparePartGetStocksList", (req, res) => {
    return res.status(200).json(AllStocks);
  });

  app.use("/api/v1/sparePartGetPosts", sparePartGetPosts);

  app.use("/api/v1/sparePartGetItems", sparePartGetItems);

  app.use("/api/v1/sparePartGetItem", sparePartGetItem);

  app.use("/api/v1/sparePartGetProfile", sparePartGetProfile);

  app.use("/api/v1/sparePartGetTargetOrder", sparePartGetTargetOrder);

  app.use("/api/v1/sparePartGetMainToken", sparePartGetMainToken);

  app.use("/api/v1/sparePartGetUnrecievedInv", sparePartGetUnrevievedInv);

  app.use("/api/v1/sparePartGetTargetPosts", sparePartGetTargetPosts);

  app.use("/api/v1/sparePartGetActiveSites", sparePartGetActiveSites);

  app.use(
    "/api/v1/sparePartGetUserNotifications",
    sparePartGetUserNotifications
  );

  app.use("/api/v1/sparePartGetTargetCode", sparePartGetTargetCode);

  app.use("/api/v1/setUserSite", sparePartSetUserSite);

  app.use("/api/v1/sparePartGetUserEquipments", sparePartGetUserEqs);

  app.use("/api/v1/sparePartGetWorkshops", sparePartGetWorkshops);

  app.use("/api/v1/sparePartAddWorkshop", sparePartAddWorkshop);

  app.use("/api/v1/sparePartSendAll", sparePartSendAll);

  app.post("/api/v1/sparePartCheckItemInStore", async (req, res) => {
    try {
      const bodyData = req.body;
      const result = await checkIteminStock(bodyData.Code);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
};

module.exports = { sparePartEndPoints };
