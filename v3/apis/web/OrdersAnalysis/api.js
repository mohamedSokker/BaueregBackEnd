const orderIncompleteRoute = require("../../../routes/web/OrderAnalysis/orderIncomplete");
const orderStatusRoute = require("../../../routes/web/OrderAnalysis/orderStatus");

const orderIncompleteEndPoints = (app) => {
  app.use("/api/v3/Order_IncompleteItems", orderIncompleteRoute);
  app.use("/api/v3/Order_Status", orderStatusRoute);
};

module.exports = { orderIncompleteEndPoints };
