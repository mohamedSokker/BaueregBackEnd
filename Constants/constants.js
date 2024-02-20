const { auth } = require("../controllers/auth");
const { authapp } = require("../auth/controllers/auth");
const { appMaintauth } = require("../AppMobile/controllers/auth");
const { cache } = require("../routeCache");

const CurrDir = process.env.CURRENT_DIRECTORY;

module.exports = { auth, authapp, appMaintauth, cache, CurrDir };
