const express = require("express");
const router = express.Router();
const {
  deleteEquipmentsTransport,
} = require("../../../controllers/web/Transportation/DeleteEqsTrans");

router.delete("/:id", deleteEquipmentsTransport);

module.exports = router;
