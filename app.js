const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsAoptions");
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");
const http = require("http");
const server = http.createServer(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.engine("html", require("ejs").renderFile);

app.use(credentials);

app.use(cors(corsOptions));

app.use(cookieParser());

const { readExcel } = require("./functions/readExcel");

/////////////////////////////////////////////////Task Manager///////////////////////////////////////////////

const { taskManagerEndPoints } = require("./TaskManager/api/api");

taskManagerEndPoints(app);

/////////////////////////////////////////////////Email//////////////////////////////////////////////////////
const { transporter } = require("./config/mailConfig");

app.use("/api/v1/sendEmail", async (req, res) => {
  try {
    await transporter.sendMail(req.body);
    return res.status(200).json({ message: `Email Sent` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//////////////////////////////////////////////////QC Logic//////////////////////////////////////////////////
const dataSelected = require("./Logic/QC/Maintenance/routes/getActiveSites");

app.use("/api/v1/getActiveData", dataSelected);

//////////////////////////////////////////////////Mongo DB Backup///////////////////////////////////////////
const mongoBackup = require("./Mongo Backup/routes/mongoBackup");

app.use("/api/v1/mongoBackup", mongoBackup);

/////////////////////////////////////////////////Socket////////////////////////////////////////////////////
const { socketFn } = require("./Socket/socket");
socketFn(server);

////////////////////////////////////////////// One Drive Excel ///////////////////////////////////////////////////////////////////
const AxiosXlsx = require("./functions/AxiosXlsx");
const XlsxAll = require("./functions/XlsxAll");
const XLSX = require("xlsx");

app.get("/api/v1/excel/:id", async (req, res) => {
  try {
    const sheet = req.params.id;
    const url = process.env.ONEDRIVE_URL;
    const result = await AxiosXlsx(url, sheet);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ messages: error.message });
  }
});

app.get("/api/v1/consumptions", async (req, res) => {
  try {
    const url = process.env.CONSUMPTON_ONEDRIVE_URL;
    const result = await XlsxAll(url);
    const data = XLSX.utils.sheet_to_json(result.Sheets[`Oil Consumption`]);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ messages: error.message });
  }
});

app.get("/readExcel", readExcel);

//////////////////////////////////////////////////App Mobile ///////////////////////////////////////////////
const { appMobileEndPoints } = require("./AppMobile/api/api");

appMobileEndPoints(app);

/////////////////////////////////////////////////auth //////////////////////////////////////////////////////
const { authEndPoints } = require("./auth/api/api");

authEndPoints(app);

//////////////////////////////////////////////////Transportations //////////////////////////////////////////
const { transportationsEndPoints } = require("./Transportation/api/api");

transportationsEndPoints(app);

//////////////////////////////////////////////////Dashboard Logic //////////////////////////////////////////
const { dashboardEndPoints } = require("./Dashboard/api/api");

dashboardEndPoints(app);

//////////////////////////////////////////////////Sites Logic /////////////////////////////////////////////
const { sitesEndPoints } = require("./Sites/api/api");

sitesEndPoints(app);

//////////////////////////////////////////////////Equipment Logic //////////////////////////////////////////
const { equipmentsEndPoints } = require("./Equipments/api/api");

equipmentsEndPoints(app);

//////////////////////////////////////////////////Tables Logic /////////////////////////////////////////////

const avPlanLogic = require("./Logic/AvailabilityPlan/routes/logic");
const avCalcLogic = require("./Logic/AvailabilityCalc/routes/logic");
const insertPerMaint = require("./Logic/PerMaintPlan/routes/logic");

app.use("/api/v1/AvPlanLogic", avPlanLogic);
app.use("/api/v1/avCalcLogic", avCalcLogic);
app.use("/api/v1/insertPerMaint", insertPerMaint);

//////////////////////////////////////////////////Orders FileSystem ////////////////////////////////////////
const { ordersFilesEndPoints } = require("./OrdersFile/api/api");
ordersFilesEndPoints(app);

//////////////////////////////////////////////////PDF Anaysis ///////////////////////////////////////////////
const { pdfAnalysisEndPoints } = require("./pdfParsing/api/api");
pdfAnalysisEndPoints(app);

//////////////////////////////////////Spare Parts App ///////////////////////////////////////////////////
const { sparePartEndPoints } = require("./sparePartApp/api/api");
sparePartEndPoints(app);

//////////////////////////////////////////////////Tables/////////////////////////////////////////////////////
const { tablesEndPoints } = require("./Tables/api/app");
tablesEndPoints(app);

//////////////////////////////////////////////////File System ///////////////////////////////////////////////
const { fileSystemEndPoints } = require("./FileSystem/api/app");
fileSystemEndPoints(app);

//////////////////////////////////////////////////Login app ///////////////////////////////////////////////
const { loginAppEndPoints } = require("./LoginApp/api/api");
loginAppEndPoints(app);

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
