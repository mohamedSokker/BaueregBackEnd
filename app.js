const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const http = require("http");
const socketio = require("socket.io");
const dotenv = require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//////////////////////////////////////////////////Mongo DB Backup///////////////////////////////////////////
const mongoBackup = require("./Mongo Backup/routes/mongoBackup");

app.use("/api/v1/mongoBackup", mongoBackup);

//////////////////////////////////////////////////Web Socket ///////////////////////////////////////////////
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://192.168.1.15:3000",
      "http://192.168.52.186:3000",
      "http://192.168.220.186:3000",
      "http://mhsokker.ddnsfree.com:3000",
      "https://bauereg.onrender.com",
    ],
  },
});

io.on("connection", (socket) => {
  console.log(`New Connection ${socket.id}`);
  socket.on("StockTransition", (data) => {
    console.log(data);
    socket.broadcast.emit("updateNotification");
  });
  socket.on("TaskEdited", (data) => {
    console.log(data);
    socket.broadcast.emit("UpdateTask", data);
  });
  socket.on("disconnect", () => {
    console.log("Connection Lost");
  });
});

//////////////////////////////////////////////////Orders FileSystem ////////////////////////////////////////

const createFolder = require("./OrdersFile/routes/OrdersCreateFolder"); // need query (fullpath)
const renameFolder = require("./OrdersFile/routes/OrdersRenameFolder"); // need query (oldpath, newpath)
const deleteFolder = require("./OrdersFile/routes/OrdersDeleteFolder"); // need query (oldpath)
const uploadItems = require("./OrdersFile/routes/OrdersUploadFolder"); // need query (url)
const getFiles = require("./OrdersFile/routes/OrderGetFiles"); // need query (fullpath)
const orderCheck = require("./OrdersFile/routes/OrderCheck"); // need query (path)

app.use("/AppCreateFolder", createFolder);

app.use("/AppRenameFolder", renameFolder);

app.use("/AppDeleteFolder", deleteFolder);

app.use("/AppUploadItems", uploadItems);

app.use("/AppGetFiles", getFiles);

app.use("/AppCheck", orderCheck);

//////////////////////////////////////////////////PDF Anaysis ///////////////////////////////////////////////

const pdfParse = require("./pdfParsing/routes/pdfParse");
const pdfLib = require("./pdfParsing/routes/pdfLibRead");
const pdfAnalysis = require("./pdfParsing/routes/pdfAnalysis");
const OrderspdfAnalysis = require("./OrderspdfParsing/OrderConfirmation/routes/pdfAnalysis");
const OrdersQuotationpdf = require("./OrderspdfParsing/OrderQuotation/routes/pdfAnalysis");
const OrdersInvoicepdf = require("./OrderspdfParsing/OrderInvoice/routes/pdfAnalysis");
const OrdersOrderNopdf = require("./OrderspdfParsing/OrderNo/routes/pdfAnalysis");

app.use("/pdfParse", pdfParse);

app.use("/pdfLib", pdfLib);

app.use("/pdfAnalysis", pdfAnalysis);

app.use("/OrdersConfirmationpdfAnalysis", OrderspdfAnalysis);

app.use("/OrdersQuotationpdfAnalysis", OrdersQuotationpdf);

app.use("/OrdersInvoicepdfAnalysis", OrdersInvoicepdf);

app.use("/OrdersOrderpdfAnalysis", OrdersOrderNopdf);

//////////////////////////////////////////////////End Points ///////////////////////////////////////////////

