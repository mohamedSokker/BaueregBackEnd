const express = require("express");
const router = express.Router();

const { deleteFolder } = require("../controllers/OrdersDeleteFolder");

router.get("/", deleteFolder);

module.exports = router;
