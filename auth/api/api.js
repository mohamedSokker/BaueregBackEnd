const { authapp } = require("../../auth/controllers/auth");

const manageUsers = require("../routes/manageUsers");
const { uploadImg } = require("../controllers/uploadimg");
const loginapp = require("../routes/login");
const handleRefreshToken = require("../routes/refreshToken");
const handleLogout = require("../routes/logout");
const sparePartLogin = require("../sparePartApp/routes/login");
const sparePartRefresh = require("../sparePartApp/routes/refreshToken");

const authEndPoints = (app) => {
  app.use("/api/v1/manageUsers", manageUsers);

  app.post("/api/v1/uploadImg", authapp("uploadImg"), uploadImg);

  app.get("/users/img/:username/:imgName", (req, res) => {
    res.sendFile(
      `${CurrDir}/users/${Object.values(req.params)[0]}/${
        Object.values(req.params)[1]
      }`
    );
  });

  app.use("/handleLoginApp", loginapp);

  app.use("/refresh", handleRefreshToken);

  app.use("/logout", handleLogout);

  app.use("/sparePartLogin", sparePartLogin);

  app.use("/sparePartRefresh", sparePartRefresh);
};

module.exports = { authEndPoints };
