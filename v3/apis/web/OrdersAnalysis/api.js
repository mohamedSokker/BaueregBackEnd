const orderIncompleteRoute = require("../../../routes/web/OrderAnalysis/orderIncomplete");
const orderStatusRoute = require("../../../routes/web/OrderAnalysis/orderStatus");
const orderInvoiceNotFoundRoute = require("../../../routes/web/OrderAnalysis/OrderInvoice_NotFound");

const orderIncompleteEndPoints = (app) => {
  app.use("/api/v3/Order_IncompleteItems", orderIncompleteRoute);
  app.use("/api/v3/Order_Status", orderStatusRoute);
  app.use("/api/v3/OrderInvoice_NotFound", orderInvoiceNotFoundRoute);
};

module.exports = { orderIncompleteEndPoints };
