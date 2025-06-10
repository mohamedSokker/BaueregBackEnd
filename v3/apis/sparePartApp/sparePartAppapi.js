const { authEndPoints } = require("../sparePartApp/login&auth/api");
const { sparePartEndPoints } = require("../sparePartApp/app/api");

const sparePartAppapi = (app) => {
  authEndPoints(app);
  sparePartEndPoints(app);
};

module.exports = { sparePartAppapi };
