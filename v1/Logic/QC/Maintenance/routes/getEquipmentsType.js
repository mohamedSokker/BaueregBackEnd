const express = require("express");
const router = express.Router();

const { getEquipmentsType } = require("../controllers/getEquipmentsType");

router.get("/", getEquipmentsType);

module.exports = router;