const Test = require("./routes/Test");
const Test1 = require("./routes/Test1");
const manageUsers = require("./auth/routes/manageUsers");
const { uploadImg } = require("./auth/controllers/uploadimg");
const AdminTasks = require("./routes/AdminTasks");
const AdminUsers = require("./routes/AdminUsers");
const AdminUsersData = require("./routes/AdminUsersData");
const AdminUsersLog = require("./routes/AdminUsersLog");
const Availability = require("./routes/Availability");
const Availability_Plan = require("./routes/Availability_Plan");
const Bauer_Breakdown = require("./routes/Bauer_Breakdown");
const Bauer_Equipments = require("./routes/Bauer_Equipments");
const Bauer_Equipments_Model = require("./routes/Bauer_Equipments_Model");
const BC1000 = require("./routes/BC1000");
const BC2000 = require("./routes/BC2000");
const BC250 = require("./routes/BC250");
const BG1000 = require("./routes/BG1000");
const BG2000 = require("./routes/BG2000");
const BG250 = require("./routes/BG250");
const Constants = require("./routes/Constants");
const Diff_Stocks = require("./routes/Diff_Stocks");
const Diff_Value_Stocks = require("./routes/Diff_Value_Stocks");
const Employees = require("./routes/Employees");
const Engines = require("./routes/Engines");
const Equipment_Performance = require("./routes/Equipment_Performance");
const Equipment_Performance_Piles = require("./routes/Equipment_Performance_Piles");
const Equipments_Location = require("./routes/Equipments_Location");
const Equipments_Notes = require("./routes/Equipments_Notes");
const Fuel_Consumption = require("./routes/Fuel_Consumption");
const GearBoxes = require("./routes/GearBoxes");
const GearBoxesTrench = require("./routes/GearBoxesTrench");
const Holidays = require("./routes/Holidays");
const Kelly_Location = require("./routes/Kelly_Location");
const LoadIndicator = require("./routes/LoadIndicator");
const Location_Bauer = require("./routes/Location_Bauer");
const Machinary = require("./routes/Machinary");
const Machinary_Location = require("./routes/Machinary_Location");
const Maintenance = require("./routes/Maintenance");
const Maintenance_Stocks = require("./routes/Maintenance_Stocks");
const MudPumps = require("./routes/MudPumps");
const Old_Stocks = require("./routes/Old_Stocks");
const Operating_Hrs = require("./routes/Operating_Hrs");
const Order_Confirmation = require("./routes/Order_Confirmation");
const Order_EqGroupKeyWords = require("./routes/Order_EqGroupKeyWords");
const Order_EqTypeKeyWords = require("./routes/Order_EqTypeKeyWords");
const Order_EquipmentGroup = require("./routes/Order_EquipmentGroup");
const Order_IncompleteItems = require("./routes/Order_IncompleteItems");
const Order_Invoice = require("./routes/Order_Invoice");
const Order_Number = require("./routes/Order_Number");
const Order_OrdersTotalValues = require("./routes/Order_OrdersTotalValues");
const Order_Quotation = require("./routes/Order_Quotation");
const Order_Status = require("./routes/Order_Status");
const Orders_TotalValue = require("./routes/Orders_TotalValue");
const Pannel_Data = require("./routes/Pannel_Data");
const PeriodicMaintenance_Plan = require("./routes/PeriodicMaintenance_Plan");
const Pile_Data = require("./routes/Pile_Data");
const Recieved_Invoices = require("./routes/Recieved_Invoices");
const Reference_Stock = require("./routes/Reference_Stock");
const Site_Performance = require("./routes/Site_Performance");
const Site_Performance_piles = require("./routes/Site_Performance_piles");
const Soil_Components = require("./routes/Soil_Components");
const Soil_Rates = require("./routes/Soil_Rates");
const Soil_Rates_Piles = require("./routes/Soil_Rates_Piles");
const Stocks = require("./routes/Stocks");
const Stocks_Equipments = require("./routes/Stocks_Equipments");
const Stocks_Items_Status = require("./routes/Stocks_Items_Status");
const TimeLine = require("./routes/TimeLine");
const TimeLine_Piles = require("./routes/TimeLine_Piles");
const TotalPanels = require("./routes/TotalPanels");
const TotalPiles = require("./routes/TotalPiles");
const Users = require("./routes/Users");
const Week_Site_Plan = require("./routes/Week_Site_Plan");
const AppStocksTransition = require("./routes/AppStocksTransition");
const AppStocks = require("./routes/AppStocks");
const AppNotification = require("./routes/AppNotification");
const AppPlaceOrder = require("./routes/AppPlaceOrder");
const StockTransition = require("./Logic/Stocks/routes/stocksTransition");
const stocksRecieve = require("./Logic/Stocks/routes/stocksRecieve");
const stocksExchange = require("./Logic/Stocks/routes/stocksExchange");
const stocksNewItem = require("./Logic/Stocks/routes/stocksNewItem");
const stocksPlaceOrder = require("./Logic/Stocks/routes/stocksPlaceOrder");
const confirmOrder = require("./Logic/Stocks/routes/confirmOrder");
const AppMobile = require("./AppMobile/routes/AppMobile");

