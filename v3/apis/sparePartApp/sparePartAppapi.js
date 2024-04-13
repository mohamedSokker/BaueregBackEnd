const { authEndPoints } = require("../sparePartApp/login&auth/api");

const sparePartAppapi = (app) => {
  authEndPoints(app);
};

module.exports = { sparePartAppapi };
