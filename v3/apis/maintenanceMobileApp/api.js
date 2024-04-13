const { appMaintauth } = require("../../controllers/maintenanceMobileApp/auth");
const { authapp } = require("../../controllers/maintenanceMobileApp/authapp");

const getServerDate = require("../../routes/maintenanceMobileApp/getServerDate");
const getAllEq = require("../../routes/maintenanceMobileApp/GetAllEquipments");
const appManageUsers = require("../../routes/maintenanceMobileApp/appManageUsers");
const appMaintMaintenance = require("../../routes/maintenanceMobileApp/AppMaintMaintenance");
const appGetEqs = require("../../routes/maintenanceMobileApp/getEquipments");
const appGetReports = require("../../routes/maintenanceMobileApp/getReports");
const {
  appUploadImg,
} = require("../../controllers/maintenanceMobileApp/appUploadImg");
const appLogin = require("../../routes/maintenanceMobileApp/appLogin");
const appMaintNotification = require("../../routes/maintenanceMobileApp/appMaintNotification");
const appMaintGetNot = require("../../routes/maintenanceMobileApp/getNotification");
const appUpdateNot = require("../../routes/maintenanceMobileApp/updateNotification");
const appGetUsersinSite = require("../../routes/maintenanceMobileApp/getUsersInSite");
const appGetOperatorToken = require("../../routes/maintenanceMobileApp/getOperatorToken");
const {
  sendMessage,
} = require("../../controllers/maintenanceMobileApp/sendMessage");
const appMaint_getNotification = require("../../routes/maintenanceMobileApp/getNotification");

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