var fs = require("fs");
var absPath = "c:/xampp/htdocs";
let CurrDir = process.env.CURRENT_DIRECTORY;
let abshost = process.env.BASE_URL;

const { authapp } = require("./auth/controllers/auth");

app.use("/api/v1/Test", Test);

app.use("/api/v1/Test1", authapp("Test1"), Test1);

app.use("/api/v1/manageUsers", manageUsers);

app.post("/api/v1/uploadImg", uploadImg);

app.use("/api/v1/AdminTasks", authapp("AdminTasks"), AdminTasks);

app.use("/api/v1/AdminUsers", authapp("AdminUsers"), AdminUsers);

app.use("/api/v1/AdminUsersData", authapp("AdminUsersData"), AdminUsersData);

app.use("/api/v1/AdminUsersLog", authapp("AdminUsersLog"), AdminUsersLog);

app.use("/api/v1/Availability", authapp("Availability"), Availability);

app.use(
  "/api/v1/Availability_Plan",
  authapp("Availability_Plan"),
  Availability_Plan
);

app.use("/api/v1/Bauer_Breakdown", authapp("Bauer_Breakdown"), Bauer_Breakdown);

app.use("/api/v1/Bauer_Equipments", Bauer_Equipments);

app.use(
  "/api/v1/Bauer_Equipments_Model",
  authapp("Bauer_Equipments_Model"),
  Bauer_Equipments_Model
);

app.use("/api/v1/BC1000", authapp("BC1000"), BC1000);

app.use("/api/v1/BC2000", authapp("BC2000"), BC2000);

app.use("/api/v1/BC250", authapp("BC250"), BC250);

app.use("/api/v1/BG1000", authapp("BG1000"), BG1000);

app.use("/api/v1/BG2000", authapp("BG2000"), BG2000);

app.use("/api/v1/BG250", authapp("BG250"), BG250);

app.use("/api/v1/Constants", authapp("Constants"), Constants);

app.use("/api/v1/Diff_Stocks", authapp("Diff_Stocks"), Diff_Stocks);

app.use(
  "/api/v1/Diff_Value_Stocks",
  authapp("Diff_Value_Stocks"),
  Diff_Value_Stocks
);

app.use("/api/v1/Employees", authapp("Employees"), Employees);

app.use("/api/v1/Engines", authapp("Engines"), Engines);

app.use(
  "/api/v1/Equipment_Performance",
  authapp("Equipment_Performance"),
  Equipment_Performance
);

app.use(
  "/api/v1/Equipment_Performance_Piles",
  authapp("Equipment_Performance_Piles"),
  Equipment_Performance_Piles
);

app.use(
  "/api/v1/Equipments_Location",
  authapp("Equipments_Location"),
  Equipments_Location
);

app.use(
  "/api/v1/Equipments_Notes",
  authapp("Equipments_Notes"),
  Equipments_Notes
);

app.use(
  "/api/v1/Fuel_Consumption",
  authapp("Fuel_Consumption"),
  Fuel_Consumption
);

app.use("/api/v1/GearBoxes", authapp("GearBoxes"), GearBoxes);

app.use("/api/v1/GearBoxesTrench", authapp("GearBoxesTrench"), GearBoxesTrench);

app.use("/api/v1/Holidays", authapp("Holidays"), Holidays);

