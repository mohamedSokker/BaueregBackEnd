const { appMaintauth } = require("../../AppMobile/controllers/auth");
const { authapp } = require("../../auth/controllers/auth");

const getServerDate = require("../getServerDate/routes/logic");
const getAllEq = require("../routes/GetAllEquipments");
const appManageUsers = require("../routes/appManageUsers");
const appMaintMaintenance = require("../routes/AppMaintMaintenance");
const appGetEqs = require("../getEquipments/routes/logic");
const appGetReports = require("../Reports/routes/getReports");
const { appUploadImg } = require("../controllers/appUploadImg");
const appLogin = require("../routes/appLogin");
const appMaintNotification = require("../appNotification/routes/logic");
const appMaintGetNot = require("../appNotification/routes/getNotification");
const appUpdateNot = require("../appNotification/routes/updateNotification");
const appGetUsersinSite = require("../getUserInsite/routes/logic");
const appGetOperatorToken = require("../getOperatorToken/routes/logic");
const { sendMessage } = require("../controllers/sendMessage");
const appMaint_getNotification = require("../appNotification/routes/getNotification");

const appMobileEndPoints = (app) => {
  app.use("/api/v1/getServerDate", appMaintauth, getServerDate);
  app.use("/api/v1/getAllEq", authapp("AppManageUsers"), getAllEq);
  app.use("/api/v1/appManageUsers", appManageUsers);
  app.use("/api/v1/appMaintMaintenance", appMaintauth, appMaintMaintenance);
  app.use("/api/v1/appGetEqs", appMaintauth, appGetEqs);
  app.use("/api/v1/appGetReports", appMaintauth, appGetReports);
  app.post("/api/v1/appUploadImg", authapp("AppManageUsers"), appUploadImg);
  app.get("/appUsers/img/:username/:imgName", (req, res) => {
    res.sendFile(
      `${process.env.ABS_PATH}/MaintApp/users/${Object.values(req.params)[0]}/${
        Object.values(req.params)[1]
      }`
    );
  });
  app.use("/appLogin", appLogin);
  app.use("/api/v1/appMaintNotification", appMaintauth, appMaintNotification);
  app.use("/api/v1/appMaintGetNot", appMaintauth, appMaintGetNot);
  app.use("/api/v1/appUpdateNot", appMaintauth, appUpdateNot);
  app.use("/api/v1/appGetUsersInSite", appMaintauth, appGetUsersinSite);
  app.use("/api/v1/appGetOperatorToken", appMaintauth, appGetOperatorToken);
  app.use("/api/v1/appSendMessage", sendMessage);
  app.use(
    "/api/v1/appMaint_getNotification",
    appMaintauth,
    appMaint_getNotification
  );
};

module.exports = { appMobileEndPoints };
