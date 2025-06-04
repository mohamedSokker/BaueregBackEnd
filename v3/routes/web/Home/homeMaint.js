const express = require("express");
const router = express.Router();
const { HomeMaintenance } = require("../../../controllers/web/Home/homeMaint");

router.post("/", HomeMaintenance);

module.exports = router;