app.use("/api/v1/Kelly_Location", authapp("Kelly_Location"), Kelly_Location);

app.use("/api/v1/LoadIndicator", authapp("LoadIndicator"), LoadIndicator);

app.use("/api/v1/Location_Bauer", authapp("Location_Bauer"), Location_Bauer);

app.use("/api/v1/Machinary", authapp("Machinary"), Machinary);

app.use(
  "/api/v1/Machinary_Location",
  authapp("Machinary_Location"),
  Machinary_Location
);

app.use("/api/v1/Maintenance", authapp("Maintenance"), Maintenance);

app.use(
  "/api/v1/Maintenance_Stocks",
  authapp("Maintenance_Stocks"),
  Maintenance_Stocks
);

app.use("/api/v1/MudPumps", authapp("MudPumps"), MudPumps);

app.use("/api/v1/Old_Stocks", authapp("Old_Stocks"), Old_Stocks);

app.use("/api/v1/Operating_Hrs", authapp("Operating_Hrs"), Operating_Hrs);

app.use(
  "/api/v1/Order_Confirmation",
  authapp("Order_Confirmation"),
  Order_Confirmation
);

app.use(
  "/api/v1/Order_EqGroupKeyWords",
  authapp("Order_EqGroupKeyWords"),
  Order_EqGroupKeyWords
);

app.use(
  "/api/v1/Order_EqTypeKeyWords",
  authapp("Order_EqTypeKeyWords"),
  Order_EqTypeKeyWords
);

app.use(
  "/api/v1/Order_EquipmentGroup",
  authapp("Order_EquipmentGroup"),
  Order_EquipmentGroup
);

app.use(
  "/api/v1/Order_IncompleteItems",
  authapp("Order_IncompleteItems"),
  Order_IncompleteItems
);

app.use("/api/v1/Order_Invoice", authapp("Order_Invoice"), Order_Invoice);

app.use("/api/v1/Order_Number", authapp("Order_Number"), Order_Number);

app.use(
  "/api/v1/Order_OrdersTotalValues",
  authapp("Order_OrdersTotalValues"),
  Order_OrdersTotalValues
);

app.use("/api/v1/Order_Quotation", authapp("Order_Quotation"), Order_Quotation);

app.use("/api/v1/Order_Status", authapp("Order_Status"), Order_Status);

app.use(
  "/api/v1/Orders_TotalValue",
  authapp("Orders_TotalValue"),
  Orders_TotalValue
);

app.use("/api/v1/Pannel_Data", authapp("Pannel_Data"), Pannel_Data);

app.use(
  "/api/v1/PeriodicMaintenance_Plan",
  authapp("PeriodicMaintenance_Plan"),
  PeriodicMaintenance_Plan
);

app.use("/api/v1/Pile_Data", authapp("Pile_Data"), Pile_Data);

app.use(
  "/api/v1/Recieved_Invoices",
  authapp("Recieved_Invoices"),
  Recieved_Invoices
);

app.use("/api/v1/Reference_Stock", authapp("Reference_Stock"), Reference_Stock);

app.use(
  "/api/v1/Site_Performance",
  authapp("Site_Performance"),
  Site_Performance
);

app.use(
  "/api/v1/Site_Performance_piles",
  authapp("Site_Performance_piles"),
  Site_Performance_piles
);

app.use("/api/v1/Soil_Components", authapp("Soil_Components"), Soil_Components);

app.use("/api/v1/Soil_Rates", authapp("Soil_Rates"), Soil_Rates);

app.use(
  "/api/v1/Soil_Rates_Piles",
  authapp("Soil_Rates_Piles"),
  Soil_Rates_Piles
);

app.use("/api/v1/Stocks", Stocks);

app.use(
  "/api/v1/Stocks_Equipments",
  authapp("Stocks_Equipments"),
  Stocks_Equipments
);

app.use(
  "/api/v1/Stocks_Items_Status",
  authapp("Stocks_Items_Status"),
  Stocks_Items_Status
);

