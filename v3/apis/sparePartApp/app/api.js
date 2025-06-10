const {
  authapp,
} = require("../../../controllers/sparePartApp/login&auth/auth");

const AppStocksTransition = require("../../../routes/sparePartApp/app/Tables/AppStocksTransition");
const AppStocks = require("../../../routes/sparePartApp/app/Tables/AppStocks");
const AppNotification = require("../../../routes/sparePartApp/app/Tables/AppNotification");
const AppPlaceOrder = require("../../../routes/sparePartApp/app/Tables/AppPlaceOrder");
const StockTransition = require("../../../routes/sparePartApp/app/StocksActions/StocksTransition");
const stocksRecieve = require("../../../routes/sparePartApp/app/StocksActions/StocksRecieve");
const stocksExchange = require("../../../routes/sparePartApp/app/StocksActions/StocksExchange");
const stocksNewItem = require("../../../routes/sparePartApp/app/StocksActions/StocksNewItem");
const stocksPlaceOrder = require("../../../routes/sparePartApp/app/StocksActions/StocksPlaceOrder");
const confirmOrder = require("../../../routes/sparePartApp/app/StocksActions/ConfirmOrder");
const {
  SparePartSendMessage,
} = require("../../../controllers/sparePartApp/app/helpers/SendMssage");
const getUsersTokens = require("../../../routes/sparePartApp/app/Token/GetUsersToken");
const AllStocks = require("../../../data/allStocks");
const sparePartGetPosts = require("../../../routes/sparePartApp/app/helpers/GetPosts");
const sparePartGetItems = require("../../../routes/sparePartApp/app/helpers/GetItems");
const sparePartGetItem = require("../../../routes/sparePartApp/app/helpers/GetItem");
const sparePartGetProfile = require("../../../routes/sparePartApp/app/helpers/GetProfile");
const sparePartGetTargetOrder = require("../../../routes/sparePartApp/app/helpers/GetTargetOrder");
const sparePartGetMainToken = require("../../../routes/sparePartApp/app/helpers/GetMainToken");
const sparePartGetUnrevievedInv = require("../../../routes/sparePartApp/app/helpers/GetUnrecievedInv");
const sparePartGetTargetPosts = require("../../../routes/sparePartApp/app/helpers/GetTargetPosts");
const sparePartGetActiveSites = require("../../../routes/sparePartApp/app/helpers/GetActiveSites");
const sparePartGetUserNotifications = require("../../../routes/sparePartApp/app/helpers/GetUsersNot");
const sparePartGetTargetCode = require("../../../routes/sparePartApp/app/helpers/GetTargetCode");
const sparePartSetUserSite = require("../../../routes/sparePartApp/app/helpers/SetUserSite");
const sparePartGetUserEqs = require("../../../routes/sparePartApp/app/helpers/GetUserEqs");
const sparePartGetWorkshops = require("../../../routes/sparePartApp/app/helpers/GetWorkShop");
const sparePartAddWorkshop = require("../../../routes/sparePartApp/app/helpers/AddWorkShop");
const {
  checkIteminStock,
} = require("../../../controllers/sparePartApp/app/Checks/CheckItemsInStock");
const sparePartSendAll = require("../../../routes/sparePartApp/app/helpers/StocksSendAll");

const sparePartEndPoints = (app) => {
  app.use(
    "/api/v1/AppStocksTransition",
    // authapp("AppStocksTransition"),
    AppStocksTransition
  );

  app.use(
    "/api/v1/AppStocks",
    //  authapp("AppStocks"),
    AppStocks
  );

  app.use(
    "/api/v1/AppNotification",
    // authapp("AppNotification"),
    AppNotification
  );

  app.use(
    "/api/v1/StockTransition",
    // authapp("StockTransition"),
    StockTransition
  );

  app.use(
    "/api/v1/AppPlaceOrder",
    // authapp("AppPlaceOrder"),
    AppPlaceOrder
  );

  app.use(
    "/api/v1/stocksRecieve",
    // authapp("stocksRecieve"),
    stocksRecieve
  );

  app.use(
    "/api/v1/stocksExchange",
    // authapp("stocksExchange"),
    stocksExchange
  );

  app.use(
    "/api/v1/stocksNewItem",
    // authapp("stocksNewItem"),
    stocksNewItem
  );

  app.use(
    "/api/v1/stocksPlaceOrder",
    // authapp("stocksPlaceOrder"),
    stocksPlaceOrder
  );

  app.use(
    "/api/v1/confirmOrder",
    // authapp("confirmOrder"),
    confirmOrder
  );

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
