const express = require("express");
const router = express.Router();
const { deleteEquipmentsTransport } = require("../controllers/DeleteEqsTrand");

router.delete("/:id", deleteEquipmentsTransport);

module.exports = router;
