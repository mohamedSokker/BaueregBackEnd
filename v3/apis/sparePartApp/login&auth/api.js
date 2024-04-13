const sparePartLogin = require("../../../routes/sparePartApp/login&auth/login");
const sparePartRefresh = require("../../../routes/sparePartApp/login&auth/refreshToken");

const authEndPoints = (app) => {
  app.use("/sparePartLogin", sparePartLogin);

  app.use("/sparePartRefresh", sparePartRefresh);
};

module.exports = { authEndPoints };
