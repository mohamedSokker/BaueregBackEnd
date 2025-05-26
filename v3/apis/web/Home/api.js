const home = require("../../../routes/web/Home/home");

const homeEndPoints = (app) => {
  app.use("/api/v3/home", home);
};

module.exports = { homeEndPoints };
