const express = require("express");
const router = express.Router();

const { renameFolder } = require("../controllers/OrdersRenameFolder");

router.get("/", renameFolder);

module.exports = router;