app.use("/api/v1/TimeLine", authapp("TimeLine"), TimeLine);

app.use("/api/v1/TimeLine_Piles", authapp("TimeLine_Piles"), TimeLine_Piles);

app.use("/api/v1/TotalPanels", authapp("TotalPanels"), TotalPanels);

app.use("/api/v1/TotalPiles", authapp("TotalPiles"), TotalPiles);

app.use("/api/v1/Users", authapp("Users"), Users);

app.use("/api/v1/Week_Site_Plan", authapp("Week_Site_Plan"), Week_Site_Plan);

app.use(
  "/api/v1/AppStocksTransition",
  authapp("AppStocksTransition"),
  AppStocksTransition
);

app.use("/api/v1/AppStocks", AppStocks);

app.use("/api/v1/AppNotification", AppNotification);

app.use("/api/v1/StockTransition", StockTransition);

app.use("/api/v1/AppPlaceOrder", AppPlaceOrder);

app.use("/api/v1/stocksRecieve", stocksRecieve);

app.use("/api/v1/stocksExchange", stocksExchange);

app.use("/api/v1/stocksNewItem", stocksNewItem);

app.use("/api/v1/stocksPlaceOrder", stocksPlaceOrder);

app.use("/api/v1/confirmOrder", confirmOrder);

app.use("/api/v1/AppMobile", AppMobile);

//////////////////////////////////////////////////File System ///////////////////////////////////////////////

const login = require("./routes/login");
const FileSystem = require("./controllers/filesystem");
const { auth } = require("./controllers/auth");

app.get("/", (req, res) => {
  res.sendFile(CurrDir + "/login.html");
});

app.get("/style29.css", (req, res) => {
  res.sendFile(CurrDir + "/style29.css");
});

app.get("/favicon.ico", (req, res) => {
  res.sendFile(CurrDir + "/images/logo.jpg");
});

app.get("/images/logo.jpg", (req, res) => {
  res.sendFile(CurrDir + "/images/logo.jpg");
});

app.get("/images/cover.jpg", (req, res) => {
  res.sendFile(CurrDir + "/images/cover.jpg");
});

app.use("/login", login);

app.get("/Bauereg/Share/*", auth, FileSystem);

app.get("/Bauereg/Orders/*", FileSystem);

app.get("/Bauereg/OilSamples/*", FileSystem);

app.get("/Bauereg/OilSamplesAnalyzed/*", FileSystem);

app.get("/users/img/:username/:imgName", (req, res) => {
  res.sendFile(
    `${CurrDir}/users/${Object.values(req.params)[0]}/${
      Object.values(req.params)[1]
    }`
  );
});

const filesystemrcreateroutes = require("./FileSystemroutes/handleCreateFolder");
const filessystemrenameroutes = require("./FileSystemroutes/handleRenameFolder");
const filessystemdeleteroutes = require("./FileSystemroutes/handleDeleteFolder");
const filessystemuploadroutes = require("./FileSystemroutes/handleUploadFolder");

app.use("/CreateFolder", filesystemrcreateroutes);

app.use("/RenameFolder", filessystemrenameroutes);

app.use("/DeleteFolder", filessystemdeleteroutes);

app.use("/Upload", filessystemuploadroutes);

//////////////////////////////////////////////////Login app ///////////////////////////////////////////////
app.get("/loginapp", (req, res) => {
  res.sendFile(CurrDir + "/loginapp.html");
});

const loginapp = require("./auth/routes/login");
const { connect } = require("http2");

app.use("/handleLoginApp", loginapp);

// let schemas = require("./routes/schemas");
// app.use("/All", schemas);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bauer RESTAPI",
      version: "1.0.0",
    },
    servers: [
      {
        url: `${process.env.BASE_URL}/`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerjsdoc(options);
app.use("/doc", auth, swaggerui.serve, swaggerui.setup(specs));

app.get("*", (req, res) => {
  res.write("401 Access Denied");
  res.end();
});

server.listen(process.env.PORT, () => {
  console.log("Server is listening on port 5000");
});
