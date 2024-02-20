const pdfParse = require("../../pdfParsing/routes/pdfParse");
const pdfLib = require("../../pdfParsing/routes/pdfLibRead");
const pdfAnalysis = require("../../pdfParsing/routes/pdfAnalysis");
const OrderspdfAnalysis = require("../../OrderspdfParsing/OrderConfirmation/routes/pdfAnalysis");
const OrdersQuotationpdf = require("../../OrderspdfParsing/OrderQuotation/routes/pdfAnalysis");
const OrdersInvoicepdf = require("../../OrderspdfParsing/OrderInvoice/routes/pdfAnalysis");
const OrdersOrderNopdf = require("../../OrderspdfParsing/OrderNo/routes/pdfAnalysis");
const { pdfImage } = require("../../pdfParsing/controllers/pdfImage");

const pdfAnalysisEndPoints = (app) => {
  app.use("/pdfParse", pdfParse);

  app.use("/pdfLib", pdfLib);

  app.use("/pdfAnalysis", pdfAnalysis);

  app.use("/OrdersConfirmationpdfAnalysis", OrderspdfAnalysis);

  app.use("/OrdersQuotationpdfAnalysis", OrdersQuotationpdf);

  app.use("/OrdersInvoicepdfAnalysis", OrdersInvoicepdf);

  app.use("/OrdersOrderpdfAnalysis", OrdersOrderNopdf);

  app.get("/PdfImage", pdfImage);
};

module.exports = { pdfAnalysisEndPoints };
